import { describe, it, expect } from "vitest";
import { toDomainCar, toCarDTO, CarDTO } from "@/infrastructure/dto/carDTO";
import { Power } from "@/domain/value-objects/Power";

describe("carDTO mappers", () => {
  const sampleDTO: CarDTO = {
    id: 1,
    name: "Golf",
    brand: "Volkswagen",
    year: 2022,
    fuelType: "Gasoline",
    horsepower: 150,
  };

  it("should map DTO to domain model correctly", () => {
    const car = toDomainCar(sampleDTO);

    expect(car.id).toBe(sampleDTO.id);
    expect(car.name).toBe(sampleDTO.name);
    expect(car.fuelType).toBe(sampleDTO.fuelType);
    expect(car.horsepower).toBeInstanceOf(Power);
    expect(car.horsepower.getValue()).toBe(sampleDTO.horsepower);
  });

  it("should map domain model to DTO correctly", () => {
    const domainCar = toDomainCar(sampleDTO);
    const dto = toCarDTO(domainCar);

    expect(dto).toEqual(sampleDTO);
  });
});
