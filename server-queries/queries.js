const { ApolloServer, gql } = require('apollo-server-express');

const { GraphQLScalarType } = require('graphql');

const Role = require('../models/Role');
const Stat = require('../models/Stat');
const Administrator = require('../models/Administrator');

const Origin = require('../models/Origin');
const Destination = require('../models/Destination');
const DepartureDate = require('../models/DepartureDate');
const ArrivalDate = require('../models/ArrivalDate');
const Accommodation = require('../models/Accommodation');
const Seat = require('../models/Seat');
const ContactDetail = require('../models/ContactDetail');
const PassengerDetail = require('../models/PassengerDetail');
const Booking = require('../models/Booking');

const typeDefs = gql`
    scalar DateTime

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
    }
    type DestinationType {
        id: ID
        name: String
        originId: String
        origin: OriginType
        departureDates: [DepartureDateType]
    }
    type DepartureDateType {
        id: ID
        departDateTime: DateTime
        destinationId: String
        destination: DestinationType
        arrivalDate: ArrivalDateType
    }
    type ArrivalDateType {
        id: ID
        arriveDateTime: DateTime
        departureDateId: String
        departureDate: DepartureDateType
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
        passengerDetail: PassengerDetailType
    }
    type ContactDetailType {
        id: ID
        fullname: String
        phone: String
        email: String
        address: String
        passengerDetails: [PassengerDetailType]
    }
    type PassengerDetailType {
        id: ID
        firstname: String
        middleinitial: String
        lastname: String
        age: Int
        gender: String
        seatId: String
        ContactDetailId: String
        bookingId: String
        seat: SeatType
        contactDetail: ContactDetailType
        booking: BookingType
    }
    type BookingType {
        id: ID
        bookingNumber: String
        date: DateTime
        accommodationId: String
        arrivalDateId: String
        passengerDetailId: String
        statId: String
        passengerQuantity: Int
        totalPayment: Float
        accommodation: AccommodationType
        arrivalDate: ArrivalDateType
        passengerDetails: [PassengerDetailType]
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
        getDepartureDates(id: String): [DepartureDateType]
        getDepartureDate(id: String): DepartureDateType
        getArrivalDates(id: String): [ArrivalDateType]
        getArrivalDate(id: String): ArrivalDateType
        getAccommodations(id: String): [AccommodationType]
        getAccommodation(id: String): AccommodationType
        getSeats(id: String): [SeatType]
        getSeat(id: String): SeatType
        getContactDetails(id: String): [ContactDetailType]
        getContactDetail(id: String): ContactDetailType
        getPassengerDetails(id: String): [PassengerDetailType]
        getPassengerDetail(id: String): PassengerDetailType
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

        createDepartureDate(
            departDateTime: DateTime
            destinationId: String
        ): DepartureDateType
        updateDepartureDate(
            id: ID
            departDateTime: DateTime
            destinationId: String
        ): DepartureDateType
        deleteDepartureDate(
            id: ID
        ): DepartureDateType

        createArrivalDate(
            arriveDateTime: DateTime
            departureDateId: String
        ): ArrivalDateType
        updateArrivalDate(
            id: ID
            arriveDateTime: DateTime
            departureDateId: String
        ): ArrivalDateType
        deleteArrivalDate(
            id: ID
        ): ArrivalDateType

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

        createContactDetail(
            fullname: String
            phone: String
            email: String
            address: String
        ): ContactDetailType
        updateContactDetail(
            id: ID
            fullname: String
            phone: String
            email: String
            address: String
        ): ContactDetailType
        deleteContactDetail(
            id: ID
        ): ContactDetailType

        createPassengerDetail(
            firstname: String
            middleinitial: String
            lastname: String
            age: Int
            gender: String
            seatId: String
            ContactDetailId: String
            bookingId: String
        ): PassengerDetailType
        updatePassengerDetail(
            id: ID
            firstname: String
            middleinitial: String
            lastname: String
            age: Int
            gender: String
            seatId: String
            ContactDetailId: String
            bookingId: String
        ): PassengerDetailType
        deletePassengerDetail(
            id: ID
        ): PassengerDetailType

        createBooking(
            bookingNumber: String
            date: DateTime
            accommodationId: String
            arrivalDateId: String
            passengerDetailId: String
            statId: String
            passengerQuantity: Int
            totalPayment: Float
        ): BookingType
        updateBooking(
            id: ID
            bookingNumber: String
            date: DateTime
            accommodationId: String
            arrivalDateId: String
            passengerDetailId: String
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
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A date and time, represented as an ISO-8601 string',
        serialize(value) {
          return value.toISOString();
        },
        parseValue(value) {
          return new Date(value);
        },        
        parseLiteral(ast) {
          return new Date(ast.value);
        },
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
        getDepartureDates: (_,args) => {
            if(!args.id)
                return DepartureDate.find({});
            return DepartureDate.find({_id:args.id});
        },
        getDepartureDate: (_,args) => {
            return DepartureDate.findById(args.id);
        },
        getArrivalDates: (_,args) => {
            if(!args.id)
                return ArrivalDate.find({});
            return ArrivalDate.find({_id:args.id});
        },
        getArrivalDate: (_,args) => {
            return ArrivalDate.findById(args.id);
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
        getContactDetails: (_,args) => {
            if(!args.id)
                return ContactDetail.find({});
            return ContactDetail.find({_id:args.id});
        },
        getContactDetail: (_,args) => {
            return ContactDetail.findById(args.id);
        },
        getPassengerDetails: (_,args) => {
            if(!args.id)
                return PassengerDetail.find({});
            return PassengerDetail.find({_id:args.id});
        },
        getPassengerDetail: (_,args) => {
            return PassengerDetail.findById(args.id);
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
        }
    },
    DestinationType: {
        origin: (parent,_) => {
            return Origin.findOne({_id:parent.originId});
        },
        departureDates: (parent,_) => {
            return DepartureDate.find({destinationId:parent.id});
        }
    },
    DepartureDateType: {
        destination: (parent,_) => {
            return Destination.findOne({_id:parent.destinationId});
        },
        arrivalDate: (parent,_) => {
            return ArrivalDate.findOne({departureDateId:parent.id});
        }
    },
    ArrivalDateType: {
        departureDate: (parent,_) => {
            return DepartureDate.findOne({_id:parent.departureDateId});
        },
        bookings: (parent,_) => {
            return Booking.find({arrivalDateId:parent.id});
        }
    },
    AccommodationType: {
        bookings: (parent,_) => {
            return Booking.find({accommodationId:parent.id});
        }
    },
    SeatType: {
        passengerDetail: (parent,_) => {
            return PassengerDetail.findOne({seatId:parent.id});
        }
    },
    ContactDetailType: {
        passengerDetails: (parent,_) => {
            return PassengerDetail.find({contactDetailId:parent.id});
        }
    },
    PassengerDetailType: {
        seat: (parent,_) => {
            return Seat.findOne({_id:parent.seatId});
        },
        contactDetail: (parent,_) => {
            return ContactDetail.findOne({_id:parent.contactDetailId});
        },
        booking: (parent,_) => {
            return Booking.findOne({_id:parent.bookingId});
        }
    },
    BookingType: {
        arrivalDate: (parent,_) => {
            return ArrivalDateType.findOne({_id:parent.arrivalDateId});
        },
        accommodation: (parent,_) => {
            return Accommodation.findOne({_id:parent.accommodationId});
        },
        passengerDetails: (parent,_) => {
            return PassengerDetail.find({bookingId:parent.id});
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

        createDepartureDate: (_,args) => {
            let newDepartureDate = DepartureDate({
                departDateTime: args.departDateTime,
                destinationId: args.destinationId
            })
            return newDepartureDate.save();
        },
        updateDepartureDate: (_,args) => {
            let updateDepartureDateId = {_id:args.id}
            let updateDepartureDateData = {
                departDateTime: args.departDateTime,
                destinationId: args.destinationId
            }
            return DepartureDate.findOneAndUpdate(updateDepartureDateId, updateDepartureDateData);
        },
        deleteDepartureDate: (_,args) => {
            return DepartureDate.findOneAndDelete({_id:args.id});
        },

        createArrivalDate: (_,args) => {
            let newArrivalDate = ArrivalDate({
                arriveDateTime: args.arriveDateTime,
                departureDateId: args.departureDateId
            })
            return newArrivalDate.save();
        },
        updateArrivalDate: (_,args) => {
            let updateArrivalDateId = {_id:args.id}
            let updateArrivalDateData = {
                arriveDateTime: args.arriveDateTime,
                departureDateId: args.departureDateId
            }
            return ArrivalDate.findOneAndUpdate(updateArrivalDateId, updateArrivalDateData);
        },
        deleteArrivalDate: (_,args) => {
            return ArrivalDate.findOneAndDelete({_id:args.id});
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

        createContactDetail: (_,args) => {
            let newContactDetail = ContactDetail({
                fullname: args.fullname,
                phone: args.phone,
                email: args.email,
                address: args.address
            })
            return newContactDetail.save();
        },
        updateContactDetail: (_,args) => {
            let updateContactDetailId = {_id:args.id}
            let updateContactDetailData = {
                fullname: args.fullname,
                phone: args.phone,
                email: args.email,
                address: args.address
            }
            return ContactDetail.findOneAndUpdate(updateContactDetailId, updateContactDetailData);
        },
        deleteContactDetail: (_,args) => {
            return ContactDetail.findOneAndDelete({_id:args.id});
        },

        createPassengerDetail: (_,args) => {
            let newPassengerDetail = PassengerDetail({
                firstname: args.firstname,
                middleinitial: args.middleinitial,
                lastname: args.lastname,
                age: args.age,
                gender: args.gender,
                seatId: args.seatId,
                contactDetailId: args.contactDetailId,
                bookingId: args.bookingId
            })
            return newPassengerDetail.save();
        },
        updatePassengerDetail: (_,args) => {
            let updatePassengerDetailId = {_id:args.id}
            let updatePassengerDetailData = {
                firstname: args.firstname,
                middleinitial: args.middleinitial,
                lastname: args.lastname,
                age: args.age,
                gender: args.gender,
                seatId: args.seatId,
                contactDetailId: args.contactDetailId,
                bookingId: args.bookingId
            }
            return PassengerDetail.findOneAndUpdate(updatePassengerDetailId, updatePassengerDetailData);
        },
        deletePassengerDetail: (_,args) => {
            return PassengerDetail.findOneAndDelete({_id:args.id});
        },

        createBooking: (_,args) => {
            let newBooking = Booking({
                bookingNumber: args.bookingNumber,
                date: args.date,
                accommodationId: args.accommodationId,
                arrivalDateId: args.arrivalDateId,
                passengerDetailId: args.passengerDetailId,
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
                date: args.date,
                accommodationId: args.accommodationId,
                arrivalDateId: args.arrivalDateId,
                passengerDetailId: args.passengerDetailId,
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