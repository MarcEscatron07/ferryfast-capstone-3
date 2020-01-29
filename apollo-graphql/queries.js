const { ApolloServer, gql } = require('apollo-server-express');

const Role = require('../models/Role');
const Stat = require('../models/Stats');
const Administrator = require('../models/Administrator');

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
        roleId: String
        statId: String
        role: RoleType
        stat: StatType
    }

    type Query {
        getRoles(id: String): [RoleType]
        getRole(id: String): RoleType

        getStats(id: String): [StatType]
        getStat(id: String): StatType

        getAdministrators(id: String): [AdministratorType]
        getAdministrator(id: String): AdministratorType
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
            roleId: String
            statId: String
        ): AdministratorType

        updateAdministrator(
            id: ID
            username: String
            firstname: String
            surname: String
            email: String
            password: String
            roleId: String
            statId: String
        ): AdministratorType

        deleteAdministrator(
            id: ID
        ): AdministratorType
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
        }
    },
    RoleType: {
        administrators: (parent,args) => {
            return Administrator.find({roleId: parent.id});
        }
    },
    StatType: {
        administrators: (parent,args) => {
            return Administrator.find({statId: parent.id});
        }
    },
    AdministratorType: {
        role: (parent,args) => {
            return Role.findOne({_id: parent.roleId});
        },
        stat: (parent,args) => {
            return Stat.findOne({_id: parent.statId})
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
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});
module.exports = server;