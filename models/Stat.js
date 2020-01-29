const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statSchema = new Schema(
    {
    	uniqueId: {
    		type: Number,
    		required: true,
    		unique: true
    	},
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Stat', statSchema);