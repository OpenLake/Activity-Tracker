import { useLocal } from '../config.js';

import * as local_activity_controller from './local/activity.controller.js';
import * as local_app_controller from './local/app.controller.js';

import * as mongo_activity_controller from './mongo/activity.controller.js';
import * as mongo_app_controller from './mongo/app.controller.js';
import * as mongo_user_controller from './mongo/user.controller.js';

export const activity_controller = useLocal
	? local_activity_controller
	: mongo_activity_controller;

export const app_controller = useLocal
	? local_app_controller
	: mongo_app_controller;

export const user_controller = mongo_user_controller;
