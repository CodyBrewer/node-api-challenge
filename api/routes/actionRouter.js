const express = require('express');
const Action = require('../../data/helpers/actionModel');
const router = express.Router();

router.use((req, res, next) => {
  console.log('action Router');
  next();
});

module.exports = router;
