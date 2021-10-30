import express from 'express';
import auth from '../middlewares/auth.js';
import { app_controller } from '../controllers/index.js';

const router = express.Router();

router.get('/', auth, app_controller.all_apps);
router.get('/usage', auth, app_controller.app_usage);

export default router;
