import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepostitory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepostitory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepostitory);
  });

  it("Should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Aventador",
      description: "A sport car",
      daily_rate: 1000,
      license_plate: "NFA-5230",
      fine_amount: 200,
      brand: "Lamborghini",
      category_id: "category",
    });
  });
});
