import { useLocal } from '../config.js';

import * as json_activity_controller from './json/activity.controller.js';
import * as json_app_controller from './json/app.controller.js';
import * as json_vscode_activity_controller from './json/vscodeactivity.controller.js';

import * as mongo_activity_controller from './mongo/activity.controller.js';
import * as mongo_app_controller from './mongo/app.controller.js';
import * as mongo_user_controller from './mongo/user.controller.js';

import * as mongo_vscode_activity_controller from './mongo/vscodeactivity.controller.js';

import * as mongo_mobile_activity_controller from './mongo/mobileActivity.controller.js';

export const activity_controller = useLocal
	? json_activity_controller
	: mongo_activity_controller;

export const mobile_activity_controller = mongo_mobile_activity_controller;

export const app_controller = useLocal
	? json_app_controller
	: mongo_app_controller;

export const user_controller = mongo_user_controller;

export const vscode_activity_controller = useLocal
	? json_vscode_activity_controller
	: mongo_vscode_activity_controller;
