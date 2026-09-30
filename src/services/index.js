import { serviceRepository } from '../repositories/index.js';
import { ServiceService } from './ServiceService.js';

/**
 * Inyección de dependencias:
 * Inyectamos el repositorio (actualmente configurado con FileSystem)
 * en la capa de servicios de negocio.
 */
export const serviceService = new ServiceService(serviceRepository);

export { ServiceService };
export default serviceService;
