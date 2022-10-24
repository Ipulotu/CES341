const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'))
router.use('/cookbook', require('./cookBook'))
router.use('/', require('./OAuth'))


module.exports = router;