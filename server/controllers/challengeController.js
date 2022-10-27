const db = require('../db/dbConnection');
const dateHelper = require ('../dateHelperFunctions');

const challengeController = {};

challengeController.getChallenges = async (req, res, next) => {
  try {
    const {user_id} = req.params;
    const search = `SELECT * from user_challenges WHERE user_id = $1 AND last_date_assigned = '${dateHelper.formatDate()}'`
    const values = [user_id];
    db.query(search, values)
      .then(data => {
        if(data.rows.length === 0) {
          const create = `UPDATE user_challenges SET last_date_assigned = '${dateHelper.formatDate()}', completed_on_last_date = false WHERE user_id = ${user_id} LIMIT 3`
          const { rows } = db.query(create)
          .then(data => {
            db.query(search, values);
            res.locals.threeChallenges = data.rows;
          })
        } 
        res.locals.threeChallenges = data.rows;
        return next();
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
    const {user_id, completed_on_last_date} = req.body;
    const update = `UPDATE user_challenges SET completed_on_last_date = ${points}, last_date_assigned = ${dateHelper.formatDate()} WHERE user_id = $1`
    await db.query(update);
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
