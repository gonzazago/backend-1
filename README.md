# Sistema backend de turnos y reservas

API backend para gestionar servicios y reservas de turnos.

---

## Tecnologías

- **Node.js** (v22.x LTS)
- **Express**
- **MongoDB Atlas** & **Mongoose**
- **Socket.io**
- **Zod**
- **ES Modules (ESM)** con `import` / `export`

---

## Requisitos previos

- **Node.js** (versión 22 o superior): [Descargar Node.js](https://nodejs.org/en/download)
  - Seleccionar sistema operativo: macOS (`.pkg`), Linux (`.xz`), Windows (`.exe`)
- **npm** (incluido con Node.js)

---

## Instalación

1. Clonar el repositorio o descargar el proyecto.
2. Instalar las dependencias:

```bash
npm install
```

---

## Variables de entorno

Copiar o renombrar el archivo `.env_template` a `.env` y configurar los valores necesarios:

```bash
cp .env_template .env
```

Ejemplo de configuración en `.env`:

```env
PORT=8080
APP_NAME="SISTEMA BACKEND DE TURNOS Y RESERVA"
ENV=DEV
MONGO_DB_URI={{mongo_url}}
```

---

## Scripts disponibles

- **Iniciar en producción / modo estándar:**
  ```bash
  npm start
  ```
  Ejecuta `node src/server.js`.

- **Iniciar en modo desarrollo (recarga automática):**
  ```bash
  npm run dev
  ```
  Ejecuta `node --watch src/server.js` para reiniciar el servidor automáticamente ante cambios.

Por defecto, el servidor se iniciará en `http://localhost:8080/`.

---

## Estructura del proyecto

```text
backend-turnos-reservas/
├── .env_template          # Plantilla de variables de entorno
├── package.json           # Metadatos del proyecto y scripts
├── README.md              # Documentación del proyecto
└── src/
    ├── app.js             # Configuración principal de la aplicación
    ├── server.js          # Punto de entrada y arranque del servidor HTTP
    ├── config/            # Configuraciones (base de datos, entorno, etc.)
    ├── controllers/       # Controladores de peticiones HTTP
    ├── dao/               # Data Access Objects (capa de persistencia)
    ├── middlewares/       # Middlewares de Express
    ├── models/            # Modelos de datos / esquemas de Mongoose
    ├── repositories/      # Capa de repositorios
    ├── routes/            # Definición de rutas del sistema
    ├── services/          # Lógica de negocio
    └── utils/             # Funciones utilitarias y helpers
```

---

## Checklist del curso

- [ ] Semana 1 - Recorrido por Node.js y estructura inicial
- [ ] Semana 2 - Express y API REST
- [ ] Semana 3 - FileSystem
- [ ] Semana 4 - Routers y controllers
- [ ] Semana 5 - Arquitectura en capas
- [ ] Semana 6 - MongoDB y Mongoose
- [ ] Semana 7 - Handlebars y WebSockets
- [ ] Semana 8 - Consultas avanzadas
- [ ] Semana 9 - Proyecto final
