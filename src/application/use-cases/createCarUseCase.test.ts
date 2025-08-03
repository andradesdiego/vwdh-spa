import { describe, it, expect, vi } from "vitest";
import { createCarUseCase } from "@/application/use-cases/createCarUseCase";
import { CarApiRepository } from "@/infrastructure/repositories/CarApiRepository";
import { CarModel } from "@/domain/models/CarModel";

describe("createCarUseCase", () => {
  it("should create a new car using the repository", async () => {
    const input = {
      name: "Tiguan",
      brand: "Volkswagen",
      year: 2023,
      horsepower: 150,
      fuelType: "Gasoline" as CarModel["fuelType"],
    };

    const created = { ...input, id: 3 };

    vi.spyOn(CarApiRepository, "create").mockResolvedValue(created);

    const result = await createCarUseCase(input);

    expect(result.id).toBe(3);
    expect(result.name).toBe("Tiguan");
  });
});
