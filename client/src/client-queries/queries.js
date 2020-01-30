import { gql } from 'apollo-boost';

const getRolesQuery = gql`
    {
        getRoles {
            id
            name
            administrators {
                id
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
                id
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
                id
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
                id
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
                id
                name
            }
            stat {
                id
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
                id
                name
            }
            stat {
                id
                name
            }
        }
    }
`;

const getOriginsQuery = gql`
    {
        getOrigins {
            id
            name
            destinations {
                id
                name
                originId
            }
        }
    }
`;

const getOriginQuery = gql`
    query($id: String!){
        getOriginQuery(id: $id){
            id
            name
            destinations {
                id
                name
                originId
            }
        }
    }
`;

const getDestinationsQuery = gql`
    {
        getDestinations {
            id
            name
            originId
            origin {
                id
                name
            }
        }
    }
`;

const getDestinationQuery = gql`
    query($id: String!){
        getDestination(id: $id){
            id
            name
            originId
            origin {
                id
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
    getAdministratorQuery,
    getOriginsQuery,
    getOriginQuery,
    getDestinationsQuery,
    getDestinationQuery
}