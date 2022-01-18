import { useLocal } from '../config.js';

import * as json_activity_controller from './json/activity.controller.js';
import * as json_app_controller from './json/app.controller.js';

import * as mongo_activity_controller from './mongo/activity.controller.js';
import * as mongo_app_controller from './mongo/app.controller.js';
import * as mongo_user_controller from './mongo/user.controller.js';
import * as mongo_browser_activity_controller from './mongo/browserTracker.controller.js';

export const activity_controller = useLocal
	? json_activity_controller
	: mongo_activity_controller;

export const app_controller = useLocal
	? json_app_controller
	: mongo_app_controller;

export const user_controller = mongo_user_controller;

export const browser_activity_controller = mongo_browser_activity_controller;
