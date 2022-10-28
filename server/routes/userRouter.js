const path = require('path');
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// access user object: {_id, username, password, first_name, last_name}

router.post('/create', userController.createUser, (req, res) => {
 return res.status(201).json(res.locals.user);
});

router.post('/verification', userController.verifyUser, (req, res) => {
  return res.status(201).json(res.locals.user);
});

router.post('/createHabit', userController.createUserHabit, (req, res) => {
 return res.status(201).json(res.locals.userHabits);
})

router.post('/createChallenges', userController.createUserChallenges, (req, res) => {
  return res.status(201).json(res.locals.userChallenges);
})

router.patch('/points', userController.updatePoints, (req, res) => {
  return res.status(200).json(true);
})

router.get('/', userController.getUser, (req, res, next) => {
  return res.status(200).json(res.locals.user);
});

module.exports = router;
