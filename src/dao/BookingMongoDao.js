import BookingModel from "./models/booking.model.js";


export class BookingMongoDao {
    constructor() {
    }

    async getBookings() {
        await BookingModel.find().lean()
    }

    async getBooking(id) {
        await BookingModel.findById(id).populate('service.service').lean()
    }
}