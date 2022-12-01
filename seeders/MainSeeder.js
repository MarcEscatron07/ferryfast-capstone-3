const rolesSeed = require('./RolesSeeder');
const statsSeed = require('./StatsSeeder');
const administratorsSeed = require('./AdministratorsSeeder');

const originsSeed = require('./OriginsSeeder');
const seatsSeed = require('./SeatsSeeder')
const accommodationsSeed = require('./AccommodationsSeeder');

async function runSeeders() {
    await rolesSeed.rolesSeeder
    await statsSeed.statsSeeder
    await administratorsSeed.administratorsSeeder
    await originsSeed.originsSeeder
    await seatsSeed.seatsSeeder
    await accommodationsSeed.accommodationsSeeder
}

runSeeders();