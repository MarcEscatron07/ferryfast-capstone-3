const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const seatSchema = new Schema(
    {
        row: {
            type: Number,
            required: true
        },
        column: {
            type: String,
            required: true
        }  
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Seat', seatSchema);