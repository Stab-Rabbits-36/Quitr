const path = require('path');
const express = require('express');
const router = express.Router();

const habitController = require('../controllers/habitController');

router.post('/create', habitController.createHabit, (req, res) => {
  res.status(200).json(res.locals.habit); //creates a user's habit row in habit table and sends back entire object again
});

router.get('/streak/:user_id/:habit_id', habitController.getHabitInfo, (req, res) => {
  res.status(200).json(res.locals.habitInfo);
});

router.get('/streak/:user_id', habitController.getStreak, (req, res, next) => {
  res.status(200).json(res.locals.streak);
});

router.get('/:user_id', habitController.getHabit, (req, res, next) => {
  res.status(200).json(res.locals.habit); //sends back object of user's habit info + quitLength (days difference between now and quit start date)
});

router.patch('/streak', habitController.restartStreak, (req, res) => {
  return res.sendStatus(200);
})

// router.post('/checkin', habitController.checkIn, (req, res) => {
//   //on click of check in button
//   res.status(200).json(res.locals.checkIn); //updates streak and sets has_daily_checkin to true;
// });

// router.post('/reset', habitController.resetHabit, (req, res) => {
//   res.status(200).json(res.locals.reset); //click of "I caved button" resets quitLength and streak to 0
// });

// router.post('/newday', habitController.newDay, (req, res) => {
//   //on click of New Day button
//   res.status(200).json(res.locals.habit); //updates quitLength to + 1 day.
// });

module.exports = router;
