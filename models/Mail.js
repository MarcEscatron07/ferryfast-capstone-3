const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mailSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        subject: String,
        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Mail', mailSchema);