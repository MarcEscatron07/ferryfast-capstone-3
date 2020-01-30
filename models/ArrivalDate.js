const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const arrivalDateSchema = new Schema(
    {
        arrival_datetime: {
            type: Date,
            required: true
        },
        departureDateId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('ArrivalDate', arrivalDateSchema);