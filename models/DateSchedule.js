const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dateScheduleSchema = new Schema(
    {
        date: {
            type: Date,
            required: true
        },
        destinationId: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('DateSchedule', dateScheduleSchema);