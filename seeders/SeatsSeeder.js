module.exports = {
	seatsSeeder: runSeatsSeeder()
}

function runSeatsSeeder() {
	const Seat = require('../models/Seat');
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
		console.log('SeatsSeeder connected')
		mongoose.connection.db.dropCollection('seats');
	})
	.catch((err) => console.log(err));
	
	let seats = [
		new Seat({
			row: 1,
			column: "A"
		}),
		new Seat({
			row: 1,
			column: "B"
        }),
        new Seat({
			row: 1,
			column: "C"
        }),
        new Seat({
			row: 1,
			column: "D"
        }),
        new Seat({
			row: 1,
			column: "E"
        }),
        new Seat({
			row: 1,
			column: "F"
        }),
        new Seat({
			row: 1,
			column: "G"
        }),
        new Seat({
			row: 1,
			column: "H"
        }),
        new Seat({
			row: 1,
			column: "I"
        }),
        new Seat({
			row: 1,
			column: "J"
        }),
        new Seat({
			row: 2,
			column: "A"
		}),
		new Seat({
			row: 2,
			column: "B"
        }),
        new Seat({
			row: 2,
			column: "C"
        }),
        new Seat({
			row: 2,
			column: "D"
        }),
        new Seat({
			row: 2,
			column: "E"
        }),
        new Seat({
			row: 2,
			column: "F"
        }),
        new Seat({
			row: 2,
			column: "G"
        }),
        new Seat({
			row: 2,
			column: "H"
        }),
        new Seat({
			row: 2,
			column: "I"
        }),
        new Seat({
			row: 2,
			column: "J"
        }),
        new Seat({
			row: 3,
			column: "A"
		}),
		new Seat({
			row: 3,
			column: "B"
        }),
        new Seat({
			row: 3,
			column: "C"
        }),
        new Seat({
			row: 3,
			column: "D"
        }),
        new Seat({
			row: 3,
			column: "E"
        }),
        new Seat({
			row: 3,
			column: "F"
        }),
        new Seat({
			row: 3,
			column: "G"
        }),
        new Seat({
			row: 3,
			column: "H"
        }),
        new Seat({
			row: 3,
			column: "I"
        }),
        new Seat({
			row: 3,
			column: "J"
		})
	]
	
	var count = 0;
	for(let x = 0; x < seats.length; x++){
		seats[x].save(() => {
			count++;
			if(count === seats.length) {
				disconnect();
			}		
		});
	}

	const disconnect = () => {
		console.log("SeatsSeeder finished seeding!")
		mongoose.disconnect();
	}
}