import express from 'express';
import servicesRouter from './routes/services.router.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Bienvenido al backend del sistema de turnos y reservas',
    });
});

app.use('/api/services', servicesRouter);

app.use((req, res) => {
    res.status(404).json({ status: 'error', message: `Ruta ${req.method} ${req.url} no encontrada` });
});

app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({ status: 'error', message: 'El body no es un JSON válido' });
    }
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
});

export default app;
