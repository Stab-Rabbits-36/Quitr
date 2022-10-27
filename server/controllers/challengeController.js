const db = require('../db/dbConnection');
const dateHelper = require ('../dateHelperFunctions');

const challengeController = {};

challengeController.getChallenges = async (req, res, next) => {
  try {
    const {user_id} = req.params;
    const search = `SELECT * from user_challenges WHERE user_id = $1 AND last_date_assigned = '${dateHelper.formatDate()}'`
    const values = [user_id];
    const {rows} = await db.query(search, values);
    res.locals.threeChallenges = rows[0];
    return next();
    // look for three challenges that have todays date
    // if present, return those challenges
    // otherwise, pick 3 challenges and change the date to today and the completed_on_last_date variable to false
    //save returned 3 objects in an array
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
