const { ApolloServer, gql } = require('apollo-server-express');

const Role = require('../models/Role');
const Administrator = require('../models/Administrator');

const typeDefs = gql`
    type RoleType {
        id: ID
        name: String
    }
    type AdministratorType {
        id: ID
        username: String
        firstname: String
        surname: String
        email: String
        password: String
        roleId: String        
    }

    type Query {
        getRoles: [RoleType]
        getAdministrators: [AdministratorType]
    }

    type Mutation {
        createRole(
            name: String
        ): RoleType
        
        updateRole(
            id: ID!
            name: String
        ): RoleType

        deleteRole(
            id: ID!
        ): RoleType

        createAdministrator(
            username: String
            firstname: String
            surname: String
            email: String
            password: String
            roleId: String
        ): AdministratorType

        updateAdministrator(
            id: ID!
            username: String
            firstname: String
            surname: String
            email: String
            password: String
            roleId: String
        ): AdministratorType

        deleteAdministrator(
            id: ID!
        ): AdministratorType
    }
`;

const resolvers = {
    Query: {
        getRoles: () => {
            return Role.find({});
        },
        getAdministrators: () => {
            return Administrator.find({});
        }
    },
    Mutation: {
        createRole: (_,args) => {
            let newRole = Role({
                name: args.name
            })
            return newRole.save();
        },
        updateRole: (_,args) => {
            let updateRoleId = {_id:args.id}
            let udpateRoleData = {
                name: args.name
            }
            return Role.findOneAndUpdate(updateRoleId, udpateRoleData);
        },
        deleteRole: (_,args) => {
            return Role.findOneAndDelete({_id:args.id})
        },
        createAdministrator: (_,args) => {
            let newAdministrator = Administrator({
                username: args.username,
                firstname: args.firstname,
                surname: args.surname,
                email: args.email,
                password: args.password,
                roleId: args.roleId
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
                roleId: args.roleId
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