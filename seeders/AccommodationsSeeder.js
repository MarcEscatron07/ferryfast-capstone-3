module.exports = {
	accommodationsSeeder: runAccommodationsSeeder()
}

async function runAccommodationsSeeder() {
	const Accommodation = require('../models/Accommodation');
	const mongoose = require('mongoose');
	
	const ATLAS_URI = require('../config/connection').mongoURI;
	const uri = ATLAS_URI || 'mongodb://localhost:27017/capstone3_db';
	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(async () => {
		console.log('AccommodationsSeeder connected')
		const docCount = await Accommodation.estimatedDocumentCount();
		if(docCount > 0) {
			mongoose.connection.db.dropCollection('accommodations');
			console.log("'accommodations' collection successfully dropped")
		} else {
			console.log("'accommodations' collection is empty")
		}
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