const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passengerDetailSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        middleinitial: String,
        lastname: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true
        },        
        seatId: {
            type: String,
            required: true
        },
        contactDetailId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('PassengerDetail', passengerDetailSchema);