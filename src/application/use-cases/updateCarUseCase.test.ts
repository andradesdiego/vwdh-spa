import { describe, it, expect, vi } from "vitest";
import { updateCarUseCase } from "@/application/use-cases/updateCarUseCase";
import { CarApiRepository } from "@/infrastructure/repositories/CarApiRepository";
import type { CarModel } from "@/domain/models/CarModel";
import { Power } from "@/domain/value-objects/Power";

describe("updateCarUseCase", () => {
  it("should update a car using the repository", async () => {
    const car: CarModel = {
      id: 1,
      name: "Golf GTI",
      brand: "Volkswagen",
      year: 2022,
      horsepower: Power.create(245),
      fuelType: "Gasoline",
    };

    const updated = { ...car, year: 2024 };

    vi.spyOn(CarApiRepository, "update").mockResolvedValue(updated);

    const result = await updateCarUseCase(car);

    expect(result.year).toBe(2024);
  });
});
