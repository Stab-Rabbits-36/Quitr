const path = require('path');
const express = require('express');
const router = express.Router();

const challengeController = require('../controllers/challengeController');

router.get('/recent/:user_id', challengeController.getChallenges, (req, res) => {
  console.log('got through middleware')
  res.status(200).json(res.locals.threeChallenges);
});

router.patch('/recent', challengeController.updateDate, (req, res) => {
    return res.status(200).json(true);
  });

module.exports = router;
