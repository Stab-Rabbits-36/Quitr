const db = require('../db/dbConnection');

const habitController = {};

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
      const queryString = `SELECT * FROM public.habits WHERE name = $1`;
      const values = [user_id];
      const { rows } = await db.query(queryString, values);
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

habitController.updateStreak = async (req, res, next) => {
  try {
    const {user_id, streak} = req.body;
    const update = `UPDATE public.user_habits SET streak = $2 WHERE user_id = $1`
    const values = [user_id, streak];
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
