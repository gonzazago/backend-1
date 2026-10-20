import path from "path";
import {fileURLToPath} from "url";
import {readFile} from "../utils/FileSystemUtils.js";
import {ServiceRepository} from "../repository/ServiceRepository.js";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_PATH = path.resolve(__dirname, '../data/data.json');

export class ServiceFsDAO extends ServiceRepository {
    constructor() {
        super();
        this.path = DEFAULT_PATH;
    }

    async getServices() {
        try {
            return await readFile(this.path, "utf8");
        } catch (error) {
            throw error;
        }
    }

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

    async addService(data) {
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
                name: String(data.name).trim(),
                description: String(data.description).trim(),
                duration: Number(data.duration),
                price: Number(data.price),
                category: String(data.category).trim(),
                available: Boolean(data.available),
            };

            services.push(newService);
            await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
            return newService;
        } catch (error) {
            console.error('Error agregando nuevo servicio', error);
            throw error;
        }
    }

    async updateService(id, updateService) {
        try {
            const services = await this.getServices();
            const index = services.findIndex((s) => String(s.id) === String(id));
            if (index === -1) {
                throw new Error(`Servicio con ID ${id} no encontrado`)
            }

            services[index] = {
                ...services[index],
                ...updateService,
                id: services[index].id, // preserva el id original
            };

            await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
            return services[index];
        } catch (error) {
            console.error('Error agregando nuevo servicio', error);
            throw error;
        }
    }

    async deleteService(id) {
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
            throw error;
        }
    }
}