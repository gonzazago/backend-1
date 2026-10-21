import express from 'express';
import { config } from './config/config.js';
import serviceRouter from './router/service.router.js';

const app = express();
const port = config.PORT;

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

app.listen(port, () => {
    console.log(`Server started on port ${port}, Bienvenidos a ${config.APP_NAME}`);
});

export default app;
