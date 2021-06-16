import activeWin from 'active-win';
import ActiveWindowObject from "./tracker.js";
import path from 'path';

// log active window twice (this would give error in active-win from npm)
//console.log(activeWin.sync().title);
//console.log(activeWin.sync().title);

const __dirname = path.resolve();
const filePath = path.join(__dirname, "activites.json")
const interval = 2000


const activeWindowObject = new ActiveWindowObject(filePath, interval);
activeWindowObject.initialize();
