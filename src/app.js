import express from 'express';
import serviceRouter from './router/service.router.js';

const app = express();

// Middlewares para procesar JSON y formularios en el body de las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta base de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Bienvenido al backend del sistema de turnos y reservas',
        status: 200,
    });
});

// Rutas de servicios
app.use('/api/services', serviceRouter);


export default app;
