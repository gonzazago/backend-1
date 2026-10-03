# Sistema backend de turnos y reservas

API REST con Express para gestionar el recurso `services` (servicios que se
pueden reservar). Los datos se guardan en `src/data/data.json` mediante el
`ServiceManager`.

## Requisitos

- Node.js 22 o superior
- npm

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

Por defecto escucha en `http://localhost:8080`.

## Variables de entorno

| Variable | Descripción | Default |
| --- | --- | --- |
| `PORT` | Puerto del servidor | `8080` |
| `APP_NAME` | Nombre que se muestra al arrancar | `SISTEMA BACKEND DE TURNOS Y RESERVA` |
| `ENV` | Entorno de ejecución | `DEV` |
| `MONGO_DB_URI` | URI de MongoDB (se usa más adelante en el curso) | vacío |

## Estructura

```text
src/
├── config/env.config.js         # Lee el .env con dotenv
├── data/data.json               # Persistencia en archivo
├── managers/ServiceManager.js   # Lógica de servicios (leer, filtrar, crear, actualizar, borrar)
├── routes/services.router.js    # Endpoints de /api/services
├── app.js                       # Express: middlewares, routers, 404 y errores
└── server.js                    # Levanta el servidor en el puerto configurado
```

## Endpoints

| Método | Ruta | Respuesta |
| --- | --- | --- |
| GET | `/api/services` | 200 con todos los servicios. Filtros: `?category=salud`, `?available=true` |
| GET | `/api/services/:sid` | 200 si existe, 404 si no |
| POST | `/api/services` | 201 con el servicio creado (id generado), 400 si faltan campos |
| PUT | `/api/services/:sid` | 200 con el servicio actualizado (el id no cambia), 404 si no existe |
| DELETE | `/api/services/:sid` | 200 con el servicio eliminado, 404 si no existe |

Campos obligatorios en el POST: `name`, `description`, `duration`, `price`,
`category`. `available` es opcional (default `true`).

Ejemplo de body:

```json
{
  "name": "Consulta médica general",
  "description": "Control clínico de rutina",
  "duration": 30,
  "price": 12000,
  "category": "salud",
  "available": true
}
```

Formato de respuesta:

```json
{ "status": "success", "payload": {} }
```

```json
{ "status": "error", "message": "Servicio con ID 99 no encontrado" }
```

## Scripts

| Comando | Uso |
| --- | --- |
| `npm run dev` | Desarrollo con recarga automática (`node --watch`) |
| `npm start` | Modo estándar |
