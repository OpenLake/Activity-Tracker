import ActiveWindowObject from './tracker.js';

const filePath = process.cwd() + '/activites.json';
const interval = 2000;

const activeWindowObject = new ActiveWindowObject(filePath, interval);
activeWindowObject.initialize();
