const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const arrivalDateSchema = new Schema(
    {
        arriveDateTime: {
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