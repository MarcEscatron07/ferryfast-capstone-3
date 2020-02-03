const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dateScheduleSchema = new Schema(
    {
        date: {
            type: Date,
            required: true
        },
        originId: {
            type: String,
            required: true
        },
        destinationId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('DateSchedule', dateScheduleSchema);