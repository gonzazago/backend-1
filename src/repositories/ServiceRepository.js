/**
 * @interface IServiceRepository
 * Interfaz / Contrato base para el repositorio de servicios.
 * En JavaScript (Node.js), las interfaces se implementan mediante clases base abstractas
 * y anotaciones JSDoc para garantizar el contrato y el autocompletado en el editor.
 */
export class IServiceRepository {
    /**
     * Obtener todos los servicios
     * @returns {Promise<Array>}
     */
    async getServices() {
        throw new Error("Method 'getServices()' must be implemented");
    }

    /**
     * Obtener un servicio por su ID
     * @param {string|number} id
     * @returns {Promise<Object>}
     */
    async getServiceById(id) {
        throw new Error("Method 'getServiceById(id)' must be implemented");
    }

    /**
     * Crear un nuevo servicio
     * @param {Object} serviceData
     * @returns {Promise<Object>}
     */
    async addService(serviceData) {
        throw new Error("Method 'addService(serviceData)' must be implemented");
    }

    /**
     * Actualizar un servicio existente por su ID
     * @param {string|number} id
     * @param {Object} updatedData
     * @returns {Promise<Object>}
     */
    async updateService(id, updatedData) {
        throw new Error("Method 'updateService(id, updatedData)' must be implemented");
    }

    /**
     * Eliminar un servicio por su ID
     * @param {string|number} id
     * @returns {Promise<Object>}
     */
    async deleteService(id) {
        throw new Error("Method 'deleteService(id)' must be implemented");
    }
}

export default IServiceRepository;