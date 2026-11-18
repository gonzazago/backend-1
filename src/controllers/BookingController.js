import sendError from "../utils/sendError.js";

export class BookingController {
    constructor(service) {
        this.service = service
    }

    async createBooking(req, res) {
        try {
            const booking = await this.service.createBooking(req.body);
            return res.status(201).json({
                success: true,
                message: 'Reserva creada exitosamente',
                data: booking,
            });
        } catch (err) {
            return sendError(res, err);
        }
    }

    async getBooking(req, res) {
        try {
            const booking = await this.service.getBooking(req.params.id);
            return res.status(200).json(booking);
        } catch (err) {
            return sendError(res, err);
        }
    }

    async getAvailableByDate(req, res) {
        try {
            const date = req.params.date;
            const availableBookings = await this.service.getAvailableByDate(date);
            return res.status(200).json(availableBookings);
        } catch (err) {
            return sendError(res, err);
        }
    }
}

export default BookingController
