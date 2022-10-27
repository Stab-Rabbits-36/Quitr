const db = require('../db/dbConnection');

const habitController = {};

const formatDate = dateObj => {
  //converts date object to this format: '2022/09/22 06:00' (ex)
  const timeStamp = new Date(); //Oi, Remember that date object month is 0 based, so "09" is October
  let hours = timeStamp.getUTCHours().toString();
  let day = timeStamp.getUTCDate().toString();
  let month = (timeStamp.getUTCMonth() + 1).toString();
  const year = timeStamp.getUTCFullYear().toString();
  if (day.length < 2) day = `0${day}`;
  if (month.length < 2) month = `0${month}`;
  return `${year}/${month}/${day} ${hours}:00`;
};

habitController.createHabit = async (req, res, next) => {
  try {  
    const {name, description} = req.body;
    const insert = `INSERT INTO public.habits VALUES(DEFAULT, '${name}', '${description}');`;
    await db.query(insert);
    const queryString = `SELECT * FROM public.habits WHERE name = $1`;
    const values = [name];
    const {rows} = await db.query(queryString, values);
    res.locals.habit = rows[0];
    return next();
  } catch (error) {
    return next({
      log: `habitController.js: ERROR: ${error}`,
      status: 400,
      message: {
        err: `An error occurred in habitController.createUser. Check server logs for more details - ${error}`,
      },
    });
  }
}

// original getHabit just to send back userid & habit_id
// habitController.getHabit = async (req, res, next) => {
//   try {
//       const {user_id} = req.params;
//       const queryString = `SELECT * FROM public.habits WHERE name = $1`;
//       const values = [user_id];
//       const { rows } = await db.query(queryString, values);
//       res.locals.habit = rows[0];
//       return next();
//   } catch (err) {
//       return next({
//         log: `habitController.js: ERROR: ${err}`,
//         status: 400,
//         message: {
//           err: `An error occurred in habitController.getHabit. Check server logs for more details - ${error.log}`,
//         },
//       });
//   }
// }

// TODO: return obj containing habit name, badge name, points, point_threshold, streak
habitController.getHabit = async (req, res, next) => {
  try {
      const {user_id} = req.params;
      const queryString = `SELECT * FROM public.user_habits WHERE user_id = $1`;
      console.log(queryString);
      const values = [user_id];
      const { rows } = await db.query(queryString, values);
      console.log(rows);
      res.locals.habit = rows[0];
      return next();
  } catch (error) {
      return next({
        log: `habitController.js: ERROR: ${error}`,
        status: 400,
        message: {
          err: `An error occurred in habitController.getHabit. Check server logs for more details - ${error}`,
        },
      });
  }
}

habitController.getStreak = async (req, res, next) => {
  try {
      const { user_id } = req.params;
      const queryString = `SELECT streak FROM user_habits WHERE user_id = $1`;
      const values = [user_id];
      const { rows } = await db.query(queryString, values);
      res.locals.streak = rows[0];
      return next();
  } catch (error) {
      return next({
        log: `habitController.js: ERROR: ${error}`,
        status: 400,
        message: {
          err: `An error occurred in habitController.getStreak. Check server logs for more details - ${error}`,
        },
      });
  }
}



// format date and set date to today 
habitController.restartStreak = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const date = formatDate();
    const update = `UPDATE public.user_habits SET date_started = $2, streak = 0 WHERE user_id = $1`
    const values = [user_id, date];
    const { rows } = await db.query(update, values);
    return next();
  } catch (error) {
    return next({
      log: `habitController.js: ERROR: ${error}`,
      status: 400,
      message: {
        err: `An error occurred in habitController.updateStreak. Check server logs for more details - ${error}`,
      },
    });
  }
}

habitController.getHabitInfo = async (req, res, next) => {
  try {
    console.log('entering getHabitInfo');
    const {user_id, habit_id} = req.params;
    const select = `SELECT * FROM public.user_habits LEFT OUTER JOIN public.habits ON public.user_habits.habit_id = public.habits._id WHERE user_id = $1 AND habit_id = $2`; //habit name, points, and streak
    const values = [user_id, habit_id];
    const { rows } = await db.query(select, values);
    res.locals.habitInfo = rows[0];
    return next();
  } catch (error) {
    return next({
      log: `habitController.js: ERROR: ${error}`,
      status: 400,
      message: {
        err: `An error occurred in habitController.updateStreak. Check server logs for more details - ${error}`,
      },
    });
  }
}

module.exports = habitController;
