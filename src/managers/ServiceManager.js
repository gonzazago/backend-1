import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_PATH = path.resolve(__dirname, '../data/data.json');

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

export class ServiceManager {
    constructor(filePath = DEFAULT_PATH) {
        this.path = filePath;
    }

    // Toda la lista de servicios, con filtros opcionales
    async getServices({ category, available } = {}) {
        let services;
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            services = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.path, JSON.stringify([], null, 2), 'utf-8');
                return [];
            }
            throw new Error(`Error al leer los servicios: ${error.message}`);
        }

        if (category) {
            services = services.filter(
                (s) => s.category.toLowerCase() === category.toLowerCase()
            );
        }

        if (available !== undefined) {
            if (available !== 'true' && available !== 'false') {
                throw createError('El filtro available debe ser true o false', 400);
            }
            services = services.filter((s) => s.available === (available === 'true'));
        }

        return services;
    }

    // Un servicio por id
    async getServiceById(id) {
        const services = await this.getServices();
        const service = services.find((s) => String(s.id) === String(id));
        if (!service) {
            throw createError(`Servicio con ID ${id} no encontrado`, 404);
        }
        return service;
    }

    // Agrega un servicio nuevo
    async addService(serviceData = {}) {
        const { name, description, duration, price, category, available = true } = serviceData;

        if (!name || !description || duration === undefined || price === undefined || !category) {
            throw createError('Todos los campos son obligatorios (name, description, duration, price, category)', 400);
        }

        const services = await this.getServices();

        // Generar ID incremental único
        const maxId = services.reduce((max, s) => {
            const numId = Number(s.id);
            return !isNaN(numId) && numId > max ? numId : max;
        }, 0);
        const newId = String(maxId + 1);

        const newService = {
            id: newId,
            name: String(name).trim(),
            description: String(description).trim(),
            duration: Number(duration),
            price: Number(price),
            category: String(category).trim(),
            available: Boolean(available),
        };

        services.push(newService);
        await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
        return newService;
    }

    // Actualiza un servicio
    async updateService(id, updatedData = {}) {
        const services = await this.getServices();
        const index = services.findIndex((s) => String(s.id) === String(id));
        if (index === -1) {
            throw createError(`Servicio con ID ${id} no encontrado`, 404);
        }

        services[index] = {
            ...services[index],
            ...updatedData,
            id: services[index].id, // preserva el id original
        };

        await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
        return services[index];
    }

    // Borra un servicio
    async deleteService(id) {
        const services = await this.getServices();
        const index = services.findIndex((s) => String(s.id) === String(id));
        if (index === -1) {
            throw createError(`Servicio con ID ${id} no encontrado`, 404);
        }

        const [deletedService] = services.splice(index, 1);
        await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
        return deletedService;
    }
}

export default ServiceManager;
