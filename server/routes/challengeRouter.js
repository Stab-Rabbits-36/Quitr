const path = require('path');
const express = require('express');
const router = express.Router();

const challengeController = require('../controllers/challengeController');

router.patch('/streak/recent', challengeController.updateDate, (req, res, next) => {
    res.sendStatus(200)
  });

module.exports = router;
