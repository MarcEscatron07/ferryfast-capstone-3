const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contactSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Contact', contactSchema);