import ServiceManager from "../managers/ServiceManager"
import sendError from "../utils/sendError";


class ServiceController{
    constructor(){
        this.serviceManager = new ServiceManager()
    }
        async getServices(req, res) {
            try {
                const services = await this.serviceManager.getServices();
                return res.status(200).json(services);
            } catch (err) {
                return sendError(res, err);
            }
        }
        async getServiceById(req, res){
            try {
                const service = await this.serviceManager.getServiceById(req.params.id);
                return res.status(200).json(service);
            } catch (err) {
                return sendError(res, err);
            }
        }

        async addService(req, res){
            try {
                const newService = await this.serviceManager.addService(req.body);
                return res.status(201).json({
                    success: true,
                    message: 'Servicio creado exitosamente',
                    data: newService,
                });
            } catch (err) {
                return sendError(res, err);
            }
        }


        async updateService(req, res){
            try {
                const updatedService = await this.serviceManager.updateService(req.params.id, req.body);
                return res.status(200).json({
                    success: true,
                    message: `Servicio con ID ${req.params.id} actualizado exitosamente`,
                    data: updatedService,
                });
            } catch (err) {
                return sendError(res, err);
            }
        }

        async deleteService(req, res){
            try {
                const deletedService = await this.serviceManager.deleteService(req.params.id);
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