import BookingModel from "./models/booking.model.js";
import {BookingRepository} from "../repository/BookingRepository.js";

export class BookingMongoDao extends BookingRepository {
    async getBookings() {
        return BookingModel.find().lean()
    }

    async getBooking(id) {
        return BookingModel.findById(id).populate('service.service').lean()
    }

    async createBooking(data) {
        const booking = await BookingModel.create({
            name: data.name,
            date: data.date,
            time: data.time,
            quantity: data.quantity || 1,
            active: data.active !== false,
            service: data.service,
        });
        return BookingModel.findById(booking._id).populate('service.service').lean();
    }

    async findConflict(date, time, serviceId) {
        return BookingModel.findOne({
            date: date,
            time: time,
            'service.service': serviceId,
            active: true
        }).lean();
    }

    async availableByDate(date) {
        return BookingModel.aggregate([
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        date: date,
        active: true
      }
  },
  {
    $lookup:
      /**
       * from: The target collection.
       * localField: The local join field.
       * foreignField: The target join field.
       * as: The name for the results.
       * pipeline: Optional pipeline to run on the foreign collection.
       * let: Optional variables to use in the pipeline field stages.
       */
      {
        from: "services",
        localField: "service.service",
        foreignField: "_id",
        as: "populatedService"
      }
  },
  {
    $unwind:
      /**
       * path: Path to the array field.
       * includeArrayIndex: Optional name for index.
       * preserveNullAndEmptyArrays: Optional
       *   toggle to unwind null and empty values.
       */
      {
        path: "$populatedService",
        preserveNullAndEmptyArrays: false
      }
  },
  {
    $group:
      /**
       * _id: The id of the group.
       * fieldN: The first field name.
       */
      {
        _id: "$populatedService.name",
        totalBookings: {
          $sum: 1
        }
      }
  }
])
    }
}
