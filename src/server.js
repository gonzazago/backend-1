import http from 'http';

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});

    const response = {
        message: 'Bienvenido al backend del sistema de turnos y reservas ',
        status: 200,
    }

    res.end(JSON.stringify(response));
})

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

