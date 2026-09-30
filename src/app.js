import packageJson from '../package.json' with { type: 'json' };
import express from 'express';
import serviceRouter from './routes/service.router.js';

export const { name, version, description, author, license } = packageJson;

const app = express();

// Middlewares para parsear cuerpos de peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/health', (req, res) => {
    res.status(200).json({ name, version, status: 'OK' });
});

app.use('/api/services', serviceRouter);

export default app;
