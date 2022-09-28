const express = require('express');
const mainController = require('../controllers/main.controllers');

const router = express.Router();

router.get('/', mainController.getStartPage);

module.exports = router;