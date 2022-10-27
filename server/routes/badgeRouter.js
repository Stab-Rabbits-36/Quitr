const path = require('path');
const express = require('express');
const router = express.Router();

const badgeController = require('../controllers/badgeController');

router.post('/create', badgeController.createBadge, (req, res) => {
  res.status(200).json(res.locals.badge); //creates a user's habit row in habit table and sends back entire object again
});

module.exports = router;
