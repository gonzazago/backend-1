export class ServiceService {
    constructor(repository) {
        this.repository = repository;
    }

    handleError(error, statusCode = 500) {
        const message = error instanceof Error ? error.message : String(error);
        const newError = new Error(message);
        newError.statusCode = (error instanceof Error && error.statusCode) ? error.statusCode : statusCode;
        if (error instanceof Error && error.stack) {
            newError.stack = error.stack;
        }
        return newError;
    }

    async getServices() {
        try {
            return await this.repository.getServices();
        } catch (error) {
            console.error('Error getting services:', error);
            if (error.code === 'ENOENT') {
                return [];
            }
            throw this.handleError(error, error.statusCode || 500);
        }
    }

    async getServiceById(id) {
        if (!id || String(id).trim() === '') {
            throw this.handleError('El ID del servicio es requerido', 400);
        }
        try {
            return await this.repository.getServiceById(id);
        } catch (error) {
            throw this.handleError(error, error.statusCode || 500);
        }
    }

    async addService(data) {
        const { name, description, duration, price, category, available = true } = data || {};

        if (!name || !description || duration === undefined || price === undefined || !category) {
            throw this.handleError(
                'Todos los campos son obligatorios (name, description, duration, price, category)',
                400
            );
        }

        try {
            return await this.repository.addService(data);
        } catch (error) {
            throw this.handleError(error, error.statusCode || 500);
        }
    }

    async updateService(id, data) {
        if (!id || String(id).trim() === '') {
            throw this.handleError('El ID del servicio es requerido', 400);
        }
        try {
            return await this.repository.updateService(id, data);
        } catch (error) {
            throw this.handleError(error, error.statusCode || 500);
        }
    }

    async deleteService(id) {
        if (!id || String(id).trim() === '') {
            throw this.handleError('El ID del servicio es requerido', 400);
        }
        try {
            return await this.repository.deleteService(id);
        } catch (error) {
            throw this.handleError(error, error.statusCode || 500);
        }
    }
}
