import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const categories = ["electro", "cosas del hogar", "indumentaria"]
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_PATH = path.resolve(__dirname, '../data/data.json');

export class ServiceManager {

    constructor(filePath = DEFAULT_PATH) {
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

    // Toda la lista de servicios
    async getServices() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.path, JSON.stringify([], null, 2), 'utf-8');
                return [];
            }
            throw this.handleError(`Error al leer los servicios: ${error.message}`, 500);
        }
    }

    // Un servicio por id
    async getServiceById(id) {
        if (!id || String(id).trim() === '') {
            throw this.handleError('El ID del servicio es requerido', 400);
        }

        const services = await this.getServices();
        const service = services.find((s) => String(s.id) === String(id));
        if (!service) {
            throw this.handleError(`Servicio con ID ${id} no encontrado`, 404);
        }
        return service;
    }

    // Agrega un servicio nuevo
    async addService(serviceData) {
        const { name, description, duration, price, category, available = true } = serviceData || {};

        if (!name || !description || duration === undefined || price === undefined || !category) {
            throw this.handleError(
                'Todos los campos son obligatorios (name, description, duration, price, category)',
                400
            );
        }

        if(Number(price) === NaN){
            throw this.handleError(
                'Price tiene que ser numerico',
                400
            );
        }

        if ( !categories.includes(category)){
            throw this.handleError(
                'Esta categoria no existe',
                400
            );
        }

        try {
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
        } catch (error) {
            if (error.statusCode) throw error;
            throw this.handleError(`Error al agregar el servicio: ${error.message}`, 500);
        }
    }

    // Actualiza un servicio
    async updateService(id, updatedData) {
        if (!id || String(id).trim() === '') {
            throw this.handleError('El ID del servicio es requerido', 400);
        }
        if (!updatedData || Object.keys(updatedData).length === 0) {
            throw this.handleError('Debe enviar los datos a actualizar en el cuerpo de la petición', 400);
        }

        try {
            const services = await this.getServices();
            const index = services.findIndex((s) => String(s.id) === String(id));
            if (index === -1) {
                throw this.handleError(`Servicio con ID ${id} no encontrado`, 404);
            }

            services[index] = {
                ...services[index],
                ...updatedData,
                id: services[index].id, // preserva el id original
            };

            await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
            return services[index];
        } catch (error) {
            if (error.statusCode) throw error;
            throw this.handleError(`Error al actualizar el servicio: ${error.message}`, 500);
        }
    }

    // Borra un servicio
    async deleteService(id) {
        if (!id || String(id).trim() === '') {
            throw this.handleError('El ID del servicio es requerido', 400);
        }

        try {
            const services = await this.getServices();
            const index = services.findIndex((s) => String(s.id) === String(id));
            if (index === -1) {
                throw this.handleError(`Servicio con ID ${id} no encontrado`, 404);
            }

            const [deletedService] = services.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
            return deletedService;
        } catch (error) {
            if (error.statusCode) throw error;
            throw this.handleError(`Error al eliminar el servicio: ${error.message}`, 500);
        }
    }
}

export default ServiceManager;