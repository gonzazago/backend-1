import {ServiceMongoDAO} from "../dao/ServiceMongoDAO.js";
import express from "express";

const serviceRepository = new ServiceMongoDAO();

const router = express.Router();

router.get('/services', async (req, res) => {
    try {
        const services = await serviceRepository.getServices();
        res.render('services', {services: services});
    } catch (err) {
        console.error(err);
    }
})

router.get('/real-time-services', async (req, res) => {
    try {
        const services = await serviceRepository.getServices();
        res.render('real-time-services', {services: services});
    } catch (err) {
        console.error(err);
    }
})

router.get('/services/:id', async (req, res) => {

    const serviceId = req.params.id;
    console.log(serviceId);
    try {
        const service = await serviceRepository.getServiceById(serviceId);
        if (!service) {
            res.status(404).render('service-detail', {error: 'Service Not Found'});
        }
        res.render('service-detail', {service: service});

    } catch (err) {
        console.error(err);
    }
})

router.get('/create-services', async (req, res) => {
    res.render('create-service');
})

export default router;