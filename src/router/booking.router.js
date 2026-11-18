import {Router} from "express";
import BookingController from "../controllers/BookingController.js";
import {BookingService} from "../service/booking/BookingService.js";
import {BookingMongoDao} from "../dao/BookingMongoDao.js";
import {ServiceMongoDAO} from "../dao/ServiceMongoDAO.js";

const repository = new BookingMongoDao();
const serviceRepository = new ServiceMongoDAO();
const service = new BookingService(repository, serviceRepository);
const bookingController = new BookingController(service);

const router = Router();

router.post('/', (req, res) => bookingController.createBooking(req, res));
router.get('/:id', (req, res) => bookingController.getBooking(req, res));
router.get('/available/:date', (req, res) => bookingController.getAvailableByDate(req, res));
export default router;
