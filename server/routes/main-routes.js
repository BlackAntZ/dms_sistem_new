const express = require('express');
const mainController = require('../controllers/main.controllers');

const router = express.Router();

router.get('/', mainController.getStartPage);

router.post('/', mainController.editUserData);

module.exports = router;