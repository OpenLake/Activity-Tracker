import express from 'express';

import * as user_controller from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', user_controller.register_user);
router.post('/login', user_controller.login_user);

// Note that auth middleware is being used
router.get('/profile', auth, user_controller.user_profile);

export default router;
