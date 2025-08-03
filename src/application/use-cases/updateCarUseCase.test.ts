import { describe, it, expect, vi } from "vitest";
import { updateCarUseCase } from "@/application/use-cases/updateCarUseCase";
import { CarApiRepository } from "@/infrastructure/repositories/CarApiRepository";
import type { CarModel } from "@/domain/models/CarModel";

describe("updateCarUseCase", () => {
  it("should update a car using the repository", async () => {
    const car: CarModel = {
      id: 1,
      name: "Golf GTI",
      brand: "Volkswagen",
      year: 2022,
      horsepower: 245,
      fuelType: "Gasoline",
    };

    const updated = { ...car, horsepower: 250 };

    vi.spyOn(CarApiRepository, "update").mockResolvedValue(updated);

    const result = await updateCarUseCase(car);

    expect(result.horsepower).toBe(250);
  });
});
