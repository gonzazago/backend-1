/**
 * Función auxiliar para enviar respuestas de error consistentes.
 * Utiliza el statusCode provisto por el Error o 500 por defecto.
 * @param {import('express').Response} res Objeto de respuesta de Express.
 * @param {Error} error Objeto de error capturado.
 */
const sendError = (res, error) => {
    const statusCode = error.statusCode || 500;
    console.error(`[Error ${statusCode}]: ${error.message}`);
    return res.status(statusCode).json({
        success: false,
        message: error.message || 'Error interno del servidor',
    });
};

export default sendError