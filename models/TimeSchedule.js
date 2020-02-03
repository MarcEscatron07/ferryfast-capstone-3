const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeScheduleSchema = new Schema(
    {
        departureTime: {
            type: String,
            required: true
        },
        arrivalTime: {
            type: String,
            required: true
        },
        dateId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('TimeSchedule', timeScheduleSchema);