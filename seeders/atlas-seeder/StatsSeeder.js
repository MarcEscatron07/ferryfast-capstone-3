const Stat = require('../../models/Stat');
const mongoose = require('mongoose');

const ATLAS_URI = require('../../config/connection').mongoURI;
const uri = ATLAS_URI || 'mongodb://localhost:27017/capstone3_db';
// const uri = 'mongodb://localhost:27017/capstone3_db';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.log(err));

let stats = [
	new Stat({
		uniqueId: 1,
        name: "active"
	}),
	new Stat({
		uniqueId: 2,
        name: "deactivated"
	}),
	new Stat({
		uniqueId: 3,
        name: "pending"
	})
]

var count = 0;
for(let x = 0; x < stats.length; x++){
	stats[x].save(() => {
		count++;
		if(count === stats.length){
			disconnect();
		}
	});
}

const disconnect = () => {
	console.log("'StatsSeeder' finished seeding!")
	mongoose.disconnect();
}