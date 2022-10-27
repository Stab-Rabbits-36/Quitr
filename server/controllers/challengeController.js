const db = require('../db/dbConnection');

const challengeController = {};

challengeController.getChallenge = async (req, res, next) => {
  try {
    // look for three challenges that have todays date
    // if present, return those challenges
    // otherwise, pick 3 challenges and change the date to today and the completed_on_last_date variable to false
    
    const {user_id} = req.params;
    
    return next();
  } catch (error) {
    return next({
      status: error.status,
      message: {
        err: error.message,
      },
      log: `An error occurred in challengeController.updateDate. Check server logs for more details - ${error.log}`,
    });
  }
};

challengeController.updateDate = async (req, res, next) => {
  try {
    const {user_id, completed_on_last_date} = req.body;
    const update = `UPDATE user_challenges SET completed_on_last_date = ${points}, last_date_assigned = ${Date()} WHERE user_id = $1`
    await db.query(update);
    return next();
  } catch (error) {
    return next({
      status: error.status,
      message: {
        err: error.message,
      },
      log: `An error occurred in challengeController.updateDate. Check server logs for more details - ${error.log}`,
    });
  }
};

module.exports = challengeController;
