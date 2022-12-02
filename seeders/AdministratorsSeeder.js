module.exports = {
    administratorsSeeder: (callback = undefined) => runAdministratorsSeeder(callback)
}

async function runAdministratorsSeeder(callback){
    const Administrator = require('../models/Administrator')
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
		console.log('AdministratorsSeeder connected')
		const docCount = await Administrator.estimatedDocumentCount();
		if(docCount > 0) {
			await mongoose.connection.db.dropCollection('administrators');
			console.log("'administrators' collection successfully dropped")
		} else {
			console.log("'administrators' collection is empty")
		}

        executeSeeding(() => {
            if(callback) {
                callback();
            }
        });
	})
    .catch((err) => console.log(err));

    function executeSeeding(callback = undefined) {
        let administrators = [
            new Administrator({
                username: "marcus",
                firstname: "Marc",
                surname: "Escatron",
                email: "marc.escatron07@gmail.com",
                password: "supadmin",
                roleId: 1,
                statId: 1
            }),
            new Administrator({
                username: "espegez",
                firstname: "Mariah Espe",
                surname: "Gesalan",
                email: "espegez28@gmail.com",
                password: "admin",
                roleId: 2,
                statId: 1
            })
        ]
    
        var count = 0;
        for(let x = 0; x < administrators.length; x++){
            administrators[x].save(() => {
                count++;
                if(count === administrators.length){
                    console.log("AdministratorsSeeder finished seeding!")
                    if(callback) {
                        callback();
                    }
                    // mongoose.disconnect();
                }
            });
        }
    }    
}