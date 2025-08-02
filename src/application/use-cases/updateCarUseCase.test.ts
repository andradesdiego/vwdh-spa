import { describe, it, expect, vi } from "vitest";
import { updateCarUseCase } from "@/application/use-cases/updateCarUseCase";
import * as carApi from "@/infrastructure/api/carApi";
import type { CarModel } from "@/domain/models/CarModel";

describe("updateCarUseCase", () => {
  it("should update a car via the API and return the updated car", async () => {
    const updatedCar: CarModel = {
      id: 1,
      name: "Golf GTI",
      brand: "Volkswagen",
      year: 2024,
      horsepower: 245,
      fuelType: "Gasoline",
    };

    vi.spyOn(carApi, "updateCarInApi").mockResolvedValue(updatedCar);

    const result = await updateCarUseCase(updatedCar);

    expect(result).toEqual(updatedCar);
    expect(carApi.updateCarInApi).toHaveBeenCalledWith(updatedCar);
  });
});
