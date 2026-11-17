import {config} from "./config/config.js";
import app from "./app.js";
import {connectDB} from "./config/database.config.js";
import {Server} from "socket.io";

const startServer = async () => {
    await connectDB()
    const httpServer = app.listen(config.PORT, () => {
            console.log(`Server started on port ${config.PORT}, Bienvenidos a ${config.APP_NAME}`);
        }
    );

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`)
        })
        socket.on('servicesUpdated', (service) => {
            console.log(`Service updated: ${service.name}`);
            io.emit('servicesUpdated', service);
        })

    })
}

startServer()