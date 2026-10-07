import {config} from './config/config.js';
import app from "./app.js";

const port = config.PORT;

(async () => {
    try {
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        }).on('error', (err) => {
            console.error(`Error init server: ${err.message}`);
            process.exit(1);
        })
    } catch (err) {
        console.error(`API can't start - ${err.message}`);
    }
})();
