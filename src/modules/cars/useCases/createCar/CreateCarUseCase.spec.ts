import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepostitory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepostitory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepostitory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Aventador",
      description: "A sport car",
      daily_rate: 1000,
      license_plate: "NFA-5230",
      fine_amount: 200,
      brand: "Lamborghini",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with an already registered license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "A sport car",
        daily_rate: 1000,
        license_plate: "NFA-5230",
        fine_amount: 200,
        brand: "Lamborghini",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "A sport car",
        daily_rate: 1000,
        license_plate: "NFA-5230",
        fine_amount: 200,
        brand: "Lamborghini",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a car with availability true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Aventador",
      description: "A sport car",
      daily_rate: 1000,
      license_plate: "NFA-5230",
      fine_amount: 200,
      brand: "Lamborghini",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
