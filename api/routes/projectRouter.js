const express = require('express');
const projectHelper = require('../../data/helpers/projectModel');
const router = express.Router();

router.use((req, res, next) => {
  console.log('project Router');
  next();
});

module.exports = router;
