const path = require('path');
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// access user object: {_id, username, password, first_name, last_name}
// access fact according to quitLength.days -> returns a string

router.post('/create', userController.createUser, (req, res) => {
  res.status(201).json(res.locals.user);
})

router.post('/verification', userController.verifyUser, (req, res) => {
  res.status(201).json(res.locals.userExists);
})

router.get('/', userController.getUser, (req, res, next) => {
  res.status(200).json(res.locals.user);
});

// Old code
// router.get('/fact', userController.getFact, (req, res, next) => {
//   res.status(200).json(res.locals.fact);
// });

module.exports = router;
