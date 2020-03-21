const express = require('express');
const actionHelper = require('../../data/helpers/actionModel');
const router = express.Router();

router.use((req, res, next) => {
  console.log('action Router');
  next();
});

module.exports = router;
