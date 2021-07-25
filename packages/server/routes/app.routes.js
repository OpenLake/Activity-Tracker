const express = require('express');
const router = express.Router();

const app_controller = require('../controllers/app.controller');

router.get('/', app_controller.all_apps);

module.exports = router;
