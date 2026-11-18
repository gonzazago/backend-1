import express from 'express';
import serviceRouter from './router/service.router.js';
import {engine} from "express-handlebars";
import path from "path";
import viewRouter from "./router/view.router.js";
import bookingRouter from "./router/booking.router.js";

const app = express();

// Middlewares para procesar JSON y formularios en el body de las peticiones
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', engine()) // el motor de plantillas

app.set('view engine', 'handlebars');
app.set('views', path.resolve('src/views'));

// Ruta base de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Bienvenido al backend del sistema de turnos y reservas',
        status: 200,
    });
});

// Rutas de servicios
app.use('/api/services', serviceRouter);
app.use('/api/bookings', bookingRouter);
app.use('/', viewRouter)


export default app;
