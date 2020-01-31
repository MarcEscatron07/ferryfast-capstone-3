module.exports = {
	originsSeeder: runOriginsSeeder()
}

function runOriginsSeeder(){
	const Origin = require('../models/Origin');
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
		console.log('OriginsSeeder connected')
		mongoose.connection.db.dropCollection('origins');
	})
	.catch((err) => console.log(err));	
	
	let origins = [
		new Origin({
			name: "Batangas"
		}),
		new Origin({
			name: "Cebu"
		}),
		new Origin({
			name: "Iloilo"
		})
	]
	
	var count = 0;
	for(let x = 0; x < origins.length; x++){
		origins[x].save(() => {
			count++;
			if(count === origins.length){
				disconnect();
			}
		});
	}
	
	const disconnect = () => {
		console.log("OriginsSeeder finished seeding!")
        mongoose.disconnect();        
	}
}
