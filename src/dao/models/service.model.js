import mongoose from "mongoose";

let categories = [
    "futbol",
    "tennis",
    "pingpong",
    "salud"
]

const serviceSchema = new mongoose.Schema({
                name: { type: String, required: true, trim: true },
                description: { type: String, required: true},
                duration: { type: Number, required: true},
                price: { type: Number, required: true },
                category: { type: String,
                    enum: categories,
                    required: true},
                available: { type: Boolean, default: true}
            },
            {
                timestamps: true, versionKey: false
            }
        )

export const ServiceModel = mongoose.model("service", serviceSchema);