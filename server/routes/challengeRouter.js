const path = require('path');
const express = require('express');
const router = express.Router();

const challengeController = require('../controllers/challengeController');

router.get('/recent/:user_id', challengeController.getChallenge, (req, res) => {
  res.status(200).json(res.locals.challenge)
})

router.patch('/recent', challengeController.updateDate, (req, res) => {
    res.sendStatus(200)
  });

module.exports = router;
