import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 8080,
    APP_NAME: process.env.APP_NAME || 'SISTEMA BACKEND DE TURNOS Y RESERVA',
    ENV: process.env.ENV || 'DEV',
    MONGO_DB_URI: process.env.MONGO_DB_URI || '',
};

export default config;
