const rolesSeed = require('./RolesSeeder');
const statsSeed = require('./StatsSeeder');
const administratorsSeed = require('./AdministratorsSeeder');

const originsSeed = require('./OriginsSeeder');
const seatsSeed = require('./SeatsSeeder')
const accommodationsSeed = require('./AccommodationsSeeder');

function runSeeders() {
    const mongoose = require('mongoose');

    rolesSeed.rolesSeeder(() => {
        statsSeed.statsSeeder(() => {
            administratorsSeed.administratorsSeeder(() => {
                originsSeed.originsSeeder(() => {
                    seatsSeed.seatsSeeder(() => {
                        accommodationsSeed.accommodationsSeeder(() => {
                            console.log('All seeders have finished executing!')
                            mongoose.disconnect();
                            process.exit();
                        });
                    });
                });
            });
        });
    });
}

runSeeders();