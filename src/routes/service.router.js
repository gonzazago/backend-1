import { Router } from "express";
import { serviceRepository } from "../repositories/index.js";
import { ServiceManager } from "../managers/ServiceManager.js";

// Inyección de dependencias: ServiceManager recibe el repositorio configurado (FS)
const serviceManager = new ServiceManager(serviceRepository);
const router = Router();

/**
 * GET /api/services
 * Obtiene la lista completa de servicios
 */
router.get('/', async (req, res) => {
    try {
        const services = await serviceManager.getServices();
        return res.status(200).json(services);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Error al obtener servicios - ${err.message}`,
        });
    }
});

/**
 * GET /api/services/:id
 * Obtiene un servicio específico por su ID
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || id.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'El parámetro ID es requerido',
        });
    }

    try {
        const service = await serviceManager.getServiceById(id);
        return res.status(200).json(service);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({
                success: false,
                message: err.message,
            });
        }
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Error al obtener el servicio - ${err.message}`,
        });
    }
});

/**
 * POST /api/services
 * Crea un nuevo servicio
 */
router.post('/', async (req, res) => {
    const { name, description, duration, price, category, available } = req.body || {};

    if (!name || !description || duration === undefined || price === undefined || !category) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son obligatorios: name, description, duration, price, category',
        });
    }

    try {
        const newService = await serviceManager.addService({
            name,
            description,
            duration,
            price,
            category,
            available,
        });

        return res.status(201).json({
            success: true,
            message: 'Servicio creado exitosamente',
            data: newService,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Error al crear el servicio - ${err.message}`,
        });
    }
});

/**
 * PUT /api/services/:id
 * Actualiza un servicio existente por su ID
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id || id.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'El parámetro ID es requerido',
        });
    }

    if (!updatedData || Object.keys(updatedData).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Debe enviar los datos a actualizar en el cuerpo de la petición',
        });
    }

    try {
        const updatedService = await serviceManager.updateService(id, updatedData);
        return res.status(200).json({
            success: true,
            message: `Servicio con ID ${id} actualizado exitosamente`,
            data: updatedService,
        });
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({
                success: false,
                message: err.message,
            });
        }
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Error al actualizar el servicio - ${err.message}`,
        });
    }
});

/**
 * DELETE /api/services/:id
 * Elimina un servicio existente por su ID
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || id.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'El parámetro ID es requerido',
        });
    }

    try {
        const deletedService = await serviceManager.deleteService(id);
        return res.status(200).json({
            success: true,
            message: `Servicio con ID ${id} eliminado exitosamente`,
            data: deletedService,
        });
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({
                success: false,
                message: err.message,
            });
        }
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Error al eliminar el servicio - ${err.message}`,
        });
    }
});

export default router;