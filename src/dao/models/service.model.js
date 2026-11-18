import mongoose from "mongoose";

let categories = [
    "futbol",
    "tennis",
    "pingpong",
    "salud", "funcion"
]

const serviceSchema = new mongoose.Schema({
                name: { type: String, required: true, trim: true },
                description: { type: String, required: true},
                duration: { type: Number, required: true},
                price: { type: Number, required: true },
                category: { type: String,
                    enum: categories,
                    required: true},
                available: { type: Boolean, default: true},
                capacity: { type: Number, min: 1 } 
            },
            {
                timestamps: true, versionKey: false
            }
        )

export const ServiceModel = mongoose.model("service", serviceSchema);