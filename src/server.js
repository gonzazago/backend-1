import { config } from "./config/config.js";
import app from "./app.js";
import { connectDB } from "./config/database.config.js";

const startServer = async() => {
    await connectDB()
    app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}, Bienvenidos a ${config.APP_NAME}`);
});
}

startServer()