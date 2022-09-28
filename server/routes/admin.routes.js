const express = require('express');

const adminController = require('../controllers/admin.controller');

const router = express.Router();

router.get('/users', adminController.getAllUsers);

router.post('/users/edit', adminController.editUserData);

router.post('/tag', adminController.postNewTag);

router.get('/task', adminController.getAllTasks);

router.post('/task', adminController.postNewTask);

module.exports = router;