export class ServiceService {
    constructor(repository) {
        this.repository = repository;
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


    async getServiceById(id) {
    }

    async getServices() {
        try {
            return this.repository.getServices();
        } catch (error) {
            console.error('Error getting service');
            if (error.code === 'ENOENT') {
                return [];
            }
            throw this.handleError(`Error al leer los servicios: ${error.message}`, 500);
        }
    }

    async addService(data) {
        const {name, description, duration, price, category, available = true} = data || {};

        if (!name || !description || duration === undefined || price === undefined || !category) {
            throw this.handleError(
                'Todos los campos son obligatorios (name, description, duration, price, category)',
                400
            );
        }

        try {
            return await this.repository.addService(data)

        } catch (error) {
            throw this.handleError(`Error adding service: ${error.message}`, 500);
        }
    }

    async updateService(data) {
    }

    async deleteService(id) {

    }


}