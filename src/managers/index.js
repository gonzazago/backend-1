import { serviceRepository } from '../repositories/index.js';
import { ServiceManager } from './ServiceManager.js';

/**
 * Inyección de Dependencias:
 * Se inyecta la instancia del repositorio (FS) en el ServiceManager.
 */
export const serviceManager = new ServiceManager(serviceRepository);

export { ServiceManager };
export default serviceManager;
