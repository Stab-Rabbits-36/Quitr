// const { unstable_createtaticHandler } = require('@remix-run/router'); // what was this doing in the legacy codebase??
const db = require('../db/dbConnection');
const dateHelper = require ('../dateHelperFunctions');

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
        err: `An error occurred in userController.createUser. Check server logs for more details - ${error}`,
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
      log: `An error occurred in userController.getUser. Check server logs for more details - ${error}`,
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
      log: `An error occurred in userController.getUser. Check server logs for more details - ${error}`,
    });
  }
};

userController.createUserHabit = async (req, res, next) => {
  try {
    const {user_id, habit_id} = req.body;
    const now = dateHelper.formatDate();
    const insert = `INSERT INTO public.user_habits VALUES (DEFAULT, ${user_id}, ${habit_id}, '${now}', 0, 0);`;
    const values = [user_id, habit_id];
    await db.query(insert);
    const queryString = `SELECT * FROM public.user_habits WHERE user_id = $1 AND habit_id = $2;`;
    console.log('queryString ' + queryString);
    const { rows } = await db.query(queryString, values);
    console.log('got past 2nd db query')
    res.locals.userHabits = rows[0];
    return next();
  } catch (error) {
    return next({
      status: error.status,
      message: {
        err: error.message,
      },
      log: `An error occurred in userController.createUserHabit. Check server logs for more details - ${error}`,
    });
  }
};

userController.createUserChallenges = async (req, res, next) => {
  try {
    const {user_id} = req.body;
    const now = dateHelper.formatDate();
    db.query(`SELECT _id FROM public.challenges`)
      .then(data => {
        console.log(data.rows);
        let insert = `INSERT INTO public.user_challenges VALUES `;
        for(let i = 0; i < data.rows.length; i++){
          insert += `(DEFAULT, ${user_id}, ${data.rows[i]._id}, 0, null, false),`;
        }
        insert = insert.substring(0, insert.length - 1) + ';'
        db.query(insert).then(data => next())

      });
  } catch (error) {
    return next({
      status: error.status,
      message: {
        err: error.message,
      },
      log: `An error occurred in userController.createUserHabit. Check server logs for more details - ${error}`,
    });
  }
};

userController.updatePoints = async (req, res, next) => {
  try {
    console.log('here');
    const {user_id, points} = req.body;
    const update = `UPDATE public.user_habits SET points = $2 WHERE user_id = $1 RETURNING *`
    const values = [user_id, points]
    await db.query(update, values)
    return next();
  } catch (error) {
    return next({
      status: error.status,
      message: {
        err: error.message,
      },
      log: `An error occurred in userController.updatePoints. Check server logs for more details - ${error.log}`,
    });
  }
};

module.exports = userController;

// Insert Queries for facts table:
//  'INSERT INTO Facts (day_1) VALUES ('Your oxygen levels begin to return to normal, whilst nicotine and carbon monoxide levels in your blood decrease by over 50%');';
//  'INSERT INTO Facts (day_2) VALUES ('You should start to notice an improved sense of taste and smell. As nicotine levels become depleted, the side effects of nicotine withdrawal such as anxiety and irritability might start to creep in.');';
//  'INSERT INTO Facts (day_3) VALUES ('Your lungs begin to relax and breathing should be easier. Nicotine is completely eliminated from the body and as a result nicotine withdrawal symptoms will have reached their peak.');';
//  'INSERT INTO Facts (day_7) VALUES ('The average smoker will begin to notice a reduction in the number of nicotine cravings experienced in a day (you’re getting there!)');';
//  'INSERT INTO Facts (day_14) VALUES ('Your circulation starts to improve. You may notice that physical activity becomes a lot easier. You’ll be free of the addiction and any psychological effects of withdrawal should have ended.');';