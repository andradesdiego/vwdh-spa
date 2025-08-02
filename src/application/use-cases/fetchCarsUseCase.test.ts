import { describe, it, expect, vi } from "vitest";
import { fetchCarsUseCase } from "@/application/use-cases/fetchCarsUseCase";
import * as carApi from "@/infrastructure/api/carApi";

describe("fetchCarsUseCase", () => {
  it("should return a list of cars from the API", async () => {
    // Arrange (mock de infraestructura)
    const mockCars = [
      {
        id: 1,
        name: "Golf",
        brand: "Volkswagen",
        year: 2022,
        horsepower: 245,
        fuelType: "Gasoline",
      },
      {
        id: 2,
        name: "Ibiza",
        brand: "SEAT",
        year: 2021,
        horsepower: 115,
        fuelType: "Diesel",
      },
    ];
    vi.spyOn(carApi, "fetchCarsFromApi").mockResolvedValue(mockCars);

    // Act
    const cars = await fetchCarsUseCase();

    // Assert
    expect(cars).toHaveLength(2);
    expect(cars[0].name).toBe("Golf");
    expect(cars[1].brand).toBe("SEAT");
  });
});
