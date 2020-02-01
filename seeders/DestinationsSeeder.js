module.exports = {
	destinationsSeeder: runDestinationsSeeder()
}

function runDestinationsSeeder(){
	const Destination = require('../models/Destination');
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
		console.log('DestinationsSeeder connected')
		mongoose.connection.db.dropCollection('destinations');
	})
	.catch((err) => console.log(err));	
	
	let destinations = [
		new Destination({
            name: "Calapan",
            originId: "0"
		}),
		new Destination({
            name: "Tagbilaran",
            originId: "0"
        }),
        new Destination({
            name: "Ormoc",
            originId: "0"
		}),
		new Destination({
            name: "Bacolod",
            originId: "0"
		})
	]
	
	var count = 0;
	for(let x = 0; x < destinations.length; x++){
		destinations[x].save(() => {
			count++;
			if(count === destinations.length){
				disconnect();
			}
		});
	}
	
	const disconnect = () => {
		console.log("DestinationsSeeder finished seeding!")
		mongoose.disconnect();        
		process.exit();
	}
}
