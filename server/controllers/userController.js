const db = require('../db/dbConnection');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { username, password, first_name, last_name} = req.body;
    if (typeof username !== 'string') throw new Error ('username should be a string');
    const insert = `INSERT INTO public.users VALUES(DEFAULT, '${username}', '${password}', '${first_name}', '${last_name}');`;
    await db.query(insert);
    const queryString = `SELECT * from public.users WHERE username = $1;`;
    const values = [username];
    const { rows } = await db.query(queryString, values);
    res.locals.user = rows[0];
    return next();
  } catch (err) {
    return next({
      log: `Usercontroller.js: ERROR: ${err}`,
      status: 400,
      message: {
        err: `An error occurred in userController.createUser. Check server logs for more details - ${error.log}`,
      },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return next ('Missing username or password in userController.verifyUser');
  try {
    const queryString = `SELECT * from public.users WHERE username = $1 AND password = $2;`;
    const values = [username, password];
    const { rows } = await db.query(queryString, values);
    const { _id, first_name, last_name } = rows[0];
    res.locals.user = {_id, first_name, last_name};
    return next();
  } catch (error) {
    return next({
      status: error.status,
      message: {
        err: error.message,
      },
      log: `An error occurred in userController.getUser. Check server logs for more details - ${error.log}`,
    });
  }
};

userController.getUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    const queryString = `SELECT * from public.users WHERE username = $1;`;
    const values = [username];
    const { rows } = await db.query(queryString, values);
    res.locals.user = rows[0];
    return next();
  } catch (error) {
    return next({
      status: error.status,
      message: {
        err: error.message,
      },
      log: `An error occurred in userController.getUser. Check server logs for more details - ${error.log}`,
    });
  }
};

// const { userId } = req.query;
// const queryString = 'SELECT * FROM users WHERE user_id = $1;';
// const values = [userId];
// const { rows } = await db.query(queryString, values);
// res.locals.user = rows[0];

// Insert Queries for facts table:
//  'INSERT INTO Facts (day_1) VALUES ('Your oxygen levels begin to return to normal, whilst nicotine and carbon monoxide levels in your blood decrease by over 50%');';
//  'INSERT INTO Facts (day_2) VALUES ('You should start to notice an improved sense of taste and smell. As nicotine levels become depleted, the side effects of nicotine withdrawal such as anxiety and irritability might start to creep in.');';
//  'INSERT INTO Facts (day_3) VALUES ('Your lungs begin to relax and breathing should be easier. Nicotine is completely eliminated from the body and as a result nicotine withdrawal symptoms will have reached their peak.');';
//  'INSERT INTO Facts (day_7) VALUES ('The average smoker will begin to notice a reduction in the number of nicotine cravings experienced in a day (you’re getting there!)');';
//  'INSERT INTO Facts (day_14) VALUES ('Your circulation starts to improve. You may notice that physical activity becomes a lot easier. You’ll be free of the addiction and any psychological effects of withdrawal should have ended.');';

module.exports = userController;
