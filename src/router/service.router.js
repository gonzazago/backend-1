import { Router } from "express";
import { ServiceManager } from "../managers/ServiceManager.js";

const serviceManager = new ServiceManager();
const router = Router();

/**
 * Función auxiliar para enviar respuestas de error consistentes.
 * Utiliza el statusCode provisto por el Error o 500 por defecto.
 * @param {import('express').Response} res Objeto de respuesta de Express.
 * @param {Error} error Objeto de error capturado.
 */
const sendError = (res, error) => {
    const statusCode = error.statusCode || 500;
    console.error(`[Error ${statusCode}]: ${error.message}`);
    return res.status(statusCode).json({
        success: false,
        message: error.message || 'Error interno del servidor',
    });
};

/**
 * GET /api/services
 * Obtiene la lista completa de servicios
 */
router.get('/', async (req, res) => {
    try {
        const services = await serviceManager.getServices();
        return res.status(200).json(services);
    } catch (err) {
        return sendError(res, err);
    }
});

/**
 * GET /api/services/:id
 * Obtiene un servicio específico por su ID
 */
router.get('/:id', async (req, res) => {
    try {
        const service = await serviceManager.getServiceById(req.params.id);
        return res.status(200).json(service);
    } catch (err) {
        return sendError(res, err);
    }
});

/**
 * POST /api/services
 * Crea un nuevo servicio
 */
router.post('/', async (req, res) => {
    try {
        const newService = await serviceManager.addService(req.body);
        return res.status(201).json({
            success: true,
            message: 'Servicio creado exitosamente',
            data: newService,
        });
    } catch (err) {
        return sendError(res, err);
    }
});

/**
 * PUT /api/services/:id
 * Actualiza un servicio existente por su ID
 */
router.put('/:id', async (req, res) => {
    try {
        const updatedService = await serviceManager.updateService(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: `Servicio con ID ${req.params.id} actualizado exitosamente`,
            data: updatedService,
        });
    } catch (err) {
        return sendError(res, err);
    }
});

/**
 * DELETE /api/services/:id
 * Elimina un servicio existente por su ID
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedService = await serviceManager.deleteService(req.params.id);
        return res.status(200).json({
            success: true,
            message: `Servicio con ID ${req.params.id} eliminado exitosamente`,
            data: deletedService,
        });
    } catch (err) {
        return sendError(res, err);
    }
});

export default router;