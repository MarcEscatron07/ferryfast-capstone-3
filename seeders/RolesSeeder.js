module.exports = {
	rolesSeeder: runRolesSeeder()
}

async function runRolesSeeder() {
	const Role = require('../models/Role');
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
		console.log('RolesSeeder connected')
		const docCount = await Role.estimatedDocumentCount();
		if(docCount > 0) {
			mongoose.connection.db.dropCollection('roles');
			console.log("'roles' collection successfully dropped")
		} else {
			console.log("'roles' collection is empty")
		}
	})
	.catch((err) => console.log(err));
	
	let roles = [
		new Role({
			uniqueId: 1,
			name: "Superadmin"
		}),
		new Role({
			uniqueId: 2,
			name: "Admin"
		})
	]
	
	var count = 0;
	for(let x = 0; x < roles.length; x++){
		roles[x].save(() => {
			count++;
			if(count === roles.length) {
				disconnect();
			}		
		});
	}

	const disconnect = () => {
		console.log("RolesSeeder finished seeding!")
		mongoose.disconnect();
	}
}