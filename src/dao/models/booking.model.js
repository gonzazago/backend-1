import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, default: Date.now},
    service: {service: {type: mongoose.Schema.Types.ObjectId, ref: "Service"}}
})

export default mongoose.model("Booking", BookingSchema);