const db = require('../db/dbConnection');
const dateHelper = require ('../dateHelperFunctions');

const challengeController = {};

challengeController.getChallenges = async (req, res, next) => {
  try {
    const {user_id} = req.params;
    const search = `SELECT uc.challenge_id, uc._id, uc.last_date_assigned, uc.completed_on_last_date, c.description, c.points, c.name FROM public.user_challenges uc LEFT OUTER JOIN challenges c ON uc.challenge_id = c._id WHERE user_id = ${user_id} AND last_date_assigned = '${dateHelper.formatDate()}'`
    db.query(search)
      .then(data => {
        res.locals.threeChallenges = data.rows;
        console.log(data.rows);
        if(data.rows.length === 0) {
          const create = `SELECT challenge_id FROM public.user_challenges WHERE user_id = ${user_id} ORDER BY RANDOM() LIMIT 3`
          db.query(create)
            .then(data => {
              // data.rows - 3 challenge id objects { challenge_id: # }
              const update = `UPDATE user_challenges SET last_date_assigned = '${dateHelper.formatDate()}', completed_on_last_date = false WHERE user_id = ${user_id} AND (challenge_id = ${data.rows[0].challenge_id} OR challenge_id = ${data.rows[1].challenge_id} OR challenge_id = ${data.rows[2].challenge_id})`;
              db.query(update)
                .then(data => {
                  db.query(search)
                    .then(data => {
                      res.locals.threeChallenges = data.rows;
                      return next();
                    })
                });
          }) 
        } else {
          return next();
        }
      })
  } catch (error) {
    return next({
      status: error.status,
      message: {
        err: error.message,
      },
      log: `An error occurred in challengeController.updateDate. Check server logs for more details - ${error}`,
    });
  }
};

challengeController.updateDate = async (req, res, next) => {
  try {
    const {user_id, challenge_id} = req.body;
    console.log('here');
    const update = `UPDATE user_challenges SET completed_on_last_date = true WHERE user_id = $1 AND challenge_id = $2`;
    const values = [user_id, challenge_id];
    await db.query(update, values)
    return next();
  } catch (error) {
    return next({
      status: error.status,
      message: {
        err: error.message,
      },
      log: `An error occurred in challengeController.updateDate. Check server logs for more details - ${error}`,
    });
  }
};

module.exports = challengeController;
