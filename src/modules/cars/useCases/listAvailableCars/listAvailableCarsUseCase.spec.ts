import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("ListCars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars", async () => {
    const huracan = await carsRepositoryInMemory.create({
      name: "Huracan",
      description: "A sport car",
      daily_rate: 1000,
      license_plate: "KBX-6391",
      fine_amount: 200,
      brand: "Lamborghini",
      category_id: "b40eaca4-bfc8-42ec-ad78-e531d132076e",
    });

    const aventador = await carsRepositoryInMemory.create({
      name: "Aventador",
      description: "A sport car",
      daily_rate: 1000,
      license_plate: "NFA-5230",
      fine_amount: 200,
      brand: "Lamborghini",
      category_id: "b40eaca4-bfc8-42ec-ad78-e531d132076e",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([huracan, aventador]);
  });

  it("Should be able to list all available cars by brand", async () => {
    await carsRepositoryInMemory.create({
      name: "DeLorean",
      description: "A sport car",
      daily_rate: 1000,
      license_plate: "OUTATIME",
      fine_amount: 200,
      brand: "Back To The Future",
      category_id: "b40eaca4-bfc8-42ec-ad78-e531d132076e",
    });

    const aventador = await carsRepositoryInMemory.create({
      name: "Aventador",
      description: "A sport car",
      daily_rate: 1000,
      license_plate: "NFA-5230",
      fine_amount: 200,
      brand: "Lamborghini",
      category_id: "b40eaca4-bfc8-42ec-ad78-e531d132076e",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Lamborghini",
    });

    expect(cars).toEqual([aventador]);
  });

  it("Should be able to list all available cars by category id", async () => {
    await carsRepositoryInMemory.create({
      name: "Onix",
      description: "A sport car",
      daily_rate: 100,
      license_plate: "CGB-3886",
      fine_amount: 50,
      brand: "Chevrolet",
      category_id: "b7fa0ed3-a1e5-49d1-9679-f2e41234e2f1",
    });

    const aventador = await carsRepositoryInMemory.create({
      name: "Aventador",
      description: "A sport car",
      daily_rate: 1000,
      license_plate: "NFA-5230",
      fine_amount: 200,
      brand: "Lamborghini",
      category_id: "b40eaca4-bfc8-42ec-ad78-e531d132076e",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "b40eaca4-bfc8-42ec-ad78-e531d132076e",
    });

    expect(cars).toEqual([aventador]);
  });

  it("Should be able to list all available cars by name", async () => {
    await carsRepositoryInMemory.create({
      name: "Huracan",
      description: "A sport car",
      daily_rate: 1000,
      license_plate: "KBX-6391",
      fine_amount: 200,
      brand: "Lamborghini",
      category_id: "b40eaca4-bfc8-42ec-ad78-e531d132076e",
    });

    const aventador = await carsRepositoryInMemory.create({
      name: "Aventador",
      description: "A sport car",
      daily_rate: 1000,
      license_plate: "NFA-5230",
      fine_amount: 200,
      brand: "Lamborghini",
      category_id: "b40eaca4-bfc8-42ec-ad78-e531d132076e",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Aventador" });

    expect(cars).toEqual([aventador]);
  });
});
