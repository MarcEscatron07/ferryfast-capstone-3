const { ApolloServer, gql } = require('apollo-server-express');

const { GraphQLScalarType } = require('graphql');

const Role = require('../models/Role');
const Stat = require('../models/Stat');
const Administrator = require('../models/Administrator');

const Origin = require('../models/Origin');
const Destination = require('../models/Destination');
const DateSchedule = require('../models/DateSchedule');
const TimeSchedule = require('../models/TimeSchedule');
const Accommodation = require('../models/Accommodation');
const Seat = require('../models/Seat');
const Contact = require('../models/Contact');
const Passenger = require('../models/Passenger');
const Booking = require('../models/Booking');

const typeDefs = gql`
    scalar Date

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
        bookings: [BookingType]
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
        bookings: [BookingType]
    }
    type DestinationType {
        id: ID
        name: String
        originId: String
        origin: OriginType
        dateSchedules: [DateScheduleType]
        bookings: [BookingType]
    }
    type DateScheduleType {
        id: ID
        date: Date
        destinationId: String
        destination: DestinationType
        timeSchedules: [TimeScheduleType]
        bookings: [BookingType]
    }
    type TimeScheduleType {
        id: ID
        departureTime: Date
        arrivalTime: Date
        dateId: String
        dateSchedule: DateScheduleType
        bookings: [BookingType]
    }
    type AccommodationType {
        id: ID
        name: String
        price: Float
        bookings: [BookingType]
    }
    type SeatType {
        id: ID
        row: Int
        column: String
        passenger: PassengerType
    }
    type ContactType {
        id: ID
        fullname: String
        phone: String
        email: String
        address: String
        passengers: [PassengerType]
    }
    type PassengerType {
        id: ID
        firstname: String
        middleinitial: String
        lastname: String
        age: Int
        gender: String
        seatId: String
        contactId: String
        bookingId: String
        seat: SeatType
        contact: ContactType
        booking: BookingType
    }
    type BookingType {
        id: ID
        bookingNumber: String
        bookingDate: Date
        originId: String
        destinationId: String
        dateId: String
        timeId: String
        accommodationId: String        
        passengerId: String
        statId: String
        passengerQuantity: Int
        totalPayment: Float
        origin: OriginType
        destination: DestinationType
        dateSchedule: DateScheduleType
        timeSchedule: TimeScheduleType
        accommodation: AccommodationType        
        passengers: [PassengerType]
        stat: StatType
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
        getDateSchedules(id: String): [DateScheduleType]
        getDateSchedule(id: String): DateScheduleType
        getTimeSchedules(id: String): [TimeScheduleType]
        getTimeSchedule(id: String): TimeScheduleType
        getAccommodations(id: String): [AccommodationType]
        getAccommodation(id: String): AccommodationType
        getSeats(id: String): [SeatType]
        getSeat(id: String): SeatType
        getContacts(id: String): [ContactType]
        getContact(id: String): ContactType
        getPassengers(id: String): [PassengerType]
        getPassenger(id: String): PassengerType
        getBookings(id: String): [BookingType]
        getBooking(id: String): BookingType
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

        createDateSchedule(
            date: Date
            destinationId: String
        ): DateScheduleType
        updateDateSchedule(
            id: ID
            date: Date
            destinationId: String
        ): DateScheduleType
        deleteDateSchedule(
            id: ID
        ): DateScheduleType

        createTimeSchedule(
            departureTime: Date
            arrivalTime: Date
            dateId: String
        ): TimeScheduleType
        updateTimeSchedule(
            id: ID
            departureTime: Date
            arrivalTime: Date
            dateId: String
        ): TimeScheduleType
        deleteTimeSchedule(
            id: ID
        ): TimeScheduleType

        createAccommodation(
            name: String
            price: Float
        ): AccommodationType
        updateAccommodation(
            id: ID
            name: String
            price: Float
        ): AccommodationType
        deleteAccommodation(
            id: ID
        ): AccommodationType

        createSeat(
            row: Int
            column: String
        ): SeatType
        updateSeat(
            id: ID
            row: Int
            column: String
        ): SeatType
        deleteSeat(
            id: ID
        ): SeatType

        createContact(
            fullname: String
            phone: String
            email: String
            address: String
        ): ContactType
        updateContact(
            id: ID
            fullname: String
            phone: String
            email: String
            address: String
        ): ContactType
        deleteContact(
            id: ID
        ): ContactType

        createPassenger(
            firstname: String
            middleinitial: String
            lastname: String
            age: Int
            gender: String
            seatId: String
            contactId: String
            bookingId: String
        ): PassengerType
        updatePassenger(
            id: ID
            firstname: String
            middleinitial: String
            lastname: String
            age: Int
            gender: String
            seatId: String
            contactId: String
            bookingId: String
        ): PassengerType
        deletePassenger(
            id: ID
        ): PassengerType

        createBooking(
            bookingNumber: String
            bookingDate: Date
            originId: String
            destinationId: String
            dateId: String
            timeId: String
            accommodationId: String            
            passengerId: String
            statId: String
            passengerQuantity: Int
            totalPayment: Float
        ): BookingType
        updateBooking(
            id: ID
            bookingNumber: String
            bookingDate: Date
            originId: String
            destinationId: String
            dateId: String
            timeId: String
            accommodationId: String            
            passengerId: String
            statId: String
            passengerQuantity: Int
            totalPayment: Float
        ): BookingType
        deleteBooking(
            id: ID
        ): BookingType
    }
`;

const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(ast.value) // ast value is always in string format
            }
            return null;
        }
    }),

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
        },
        getDateSchedules: (_,args) => {
            if(!args.id)
                return DateSchedule.find({});
            return DateSchedule.find({_id:args.id});
        },
        getDateSchedule: (_,args) => {
            return DateSchedule.findById(args.id);
        },
        getTimeSchedules: (_,args) => {
            if(!args.id)
                return TimeSchedule.find({});
            return TimeSchedule.find({_id:args.id});
        },
        getTimeSchedule: (_,args) => {
            return TimeSchedule.findById(args.id);
        },
        getAccommodations: (_,args) => {
            if(!args.id)
                return Accommodation.find({});
            return Accommodation.find({_id:args.id});
        },
        getAccommodation: (_,args) => {
            return Accommodation.findById(args.id);
        },
        getSeats: (_,args) => {
            if(!args.id)
                return Seat.find({});
            return Seat.find({_id:args.id})
        },
        getSeat: (_,args) => {
            return Seat.findById(args.id);
        },
        getContacts: (_,args) => {
            if(!args.id)
                return Contact.find({});
            return Contact.find({_id:args.id});
        },
        getContact: (_,args) => {
            return Contact.findById(args.id);
        },
        getPassengers: (_,args) => {
            if(!args.id)
                return Passenger.find({});
            return Passenger.find({_id:args.id});
        },
        getPassenger: (_,args) => {
            return Passenger.findById(args.id);
        },
        getBookings: (_,args) => {
            if(!args.id)
                return Booking.find({});
            return Booking.find({_id:args.id});
        },
        getBooking: (_,args) => {
            return Booking.findById(args.id);
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
        },
        bookings: (parent,_) => {
            return Booking.find({statId:parent.uniqueId});
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
        },
        bookings: (parent,_) => {
            return Booking.find({originId:parent.id});
        }
    },
    DestinationType: {
        origin: (parent,_) => {
            return Origin.findOne({_id:parent.originId});
        },
        dateSchedules: (parent,_) => {
            return DateSchedule.find({destinationId:parent.id});
        },
        bookings: (parent,_) => {
            return Booking.find({destinationId:parent.id});
        }
    },
    DateScheduleType: {
        destination: (parent,_) => {
            return Destination.findOne({_id:parent.destinationId});
        },
        timeSchedules: (parent,_) => {
            return TimeSchedule.find({dateId:parent.id});
        },
        bookings: (parent,_) => {
            return Booking.find({dateId:parent.id});
        }
    },
    TimeScheduleType: {
        dateSchedule: (parent,_) => {
            return DateSchedule.findOne({_id:parent.dateId});
        },
        bookings: (parent,_) => {
            return Booking.find({timeId:parent.id});
        }
    },
    AccommodationType: {
        bookings: (parent,_) => {
            return Booking.find({accommodationId:parent.id});
        }
    },
    SeatType: {
        passenger: (parent,_) => {
            return Passenger.findOne({seatId:parent.id});
        }
    },
    ContactType: {
        passengers: (parent,_) => {
            return Passenger.find({contactId:parent.id});
        }
    },
    PassengerType: {
        seat: (parent,_) => {
            return Seat.findOne({_id:parent.seatId});
        },
        contact: (parent,_) => {
            return Contact.findOne({_id:parent.contactId});
        },
        booking: (parent,_) => {
            return Booking.findOne({_id:parent.bookingId});
        }
    },
    BookingType: {
        origin: (parent,_) => {
            return Origin.findOne({_id:parent.originId});
        },
        destination: (parent,_) => {
            return Destination.findOne({_id:parent.destinationId});
        },
        dateSchedule: (parent,_) => {
            return DateSchedule.findOne({_id:parent.dateId});
        },
        timeSchedule: (parent,_) => {
            return TimeSchedule.findOne({_id:parent.timeId});
        },
        accommodation: (parent,_) => {
            return Accommodation.findOne({_id:parent.accommodationId});
        },
        passengers: (parent,_) => {
            return Passenger.find({bookingId:parent.id});
        },
        stat: (parent,_) => {
            return Stat.findOne({_id:parent.statId});
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
        },

        createDateSchedule: (_,args) => {
            let newDateSchedule = DateSchedule({
                date: args.date,
                destinationId: args.destinationId
            })
            return newDateSchedule.save();
        },
        updateDateSchedule: (_,args) => {
            let updateDateScheduleId = {_id:args.id}
            let updateDateScheduleData = {
                date: args.date,
                destinationId: args.destinationId
            }
            return DateSchedule.findOneAndUpdate(updateDateScheduleId, updateDateScheduleData);
        },
        deleteDateSchedule: (_,args) => {
            return DateSchedule.findOneAndDelete({_id:args.id});
        },

        createTimeSchedule: (_,args) => {
            let newTimeSchedule = TimeSchedule({
                departureTime: args.departureTime,
                arrivalTime: args.arrivalTime,
                dateId: args.dateId
            })
            return newTimeSchedule.save();
        },
        updateTimeSchedule: (_,args) => {
            let updateTimeScheduleId = {_id:args.id}
            let updateTimeScheduleData = {
                departureTime: args.departureTime,
                arrivalTime: args.arrivalTime,
                dateId: args.dateId
            }
            return TimeSchedule.findOneAndUpdate(updateTimeScheduleId, updateTimeScheduleData);
        },
        deleteTimeSchedule: (_,args) => {
            return TimeSchedule.findOneAndDelete({_id:args.id});
        },
        
        createAccommodation: (_,args) => {
            let newAccommodation = Accommodation({
                name: args.name,
                price: args.price
            })
            return newAccommodation.save();
        },
        updateAccommodation: (_,args) => {
            let updateAccommodationId = {_id:args.id}
            let updateAccommodationData = {
                name: args.name,
                price: args.price
            }
            return Accommodation.findOneAndUpdate(updateAccommodationId, updateAccommodationData);
        },
        deleteAccommodation: (_,args) => {
            return Accommodation.findOneAndDelete({_id:args.id});
        },

        createSeat: (_,args) => {
            let newSeat = Seat({
                row: args.row,
                column: args.column
            })
            return newSeat.save();
        },
        updateSeat: (_,args) => {
            let updateSeatId = {_id:args.id}
            let updateSeatData = {
                row: args.row,
                column: args.column
            }
            return Seat.findOneAndUpdate(updateSeatId, updateSeatData);
        },
        deleteSeat: (_,args) => {
            return Seat.findOneAndDelete({_id:args.id});
        },

        createContact: (_,args) => {
            let newContact = Contact({
                fullname: args.fullname,
                phone: args.phone,
                email: args.email,
                address: args.address
            })
            return newContact.save();
        },
        updateContact: (_,args) => {
            let updateContactId = {_id:args.id}
            let updateContactData = {
                fullname: args.fullname,
                phone: args.phone,
                email: args.email,
                address: args.address
            }
            return Contact.findOneAndUpdate(updateContactId, updateContactData);
        },
        deleteContact: (_,args) => {
            return Contact.findOneAndDelete({_id:args.id});
        },

        createPassenger: (_,args) => {
            let newPassenger = Passenger({
                firstname: args.firstname,
                middleinitial: args.middleinitial,
                lastname: args.lastname,
                age: args.age,
                gender: args.gender,
                seatId: args.seatId,
                contactId: args.contactId,
                bookingId: args.bookingId
            })
            return newPassenger.save();
        },
        updatePassenger: (_,args) => {
            let updatePassengerId = {_id:args.id}
            let updatePassengerData = {
                firstname: args.firstname,
                middleinitial: args.middleinitial,
                lastname: args.lastname,
                age: args.age,
                gender: args.gender,
                seatId: args.seatId,
                contactId: args.contactId,
                bookingId: args.bookingId
            }
            return Passenger.findOneAndUpdate(updatePassengerId, updatePassengerData);
        },
        deletePassenger: (_,args) => {
            return Passenger.findOneAndDelete({_id:args.id});
        },

        createBooking: (_,args) => {
            let newBooking = Booking({
                bookingNumber: args.bookingNumber,
                bookingDate: args.bookingDate,
                originId: args.originId,
                destinationId: args.destinationId,
                dateId: args.dateId,
                timeId: args.timeId,
                accommodationId: args.accommodationId,                
                passengerId: args.passengerId,
                statId: args.statId,
                passengerQuantity: args.passengerQuantity,
                totalPayment: args.totalPayment
            })
            return newBooking.save();
        },
        updateBooking: (_,args) => {
            let updateBookingId = {_id:args.id}
            let updateBookingData = {
                bookingNumber: args.bookingNumber,
                bookingDate: args.bookingDate,
                originId: args.originId,
                destinationId: args.destinationId,
                dateId: args.dateId,
                timeId: args.timeId,
                accommodationId: args.accommodationId,                
                passengerId: args.passengerId,
                statId: args.statId,
                passengerQuantity: args.passengerQuantity,
                totalPayment: args.totalPayment
            }
            return Booking.findOneAndUpdate(updateBookingId, updateBookingData);
        },
        deleteBooking: (_,args) => {
            return Booking.findOneAndDelete({_id:args.id});
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});
module.exports = server;