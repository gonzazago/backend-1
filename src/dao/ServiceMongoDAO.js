import { ServiceRepository } from "../repository/ServiceRepository.js";
import mongoose from "mongoose";
import { ServiceModel } from "./models/Service.model.js";

export class ServiceMongoDAO extends ServiceRepository{
    validateId(id){
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw this.handleError('El ID recibido no es valido', 400);
        }
    }

    async getServices(){
        return ServiceModel.find()
    }

    async getServiceById(id) {
        this.validateId(id)
        return ServiceModel.findById(id)
    }

    async deleteService(id) {
        this.validateId(id)
        return ServiceModel.findByIdAndDelete(id)
    }

    async updateService(id, service) {
        this.validateId(id)
        return ServiceModel.findByIdAndUpdate(id, service)
    }

    async addService(data) {
        return ServiceModel.create(data)
    }

}