const db = require('../db/dbConnection');

const badgeController = {};

badgeController.createBadge = async (req, res, next) => {
    try {  
      const {name, point_threshold} = req.body;
      const insert = `INSERT INTO public.badges VALUES(DEFAULT, '${name}', '${point_threshold}');`;
      await db.query(insert);
      const queryString = `SELECT * FROM public.badges WHERE name = $1`;
      const values = [name];
      const {rows} = await db.query(queryString, values);
      res.locals.badge = rows[0];
      return next();
    } catch (err) {
      return next({
        log: `badgeController.js: ERROR: ${err}`,
        status: 400,
        message: {
          err: `An error occurred in badgeController.createBadge. Check server logs for more details - ${error.log}`,
        },
      });
    }
  }

module.exports = badgeController;
