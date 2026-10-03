import { Router } from 'express';
import ServiceManager from '../managers/ServiceManager.js';

const router = Router();
const serviceManager = new ServiceManager();

const sendError = (res, error) => {
    res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
};

router.get('/', async (req, res) => {
    try {
        const { category, available } = req.query;
        const services = await serviceManager.getServices({ category, available });
        res.status(200).json({ status: 'success', payload: services });
    } catch (error) {
        sendError(res, error);
    }
});

router.get('/:sid', async (req, res) => {
    try {
        const { sid } = req.params;
        const service = await serviceManager.getServiceById(sid);
        res.status(200).json({ status: 'success', payload: service });
    } catch (error) {
        sendError(res, error);
    }
});

router.post('/', async (req, res) => {
    try {
        const newService = await serviceManager.addService(req.body);
        res.status(201).json({ status: 'success', payload: newService });
    } catch (error) {
        sendError(res, error);
    }
});

router.put('/:sid', async (req, res) => {
    try {
        const { sid } = req.params;
        const updatedService = await serviceManager.updateService(sid, req.body);
        res.status(200).json({ status: 'success', payload: updatedService });
    } catch (error) {
        sendError(res, error);
    }
});

router.delete('/:sid', async (req, res) => {
    try {
        const { sid } = req.params;
        const deletedService = await serviceManager.deleteService(sid);
        res.status(200).json({ status: 'success', payload: deletedService });
    } catch (error) {
        sendError(res, error);
    }
});

export default router;
