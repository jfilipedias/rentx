import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carsRoutes = Router();

const createCarsController = new CreateCarController();

carsRoutes.post("/", createCarsController.handle);

export { carsRoutes };
