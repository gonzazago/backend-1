import { Router } from "express";
import ServiceController from "../controllers/ServiceController.js";
import { ServiceService } from "../service/service/ServiceService.js";
import { ServiceFsDAO } from "../dao/ServiceFsDAO.js";

// Inyección de dependencias: DAO -> Service -> Controller
const repository = new ServiceFsDAO();
const service = new ServiceService(repository);
const serviceController = new ServiceController(service);

const router = Router();

router.get('/', (req, res) => serviceController.getServices(req, res));
router.get('/:id', (req, res) => serviceController.getServiceById(req, res));
router.post('/', (req, res) => serviceController.addService(req, res));
router.put('/:id', (req, res) => serviceController.updateService(req, res));
router.delete('/:id', (req, res) => serviceController.deleteService(req, res));

export default router;
