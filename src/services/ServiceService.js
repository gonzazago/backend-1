/**
 * Capa de servicio (Lógica de Negocio).
 * No conoce ni le importa si los datos provienen de FileSystem o MongoDB;
 * solo interactúa con el repositorio inyectado respetando su contrato.
 */
export class ServiceService {
    /**
     * Inyección de dependencias vía constructor.
     * @param {Object} repository Repositorio que cumpla con el contrato IServiceRepository.
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('ServiceService requiere una instancia de repositorio inyectada.');
        }
        this.repository = repository;
    }

    async getAll() {
        return await this.repository.getServices();
    }

    async getById(id) {
        return await this.repository.getServiceById(id);
    }

    async create(serviceData) {
        return await this.repository.addService(serviceData);
    }

    async update(id, updatedData) {
        return await this.repository.updateService(id, updatedData);
    }

    async delete(id) {
        return await this.repository.deleteService(id);
    }
}

export default ServiceService;
