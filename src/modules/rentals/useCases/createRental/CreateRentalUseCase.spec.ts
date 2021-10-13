import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/createCar/CreateCarUseCase";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createCarUseCase: CreateCarUseCase;
let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayPlus24Hours: Date;
let dayjsDateProvider: DayjsDateProvider;

describe("Create rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    dayjsDateProvider = new DayjsDateProvider();

    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    createRentalUseCase = new CreateRentalUseCase(
      carsRepositoryInMemory,
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );

    dayPlus24Hours = dayjsDateProvider.datePlusHour(
      dayjsDateProvider.dateNow(),
      24
    );
  });

  it("Should be able to create a new rental.", async () => {
    const car = await createCarUseCase.execute({
      name: "Onix",
      description: "A common car",
      daily_rate: 100,
      license_plate: "CGB-3886",
      fine_amount: 50,
      brand: "Chevrolet",
      category_id: "7977d775-1f34-49e3-be4e-1aa5aa02c988",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayPlus24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not able to create a new rental if already have an open rental to the same user.", async () => {
    const car = await createCarUseCase.execute({
      name: "Onix",
      description: "A common car",
      daily_rate: 100,
      license_plate: "CGB-3886",
      fine_amount: 50,
      brand: "Chevrolet",
      category_id: "7977d775-1f34-49e3-be4e-1aa5aa02c988",
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id,
        expected_return_date: dayPlus24Hours,
      });
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id,
        expected_return_date: dayPlus24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not able to create a new rental if already have an open rental to the same car.", async () => {
    const car = await createCarUseCase.execute({
      name: "Onix",
      description: "A common car",
      daily_rate: 100,
      license_plate: "CGB-3886",
      fine_amount: 50,
      brand: "Chevrolet",
      category_id: "7977d775-1f34-49e3-be4e-1aa5aa02c988",
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id,
        expected_return_date: dayPlus24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "54321",
        car_id: car.id,
        expected_return_date: dayPlus24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not able to create a new rental if the diff of expected_return_date and start_date are less than 24 hours.", async () => {
    const car = await createCarUseCase.execute({
      name: "Onix",
      description: "A common car",
      daily_rate: 100,
      license_plate: "CGB-3886",
      fine_amount: 50,
      brand: "Chevrolet",
      category_id: "7977d775-1f34-49e3-be4e-1aa5aa02c988",
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id,
        expected_return_date: dayjsDateProvider.dateNow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
