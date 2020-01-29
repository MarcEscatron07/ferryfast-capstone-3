module.exports = {
	rolesSeeder: runRolesSeeder()
}

function runRolesSeeder() {
	const Role = require('../../models/Role');
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
	.then(() => console.log('RolesSeeder connected'))
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
		console.log("RoleSeeder finished seeding!")
		mongoose.disconnect();
	}
}