const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const departureDateSchema = new Schema(
    {
        departDateTime: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('DepartureDate', departureDateSchema);