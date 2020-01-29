import { gql } from 'apollo-boost';

const getRolesQuery = gql`
    {
        getRoles {
            id
            name
            administrators {
                username
                firstname
                surname
                email
                password
                roleId
                statId
            }
        }
    }
`;

const getRoleQuery = gql`
    query($id: String!){
        getRole(id: $id){
            id
            name
            administrators {
                username
                firstname
                surname
                email
                password
                roleId
                statId
            }
        }
    }
`;

const getStatsQuery = gql`
    {
        getStats {
            id
            name
            administrators {
                username
                firstname
                surname
                email
                password
                roleId
                statId
            }
        }
    }
`;

const getStatQuery = gql`
    query($id: String!){
        getStat(id: $id){
            id
            name
            administrators {
                username
                firstname
                surname
                email
                password
                roleId
                statId
            }
        }
    }
`;

const getAdministratorsQuery = gql`
    {
        getAdministrators {
            id
            username
            firstname
            surname
            email
            password
            roleId
            statId
            role {
                name
            }
            stat {
                name
            }
        }
    }
`;

const getAdministratorQuery = gql`
    query($id: String!){
        getAdministrator(id: $id){
            id
            username
            firstname
            surname
            email
            password
            roleId
            statId
            role {
                name
            }
            stat {
                name
            }
        }
    }
`;

export { 
    getRolesQuery,
    getRoleQuery,
    getStatsQuery,
    getStatQuery,
    getAdministratorsQuery,
    getAdministratorQuery 
}