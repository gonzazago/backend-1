import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { IServiceRepository } from './ServiceRepository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_PATH = path.resolve(__dirname, '../data/data.json');

/**
 * Implementación concreta del repositorio de servicios para FileSystem.
 * Cumple con el contrato definido en IServiceRepository.
 * Maneja la lectura y persistencia directa en el archivo JSON.
 */
export class ServiceFsRepository extends IServiceRepository {
    constructor(filePath = DEFAULT_PATH) {
        super();
        this.path = filePath;
    }

    /**
     * Obtiene la lista completa de servicios desde el archivo JSON
     */
    async getServices() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.path, JSON.stringify([], null, 2), 'utf-8');
                return [];
            }
            throw new Error(`Error al leer los servicios: ${error.message}`);
        }
    }

    /**
     * Obtiene un servicio por su ID
     * @param {string|number} id
     */
    async getServiceById(id) {
        const services = await this.getServices();
        const service = services.find((s) => String(s.id) === String(id));
        if (!service) {
            throw new Error(`Servicio con ID ${id} no encontrado`);
        }
        return service;
    }

    /**
     * Agrega un nuevo servicio al archivo JSON
     * @param {Object} serviceData
     */
    async addService(serviceData) {
        const services = await this.getServices();

        // Generar ID incremental único
        const maxId = services.reduce((max, s) => {
            const numId = Number(s.id);
            return !isNaN(numId) && numId > max ? numId : max;
        }, 0);
        const newId = String(maxId + 1);

        const newService = {
            id: newId,
            ...serviceData,
        };

        services.push(newService);
        await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
        return newService;
    }

    /**
     * Actualiza un servicio existente por su ID
     * @param {string|number} id
     * @param {Object} updatedData
     */
    async updateService(id, updatedData) {
        const services = await this.getServices();
        const index = services.findIndex((s) => String(s.id) === String(id));
        if (index === -1) {
            throw new Error(`Servicio con ID ${id} no encontrado`);
        }

        services[index] = {
            ...services[index],
            ...updatedData,
            id: services[index].id, // preserva el ID original
        };

        await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
        return services[index];
    }

    /**
     * Elimina un servicio por su ID
     * @param {string|number} id
     */
    async deleteService(id) {
        const services = await this.getServices();
        const index = services.findIndex((s) => String(s.id) === String(id));
        if (index === -1) {
            throw new Error(`Servicio con ID ${id} no encontrado`);
        }

        const [deletedService] = services.splice(index, 1);
        await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
        return deletedService;
    }
}

export default ServiceFsRepository;
