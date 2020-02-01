import { gql } from 'apollo-boost';

const createAdministratorMutation = gql`
    mutation(
        $username: String!
        $firstname: String!
        $surname: String!
        $password: String!
        $email: String!
        $roleId: Int!
        $statId: Int!
    ){
        createAdministrator(
            username: $username
            firstname: $firstname
            surname: $surname
            password: $password
            email: $email
            roleId: $roleId
            statId: $statId
        ){
            id
        }
    }
`;
const updateAdministratorMutation = gql`
    mutation(
        $id: ID!
        $username: String!
        $firstname: String!
        $surname: String!
        $password: String!
        $email: String!
        $roleId: Int!
        $statId: Int!
    ){
        updateAdministrator(
            id: $id
            username: $username
            firstname: $firstname
            surname: $surname
            password: $password
            email: $email
            roleId: $roleId
            statId: $statId
        ){
            id
        }
    }
`;
const deleteAdministratorMutation = gql`
    mutation($id: ID!){
        deleteAdministrator(id: $id){
            id
        }
    }
`;

const createOriginMutation = gql`
    mutation(
        $name: String!
    ){
        createOrigin(
            name: $name
        ){
            id
        }
    }
`;
const updateOriginMutation = gql`
    mutation(
        $id: ID!
        $name: String!
    ){
        updateOrigin(
            id: $id
            name: $name
        ){
            id
        }
    }
`;
const deleteOriginMutation = gql`
    mutation($id: ID!){
        deleteOrigin(id: $id){
            id
        }
    }
`;

const createDestinationMutation = gql`
    mutation(
        $name: String!
        $originId: String!
    ){
        createDestination(
            name: $name
            originId: $originId
        ){
            id
        }
    }
`;
const updateDestinationMutation = gql`
    mutation(
        $id: ID!
        $name: String!
        $originId: String!
    ){
        updateDestination(
            id: $id
            name: $name
            originId: $originId
        ){
            id
        }
    }
`;
const deleteDestinationMutation = gql`
    mutation($id: ID!){
        deleteDestination(id: $id){
            id
        }
    }
`;

export { 
    createAdministratorMutation,
    updateAdministratorMutation,
    deleteAdministratorMutation,
    createOriginMutation,
    updateOriginMutation,
    deleteOriginMutation,
    createDestinationMutation,
    updateDestinationMutation,
    deleteDestinationMutation
}