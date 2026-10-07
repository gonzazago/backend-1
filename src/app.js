import packageJson from '../package.json' with { type: 'json' };
import express from 'express';
import serviceRouter from './router/service.router.js';
import path from "path";
import {fileURLToPath} from "url";
import bookingRouter from "./router/booking.router.js";

export const { name, version, description, author, license } = packageJson;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log( __dirname )

// Middlewares para parsear cuerpos de peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/health', (req, res) => {
    res.status(200).json({ name, version, status: 'OK' });
});

app.use('/api/services', serviceRouter);
app.use('/api/bookings',bookingRouter);

export default app;