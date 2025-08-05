import { describe, it, expect, vi } from "vitest";
import { fetchCarsUseCase } from "@/application/use-cases/fetchCarsUseCase";
import { CarApiRepository } from "@/infrastructure/repositories/CarApiRepository";
import { CarModel } from "@/domain/models/CarModel";
import { Power } from "@/domain/value-objects/Power";

describe("fetchCarsUseCase", () => {
  it("should return a list of cars from the repository", async () => {
    const mockCars = [
      {
        id: 1,
        name: "Golf",
        brand: "Volkswagen",
        year: 2022,
        horsepower: Power.create(245),
        fuelType: "Gasoline" as CarModel["fuelType"],
      },
      {
        id: 2,
        name: "Ibiza",
        brand: "SEAT",
        year: 2021,
        horsepower: Power.create(115),
        fuelType: "Diesel" as CarModel["fuelType"],
      },
    ];

    // Mock del método del repositorio
    vi.spyOn(CarApiRepository, "getAll").mockResolvedValue(mockCars);

    const result = await fetchCarsUseCase();

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Golf");
    expect(result[1].brand).toBe("SEAT");
  });
});
