const { ApolloServer, gql } = require('apollo-server-express');

const Role = require('../models/Role');
const Stat = require('../models/Stat');
const Administrator = require('../models/Administrator');

const Origin = require('../models/Origin');
const Destination = require('../models/Destination');

const typeDefs = gql`
    type RoleType {
        id: ID
        uniqueId: Int
        name: String
        administrators: [AdministratorType]
    }
    type StatType {
        id: ID
        uniqueId: Int
        name: String
        administrators: [AdministratorType]
    }
    type AdministratorType {
        id: ID
        username: String
        firstname: String
        surname: String
        email: String
        password: String
        roleId: Int
        statId: Int
        role: RoleType
        stat: StatType
    }

    type OriginType {
        id: ID
        name: String
        destinations: [DestinationType]
    }
    type DestinationType {
        id: ID
        name: String
        originId: String
        origin: OriginType
    }

    type Query {
        getRoles(id: String): [RoleType]
        getRole(id: String): RoleType
        getStats(id: String): [StatType]
        getStat(id: String): StatType
        getAdministrators(id: String): [AdministratorType]
        getAdministrator(id: String): AdministratorType

        getOrigins(id: String): [OriginType]
        getOrigin(id: String): OriginType
        getDestinations(id: String): [DestinationType]
        getDestination(id: String): DestinationType
    }
    type Mutation {
        createRole(
            uniqueId: Int
            name: String
        ): RoleType
        updateRole(
            id: ID
            uniqueId: Int
            name: String
        ): RoleType
        deleteRole(
            id: ID
        ): RoleType

        createStat(
            uniqueId: Int
            name: String
        ): StatType
        updateStat(
            id: ID
            uniqueId: Int
            name: String
        ): StatType
        deleteStat(
            id: ID
        ): StatType

        createAdministrator(
            username: String
            firstname: String
            surname: String
            email: String
            password: String
            roleId: Int
            statId: Int
        ): AdministratorType
        updateAdministrator(
            id: ID
            username: String
            firstname: String
            surname: String
            email: String
            password: String
            roleId: Int
            statId: Int
        ): AdministratorType
        deleteAdministrator(
            id: ID
        ): AdministratorType

        createOrigin(
            name: String
            originId: String
        ): OriginType
        updateOrigin(
            id: ID
            name: String
            originId: String
        ): OriginType
        deleteOrigin(
            id: ID
        ): OriginType

        createDestination(
            name: String
            originId: String
        ): DestinationType
        updateDestination(
            id: ID
            name: String
            originId: String
        ): DestinationType
        deleteDestination(
            id: ID
        ): DestinationType
    }
`;

const resolvers = {
    Query: {
        getRoles: (_,args) => {
            if(!args.id)
                return Role.find({});
            return Role.find({_id:args.id});
        },
        getRole: (_,args) => {
            return Role.findById(args.id);
        },
        getStats: (_,args) => {
            if(!args.id)
                return Stat.find({});
            return Stat.find({_id:args.id});
        },
        getStat: (_,args) => {
            return Stat.findById(args.id);
        },
        getAdministrators: (_,args) => {
            if(!args.id)
                return Administrator.find({});
            return Administrator.find({_id:args.id});
        },
        getAdministrator: (_,args) => {
            return Administrator.findById(args.id);
        },

        getOrigins: (_,args) => {
            if(!args.id)
                return Origin.find({});
            return Origin.find({_id:args.id});
        },
        getOrigin: (_,args) => {
            return Origin.findById(args.id);
        },
        getDestinations: (_,args) => {
            if(!args.id)
                return Destination.find({});
            return Destination.find({_id:args.id});
        },
        getDestination: (_,args) => {
            return Destination.findById(args.id);
        }
    },

    RoleType: {
        administrators: (parent,_) => {
            return Administrator.find({roleId:parent.uniqueId});
        }
    },
    StatType: {
        administrators: (parent,_) => {
            return Administrator.find({statId:parent.uniqueId});
        }
    },
    AdministratorType: {
        role: (parent,_) => {
            return Role.findOne({uniqueId:parent.roleId});
        },
        stat: (parent,_) => {
            return Stat.findOne({uniqueId:parent.statId});
        }
    },

    OriginType: {
        destinations: (parent,_) => {
            return Destination.find({originId:parent.id});
        }
    },
    DestinationType: {
        origin: (parent,_) => {
            return Origin.findOne({_id:parent.originId});
        }
    },

    Mutation: {
        createRole: (_,args) => {
            let newRole = Role({
                uniqueId: args.uniqueId,
                name: args.name
            })
            return newRole.save();
        },
        updateRole: (_,args) => {
            let updateRoleId = {_id:args.id}
            let updateRoleData = {
                uniqueId: args.uniqueId,
                name: args.name
            }
            return Role.findOneAndUpdate(updateRoleId, updateRoleData);
        },
        deleteRole: (_,args) => {
            return Role.findOneAndDelete({_id:args.id});
        },
        createStat: (_,args) => {
            let newStat = Stat({
                uniqueId: args.uniqueId,
                name: args.name
            })
            return newStat.save();
        },
        updateStat: (_,args) => {
            let updateStatId = {_id:args.id}
            let updateStatData = {
                uniqueId: args.uniqueId,
                name: args.name
            }
            return Stat.findOneAndUpdate(updateStatId, updateStatData);
        },
        deleteStat: (_,args) => {
            return Stat.findOneAndDelete({_id:args.id});
        },
        createAdministrator: (_,args) => {
            let newAdministrator = Administrator({
                username: args.username,
                firstname: args.firstname,
                surname: args.surname,
                email: args.email,
                password: args.password,
                roleId: args.roleId,
                statId: args.statId
            })
            return newAdministrator.save();
        },
        updateAdministrator: (_,args) => {
            let updateAdministratorId = {_id:args.id}
            let updateAdministratorData = {
                username: args.username,
                firstname: args.firstname,
                surname: args.surname,
                email: args.email,
                password: args.password,
                roleId: args.roleId,
                statId: args.statId
            }
            return Administrator.findOneAndUpdate(updateAdministratorId, updateAdministratorData);
        },
        deleteAdministrator: (_,args) => {
            return Administrator.findOneAndDelete({_id:args.id});
        },

        createOrigin: (_,args) => {
            let newOrigin = Origin({
                name: args.name
            })
            return newOrigin.save();
        },
        updateOrigin: (_,args) => {
            let updateOriginId = {_id:args.id}
            let updateOriginData = {
                name: args.name
            }
            return Origin.findOneAndUpdate(updateOriginId, updateOriginData);
        },
        deleteOrigin: (_,args) => {
            return Origin.findOneAndDelete({_id:args.id});
        },

        createDestination: (_,args) => {
            let newDestination = Destination({
                name: args.name,
                originId: args.originId
            })
            return newDestination.save();
        },
        updateDestination: (_,args) => {
            let updateDestinationId = {_id:args.id}
            let updateDestinationData = {
                name: args.name,
                originId: args.originId
            }
            return Destination.findOneAndUpdate(updateDestinationId, updateDestinationData);
        },
        deleteDestination: (_,args) => {
            return Destination.findOneAndDelete({_id:args.id});
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});
module.exports = server;