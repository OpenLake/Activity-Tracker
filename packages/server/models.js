const mongoose = require('mongoose');
const schema = mongoose.Schema;

const activitySchema = new schema({

    name: { type: String, required: true },
    title: { type: String, required: true },
    startTime: {type: Number, required: true},
    endTime: {type: Number, required: true},

});

const model =  mongoose.model('userActivity', activitySchema);

module.exports = model;