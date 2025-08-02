import { describe, it, expect, vi } from "vitest";
import { createCarUseCase } from "@/application/use-cases/createCarUseCase";
import * as carApi from "@/infrastructure/api/carApi";
import { CarModel } from "@/domain/models/CarModel";

describe("createCarUseCase", () => {
  it("should create a new car via the API and return the full car object with id", async () => {
    const input = {
      name: "Tiguan",
      brand: "Volkswagen",
      year: 2023,
      horsepower: 150,
      fuelType: "Gasoline" as CarModel["fuelType"],
    };

    const mockCreatedCar: CarModel = {
      ...input,
      id: 99,
    };

    vi.spyOn(carApi, "createCarInApi").mockResolvedValue(mockCreatedCar);

    const result = await createCarUseCase(input);

    expect(result).toEqual(mockCreatedCar);
    expect(carApi.createCarInApi).toHaveBeenCalledWith(input);
  });
});
