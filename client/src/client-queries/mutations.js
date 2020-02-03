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

const createDateScheduleMutation = gql`
    mutation(
        $date: Date!
        $destinationId: String!
    ){
        createDateSchedule(
            date: $date
            destinationId: $destinationId
        ){
            id
        }
    }
`;
const updateDateScheduleMutation = gql`
    mutation(
        $id: ID!
        $date: Date!
        $destinationId: String!
    ){
        updateDateSchedule(
            id: $id
            date: $date
            destinationId: $destinationId
        ){
            id
        }
    }
`;
const deleteDateScheduleMutation = gql`
    mutation($id: ID!){
        deleteDateSchedule(id: $id){
            id
        }
    }
`;

const createTimeScheduleMutation = gql`
    mutation(
        $departureTime: String!
        $arrivalTime: String!
        $dateId: String!
    ){
        createTimeSchedule(
            departureTime: $departureTime
            arrivalTime: $arrivalTime
            dateId: $dateId
        ){
            id
        }
    }
`;
const updateTimeScheduleMutation = gql`
    mutation(
        $id: ID!
        $departureTime: String!
        $arrivalTime: String!
        $dateId: String!
    ){
        updateTimeSchedule(
            id: $id
            departureTime: $departureTime
            arrivalTime: $arrivalTime
            dateId: $dateId
        ){
            id
        }
    }
`;
const deleteTimeScheduleMutation = gql`
    mutation($id: ID!){
        deleteTimeSchedule(id: $id){
            id
        }
    }
`;

const createAccommodationMutation = gql`
    mutation(
        $name: String!
        $price: Float!
    ){
        createAccommodation(
            name: $name
            price: $price
        ){
            id
        }
    }
`;
const updateAccommodationMutation = gql`
    mutation(
        $id: ID!
        $name: String!
        $price: Float!
    ){
        updateAccommodation(
            id: $id
            name: $name
            price: $price
        ){
            id
        }
    }
`;
const deleteAccommodationMutation = gql`
    mutation($id: ID!){
        deleteAccommodation(id: $id){
            id
        }
    }
`;

const createSeatMutation = gql`
    mutation(
        $row: Int!
        $column: String!
    ){
        createSeat(
            row: $row
            column: $column
        ){
            id
        }
    }
`;
const updateSeatMutation = gql`
    mutation(
        $id: ID!
        $row: Int!
        $column: String!
    ){
        updateSeat(
            id: $id
            row: $row
            column: $column
        ){
            id
        }
    }
`;
const deleteSeatMutation = gql`
    mutation($id: ID!){
        deleteSeat(id: $id){
            id
        }
    }
`;

const createContactMutation = gql`
    mutation(
        $fullname: String!
        $phone: String!
        $email: String!
        $address: String!
    ){
        createContact(
            fullname: $fullname
            phone: $phone
            email: $email
            address: $address
        ){
            id
        }
    }
`;
const updateContactMutation = gql`
    mutation(
        $id: ID!
        $fullname: String!
        $phone: String!
        $email: String!
        $address: String!
    ){
        updateContact(
            id: $id
            fullname: $fullname
            phone: $phone
            email: $email
            address: $address
        ){
            id
        }
    }
`;
const deleteContactMutation = gql`
    mutation($id: ID!){
        deleteContact(id: $id){
            id
        }
    }
`;

const createPassengerMutation = gql`
    mutation(
        $firstname: String!
        $middleinitial: String!
        $lastname: String!
        $age: Int!
        $gender: String!
        $seatId: String!
        $contactId: String!
        $bookingId: String!
    ){
        createPassenger(
            firstname: $firstname
            middleinitial: $middleinitial
            lastname: $lastname
            age: $age
            gender: $gender
            seatId: $seatId
            contactId: $contactId
            bookingId: $bookingId
        ){
            id
        }
    }
`;
const updatePassengerMutation = gql`
    mutation(
        $id: ID!
        $firstname: String!
        $middleinitial: String!
        $lastname: String!
        $age: Int!
        $gender: String!
        $seatId: String!
        $contactId: String!
        $bookingId: String!
    ){
        updatePassenger(
            id: $id
            firstname: $firstname
            middleinitial: $middleinitial
            lastname: $lastname
            age: $age
            gender: $gender
            seatId: $seatId
            contactId: $contactId
            bookingId: $bookingId
        ){
            id
        }
    }
`;
const deletePassengerMutation = gql`
    mutation($id: ID!){
        deletePassenger(id: $id){
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
    deleteDestinationMutation,
    createAccommodationMutation,
    updateAccommodationMutation,
    deleteAccommodationMutation,
    createSeatMutation,
    updateSeatMutation,
    deleteSeatMutation,
    createContactMutation,
    updateContactMutation,
    deleteContactMutation,
    createPassengerMutation,
    updatePassengerMutation,
    deletePassengerMutation,
    createDateScheduleMutation,
    updateDateScheduleMutation,
    deleteDateScheduleMutation,
    createTimeScheduleMutation,
    updateTimeScheduleMutation,
    deleteTimeScheduleMutation
}