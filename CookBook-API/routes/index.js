"use strict";
const express = require('express');
const router = express.Router();
router.use('/', require('./swagger'));
router.use('/cookbook', require('./cookBook'));
module.exports = router;
