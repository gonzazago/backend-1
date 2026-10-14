import { Router } from "express";
import ServiceController from "../controllers/service.controller.js";
const serviceController = new ServiceController()
const router = Router();

/**
 * GET /api/services
 * Obtiene la lista completa de servicios
 */
router.get('/', serviceController.getServices);

/**
 * GET /api/services/:id
 * Obtiene un servicio específico por su ID
 */
router.get('/:id', serviceController.getServiceById);

/**
 * POST /api/services
 * Crea un nuevo servicio
 */
router.post('/', serviceController.addService);

/**
 * PUT /api/services/:id
 * Actualiza un servicio existente por su ID
 */
router.put('/:id', serviceController.updateService);

/**
 * DELETE /api/services/:id
 * Elimina un servicio existente por su ID
 */
router.delete('/:id', serviceController.deleteService);

export default router;