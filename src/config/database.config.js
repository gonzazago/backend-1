import mongoose from "mongoose"
import { config } from "./config.js"

export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_DB_URI)
        console.log("mongo db conectado exitosamente")
    } catch (error) {
        console.log("Error al conectar a la base de datos", error.message)
        process.exit(1)
    }
}