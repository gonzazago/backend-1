# Sistema Backend de Turnos y Reservas

API REST para gestionar los servicios que se pueden reservar. Hoy la
persistencia de servicios es un archivo JSON; la API ya está separada en
capas para poder cambiar cómo se guardan los datos sin reescribir las rutas.

## Requisitos

- Node.js 22 o superior
- npm (incluido con Node.js)

## Instalación

```bash
npm install
cp .env_template .env
```

```bash
npm run dev
```

Servidor en `http://localhost:8080`.

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto HTTP (default `8080`) |
| `APP_NAME` | Nombre que se muestra al arrancar |
| `ENV` | Entorno (`DEV`, `development`, etc.) |
| `MONGO_DB_URI` | Reservada; todavía no se usa en esta versión |

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/` | Salud / bienvenida |
| GET | `/api/services` | Listar servicios |
| GET | `/api/services/:id` | Obtener un servicio |
| POST | `/api/services` | Crear un servicio |
| PUT | `/api/services/:id` | Actualizar un servicio |
| DELETE | `/api/services/:id` | Eliminar un servicio |

`POST /api/services` espera `name`, `description`, `duration`, `price` y
`category`. `available` es opcional (default `true`).

## Arquitectura

```
router → controller → service → repository → DAO (FileSystem)
```

El controller no lee archivos. `ServiceFsDAO` implementa el contrato del
repository y escribe `src/data/data.json`. Esa separación es la que permite
cambiar la persistencia más adelante sin tocar las rutas.

## Postman

Importar `postman/TurnosReservas-MongoDB.postman_collection.json` y
`postman/TurnosReservas-MongoDB.postman_environment.json`.
Seleccionar el environment **Turnos y Reservas — MongoDB**.

Los POST de creación guardan el id en el environment. Las carpetas de
reservas responden cuando ese recurso esté montado.

## Scripts

| Script | Comando |
| --- | --- |
| Desarrollo (watch) | `npm run dev` |
| Producción | `npm start` |
