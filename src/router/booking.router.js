import {Router} from "express";
import BookingManager from "../managers/BookingManager.js";
import {fileURLToPath} from "url";
import path from "path";

const router = Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bookingPath = path.resolve(__dirname, '../data/bookings.json');

const manager = new BookingManager(bookingPath);

const sendError = (res, error) => {
    const statusCode = error.statusCode || 500;
    console.error(`[Error ${statusCode}]: ${error.message}`);
    return res.status(statusCode).json({
        success: false,
        message: error.message || 'Error interno del servidor',
    });
};

router.get("/", async (req, res) => {

    try {
        const bookings = await manager.getBookings();
        res.status(200).json(bookings);
    } catch (err) {
        console.log(err);
        sendError(res, err);
    }
})

router.get("/:bid", async (req, res) => {

})

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        await manager.saveBooking(body);
        res.status(201).json({})
    } catch (err) {
        sendError(res, err);
    }
})

router.post("/:bid/service/:sid", async (req, res) => {
    const body = req.body;
    try {
        await manager.saveBooking(body);
        res.status(201).json({})
    } catch (err) {
        sendError(res, err);
    }
})

export default router;