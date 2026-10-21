export class ServiceRepository {
    handleError(message, statusCode = 500) {
        const error = new Error(message);
        error.statusCode = statusCode;
        return error;
    }

    async getServices() {
        throw new Error('Not implemented.');
    }

    async getServiceById(id) {
        throw new Error('Not implemented.');
    }

    async deleteService(id) {
        throw new Error('Not implemented.');
    }

    async updateService(id, service) {
        throw new Error('Not implemented.');
    }

    async addService(data) {
        throw new Error('Not implemented.');
    }
}
