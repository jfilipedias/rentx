import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("Should not be able to add a new specification to a non-existent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["54321"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Onix",
      description: "A common car",
      daily_rate: 100,
      license_plate: "CGB-3886",
      fine_amount: 50,
      brand: "Chevrolet",
      category_id: "f6e6b6f2-540d-418c-801f-7257ec95aebf",
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: "4 portas",
      description: "4 portas",
    });

    const specifications_id = [specification.id];

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications.length).toBe(1);
  });
});
