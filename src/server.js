import app from './app.js';
import { config } from './config/env.config.js';

app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}, Bienvenidos a ${config.APP_NAME}`);
});
