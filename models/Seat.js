const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const seatSchema = new Schema(
    {
        column: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Seat', seatSchema);