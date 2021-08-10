import express from 'express';
import * as app_controller from '../controllers/app.controller.js';

const router = express.Router();

router.get('/', app_controller.all_apps);
router.get('/usage', app_controller.app_usage);

export default router;
