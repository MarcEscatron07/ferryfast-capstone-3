const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookingSchema = new Schema(
    {
        bookingNumber: {
            type: String,
            required: true
        },
        bookingDate: {
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
        },
        dateId: {
            type: String,
            required: true
        },
        timeId: {
            type: String,
            required: true
        },
        accommodationId: {
            type: String,
            required: true
        },
        statId: {
            type: String,
            required: true
        },
        passengerQuantity: {
            type: Number,
            required: true
        },
        totalPayment: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Booking', bookingSchema);