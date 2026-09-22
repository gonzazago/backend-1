import http from 'http';

import { config } from './config/config.js';

const port = config.PORT;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});

    const response = {
        message: 'Bienvenido al backend del sistema de turnos y reservas ',
        status: 200,
    }
    res.end(JSON.stringify(response));
})

server.listen(port, () => {
    console.log(`Server started on port ${port}, Bienvenidos a ${config.APP_NAME}`);
})

