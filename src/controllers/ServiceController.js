import sendError from "../utils/sendError.js";


export class ServiceController {
    constructor(service) {
        this.service = service
    }

    async getServices(req, res) {
        try {
            const services = await this.service.getServices();
            return res.status(200).json(services);
        } catch (err) {
            return sendError(res, err);
        }
    }

    async getServiceById(req, res) {
        try {
            const service = await this.service.getServiceById(req.params.id);
            return res.status(200).json(service);
        } catch (err) {
            return sendError(res, err);
        }
    }

    async addService(req, res) {
        try {
            const newService = await this.service.addService(req.body);
            return res.status(201).json({
                success: true,
                message: 'Servicio creado exitosamente',
                data: newService,
            });
        } catch (err) {
            return sendError(res, err);
        }
    }


    async updateService(req, res) {
        try {
            const updatedService = await this.service.updateService(req.params.id, req.body);
            return res.status(200).json({
                success: true,
                message: `Servicio con ID ${req.params.id} actualizado exitosamente`,
                data: updatedService,
            });
        } catch (err) {
            return sendError(res, err);
        }
    }

    async deleteService(req, res) {
        try {
            const deletedService = await this.service.deleteService(req.params.id);
            return res.status(200).json({
                success: true,
                message: `Servicio con ID ${req.params.id} eliminado exitosamente`,
                data: deletedService,
            });
        } catch (err) {
            return sendError(res, err);
        }
    }
}


export default ServiceController