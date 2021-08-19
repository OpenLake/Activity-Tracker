import { ActiveWindowWatcher } from './tracker.js';

const filePath = process.cwd() + '/activities.json';
const interval = 2000;

const activeWindowWatcher = new ActiveWindowWatcher(filePath, interval);
activeWindowWatcher.initialize();

//console.log(process.cwd());
