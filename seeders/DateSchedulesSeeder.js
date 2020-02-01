module.exports = {
	dateSchedulesSeeder: runDateSchedulesSeeder()
}

function runDateSchedulesSeeder(){
	const DateSchedule = require('../models/DateSchedule');
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
		console.log('DateSchedulesSeeder connected')
		mongoose.connection.db.dropCollection('dateschedules');
	})
	.catch((err) => console.log(err));	
	
	let dateSchedules = [
		new DateSchedule({
			date: new Date(),
			destinationId: "0"
		})
	]
	
	var count = 0;
	for(let x = 0; x < dateSchedules.length; x++){
		dateSchedules[x].save(() => {
			count++;
			if(count === dateSchedules.length){
				disconnect();
			}
		});
	}
	
	const disconnect = () => {
		console.log("DateSchedulesSeeder finished seeding!")
		mongoose.disconnect();
	}
}
