import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/listAvailabeCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarsController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle
);

export { carsRoutes };
