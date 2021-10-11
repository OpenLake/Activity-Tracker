import express from 'express';

import * as user_controller from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, user_controller.user_list);

router.post('/register', user_controller.register_user);
router.post('/login', user_controller.login_user);
router.get('/verify', user_controller.verify_user);

// Note that auth middleware is being used
router.post('/addDevice', auth, user_controller.generate_token);
router.get('/profile', auth, user_controller.user_profile);

export default router;
