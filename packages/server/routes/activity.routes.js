const express = require('express');
const router = express.Router();

const activity_controller = require('../controllers/activity.controller');

router.get('/', activity_controller.all_activities);
router.post('/', activity_controller.activity_create);

module.exports = router;
