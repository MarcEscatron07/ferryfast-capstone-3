const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const administratorSchema = new Schema(
    {
        username: {
            type: String, required: true, unique: true
        },
        firstname: {
            type: String, required: true
        },
        surname: {
            type: String, required: true
        },
        email: {
            type: String, required: true, unique: true
        },
        password: {
            type: String, required: true
        },
        roleId: {
            type: Number, required: true
        },
        statId: {
            type: Number, required: true
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Administrator', administratorSchema);