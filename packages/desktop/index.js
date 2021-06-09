import activeWin from 'active-win';

// log active window twice (this would give error in active-win from npm)
console.log(activeWin.sync().title);
console.log(activeWin.sync().title);
