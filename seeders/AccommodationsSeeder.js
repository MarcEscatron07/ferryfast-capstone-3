module.exports = {
	accommodationsSeeder: runAccommodationsSeeder()
}

function runAccommodationsSeeder() {
	const Accommodation = require('../models/Accommodation');
	const mongoose = require('mongoose');
	
	const ATLAS_URI = require('../config/connection').mongoURI;
	const uri = ATLAS_URI || 'mongodb://localhost:27017/capstone3_db';
	// const uri = 'mongodb://localhost:27017/capstone3_db';
	mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log('AccommodationsSeeder connected')
		mongoose.connection.db.dropCollection('accommodations');
	})
	.catch((err) => console.log(err));
	
	let accommodations = [
		new Accommodation({
			name: "Economy Class",
			price: 350.00
		}),
		new Accommodation({
			name: "Tourist Class",
			price: 500.00
        }),
        new Accommodation({
			name: "Business Class",
			price: 650.00
		})
	]
	
	var count = 0;
	for(let x = 0; x < accommodations.length; x++){
		accommodations[x].save(() => {
			count++;
			if(count === accommodations.length) {
				disconnect();
			}		
		});
	}

	const disconnect = () => {
		console.log("AccommodationsSeeder finished seeding!")
        mongoose.disconnect();
        process.exit();
	}
}