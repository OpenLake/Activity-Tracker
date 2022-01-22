import express from 'express';
import auth from '../middlewares/auth.js';
import { vscode_activity_controller } from '../controllers/index.js';

const router = express.Router();

router.get('/', auth, vscode_activity_controller.all_activities);
router.post('/', auth, vscode_activity_controller.activity_create);
router.get('/projects', auth, vscode_activity_controller.all_projects);
router.get('/usage', auth, vscode_activity_controller.project_usage);
router.get('/languages', auth, vscode_activity_controller.all_languages);

export default router;
