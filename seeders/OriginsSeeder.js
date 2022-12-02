module.exports = {
	originsSeeder: (callback = undefined) => runOriginsSeeder(callback)
}

async function runOriginsSeeder(callback){
	const Origin = require('../models/Origin');
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
		console.log('OriginsSeeder connected')
		const docCount = await Origin.estimatedDocumentCount();
		if(docCount > 0) {
			await mongoose.connection.db.dropCollection('origins');
			console.log("'origins' collection successfully dropped")
		} else {
			console.log("'origins' collection is empty")
		}

		executeSeeding(() => {
			if(callback) {
				callback();
			}
		});
	})
	.catch((err) => console.log(err));	
	
	function executeSeeding(callback = undefined) {
		let origins = [
			new Origin({
				name: "Batangas"
			}),
			new Origin({
				name: "Bacolod"
			}),
			new Origin({
				name: "Calapan"
			}),
			new Origin({
				name: "Cebu"
			}),
			new Origin({
				name: "Iloilo"
			}),
			new Origin({
				name: "Ormoc"
			}),
			new Origin({
				name: "Tagbilaran"
			}),
		]
		
		var count = 0;
		for(let x = 0; x < origins.length; x++){
			origins[x].save(() => {
				count++;
				if(count === origins.length){
					console.log("OriginsSeeder finished seeding!")
					if(callback) {
						callback();
					}
					// mongoose.disconnect();
				}
			});
		}
	}
}
