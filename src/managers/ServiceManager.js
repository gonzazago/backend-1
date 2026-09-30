/**
 * ServiceManager
 * Capa de gestión / negocio para servicios.
 * Recibe un serviceRepository por Inyección de Dependencias (DI),
 * desacoplándose por completo de la tecnología de persistencia (FS o MongoDB).
 */
export class ServiceManager {
    /**
     * @param {import('../repositories/ServiceRepository.js').IServiceRepository} serviceRepository
     */
    constructor(serviceRepository) {
        if (!serviceRepository) {
            throw new Error('ServiceManager requiere una instancia de serviceRepository inyectada.');
        }
        this.serviceRepository = serviceRepository;
    }

    /**
     * Obtiene la lista completa de servicios
     */
    async getServices() {
        return await this.serviceRepository.getServices();
    }

    /**
     * Obtiene un servicio por su ID
     * @param {string|number} id
     */
    async getServiceById(id) {
        return await this.serviceRepository.getServiceById(id);
    }

    /**
     * Agrega un nuevo servicio validando los campos obligatorios
     * @param {Object} serviceData
     */
    async addService(serviceData) {
        const { name, description, duration, price, category, available = true } = serviceData;

        if (!name || !description || duration === undefined || price === undefined || !category) {
            throw new Error('Todos los campos son obligatorios (name, description, duration, price, category)');
        }

        const formattedService = {
            name: String(name).trim(),
            description: String(description).trim(),
            duration: Number(duration),
            price: Number(price),
            category: String(category).trim(),
            available: Boolean(available),
        };

        return await this.serviceRepository.addService(formattedService);
    }

    /**
     * Actualiza un servicio existente
     * @param {string|number} id
     * @param {Object} updatedData
     */
    async updateService(id, updatedData) {
        return await this.serviceRepository.updateService(id, updatedData);
    }

    /**
     * Elimina un servicio por su ID
     * @param {string|number} id
     */
    async deleteService(id) {
        return await this.serviceRepository.deleteService(id);
    }
}

export default ServiceManager;