import { gql } from 'apollo-boost';

const createRoleMutation = gql`
    mutation($name: String!){
        createRole(
            name: $name
        ){
            id
        }
    }
`;

const createStatMutation = gql`
    mutation($name: String!){
        createStat(
            name: $name
        ){
            id
        }
    }
`;

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

export { 
    createRoleMutation,
    createStatMutation,
    createAdministratorMutation 
}