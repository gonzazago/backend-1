export class BookingService {
    constructor(repository, serviceRepository) {
        this.repository = repository;
        this.serviceRepository = serviceRepository;
    }

    handleError(error, statusCode = 500) {
        const message = error instanceof Error ? error.message : String(error);
        const newError = new Error(message);
        newError.statusCode = (error instanceof Error && error.statusCode) ? error.statusCode : statusCode;
        return newError;
    }

    /**
        *Como evitar un overbooking (evitar 2 reservas para el mismo servicio en la misma fecha y hora)
        * Validacion a la altura de creacion de reserva en el service
        * validaciones a nivel de base de datos (unique index) para evitar que se creen reservas duplicadas
     */
    async createBooking(data) {
        const name = data?.name;
        const date = data?.date;
        const time = data?.time;
        const serviceId = data?.service?.service;

        if (!name || !date || !time || !serviceId) {
            throw this.handleError('Faltan datos de la reserva (name, date, time, service.service)', 400);
        }

        const service = await this.serviceRepository.getServiceById(serviceId);
        if (!service) {
            throw this.handleError('El servicio de la reserva no existe', 404);
        }
        if (service.available === false) {
            throw this.handleError('El servicio no está disponible', 409);
        }

        const conflict = await this.repository.findConflict(date, time, serviceId);

        if (conflict && conflict.active === true) {
            throw this.handleError('Ya existe una reserva para este servicio en la misma fecha y hora', 409);
        }

        if (service.capacity < data?.quantity) {
            throw this.handleError('La cantidad de reservas excede la capacidad del servicio', 409);
        }

        try {
            return await this.repository.createBooking(data);
        } catch (error) {
            throw this.handleError(error, error.statusCode || 500);
        }
    }

    async getBooking(id) {
        if (!id || String(id).trim() === '') {
            throw this.handleError('El ID de la reserva es requerido', 400);
        }
        try {
            return await this.repository.getBooking(id);
        } catch (error) {
            throw this.handleError(error, error.statusCode || 500);
        }
    }

    async getAvailableByDate(date) {
        if (!date) {
            throw this.handleError('La fecha es requerida', 400);
        }
        try {
            return await this.repository.availableByDate(new Date(date));
        } catch (error) {
            throw this.handleError(error, error.statusCode || 500);
        }
    }
}