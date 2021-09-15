import express from 'express';
import * as app_controller from '../controllers/app.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, app_controller.all_apps);
router.get('/usage', auth, app_controller.app_usage);

export default router;
