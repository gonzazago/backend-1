import fs from "fs/promises"; // DE ESTE IMPORT TRABAJAMOS DIRECTAMENTE CON METODOS ASYNC
import fsSync from "fs";

export default class BookingManager {
    constructor(filePath) {
        this.path = filePath;
    }

    handleError(error, statusCode = 500) {
        const message = error instanceof Error ? error.message : String(error);
        const newError = new Error(message);
        newError.statusCode = statusCode;
        if (error instanceof Error && error.stack) {
            newError.stack = error.stack;
        }
        return newError;
    }

    async getBookings() {
        try {
            console.log(this.path)
            // EJEMPLO COMO NO DEBERIA REALIZARSE  ESTA FORMA SE BLOQUEA EL EVENT LOOP
            // const data = fsSync.readFileSync(this.path);
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // EJEMPLO COMO NO DEBERIA REALIZARSE  ESTA FORMA SE BLOQUEA EL EVENT LOOP
                // fsSync.writeFileSync(this.path, JSON.stringify(error));
                await fs.writeFiyle(this.path, JSON.stringify([], null, 2), 'utf-8');
                return [];
            }
            throw this.handleError(`Error al leer los booking: ${error.message}`, 500);
        }
    }

    async saveBooking(booking) {
        const {name, service, schedule_at} = booking;

        if (!name || !service || !schedule_at) {
            throw this.handleError(`Todos los campos son requeridos`, 400)
        }

        try {
            const bookings = await this.getBookings();
            bookings.push(booking);
            await fs.writeFile(this.path, JSON.stringify(bookings, null, 2), 'utf-8');
        } catch (error) {
            throw this.handleError(`Error al leer los booking: ${error.message}`, 500);
        }
    }
}