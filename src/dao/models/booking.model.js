import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, default: Date.now},
    time: {type: String, required: true},
    quantity: {type: Number, default: 1},
    active: {type: Boolean, default: true},
    service: {service: {type: mongoose.Schema.Types.ObjectId, ref: "service"}}
})

BookingSchema.index(
    {date: 1, time: 1, "service.service": 1},
    {
        unique: true,
        partialFilterExpression: { active: true }
    }
)

export default mongoose.model("Booking", BookingSchema);