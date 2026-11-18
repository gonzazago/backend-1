export class BookingRepository {
    handleError(message, statusCode = 500) {
        const error = new Error(message);
        error.statusCode = statusCode;
        return error;
    }

    async getBookings() {
        throw new Error('Not implemented.');
    }

    async getBooking() {
        throw new Error('Not implemented.');
    }

    async createBooking() {
        throw new Error('Not implemented.');
    }

    async findConflict(date, time, serviceId) {
        throw new Error('Not implemented.');
    }

    async availableByDate(date){
        throw new Error('Not implemented.');
    }
}
