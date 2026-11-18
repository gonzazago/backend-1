import {ServiceRepository} from "../repository/ServiceRepository.js";
import mongoose from "mongoose";
import {ServiceModel} from "./models/Service.model.js";

export class ServiceMongoDAO extends ServiceRepository {
    validateId(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw this.handleError('El ID recibido no es valido', 400);
        }
    }

    async getServices(filters) {

        const filterDb = {}

        console.log(filters);

        if (filters.category && filters.category !== '') {
            filterDb.category = filters.category
        }
        if (filters.available) {
            filterDb.available = filters.available
        }


        // paginado
        const skip = (filters.page - 1) * filters.limit
        // page 2 = 2-1 * 10 = 10....20

        //sort
        /*{
           nombre_campo : 1 // asc
           nombre_campo> -1 // desc
        }*/

        const sortByPrice = {
            price: filters.asc ? 1 : -1
        }
        console.log(sortByPrice);

        /*
        {
        payload: [],
        pages: 3,
        prev_page: null || 1,
        next_page: null || 2
        page: 1,
        hasteNextPage:true || false,
        prev_link:null,
        next_link:"api/services?page=2&limit=10&sort=desc"
        }*/
        return ServiceModel.
        find(filterDb).
        skip(skip).
        limit(filters.limit).
        sort(sortByPrice)
            .lean();
    }

    async getServiceById(id) {
        this.validateId(id)
        return ServiceModel.findById(id).lean()
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