import { CarModel } from "@/domain/models/CarModel";
import { Power } from "@/domain/value-objects/Power";

export type CarDTO = {
  id: number;
  name: string;
  brand: string;
  year: number;
  fuelType: CarModel["fuelType"];
  horsepower: number;
};

/**
 * Convert a flat DTO to a domain model with VO Power
 */
export function toDomainCar(dto: CarDTO): CarModel {
  return {
    id: dto.id,
    name: dto.name,
    brand: dto.brand,
    year: dto.year,
    fuelType: dto.fuelType,
    horsepower: Power.create(dto.horsepower),
  };
}

/**
 * Converts a domain model to a flat DTO for persistence
 */
export function toCarDTO(car: CarModel): CarDTO {
  return {
    id: car.id,
    name: car.name,
    brand: car.brand,
    year: car.year,
    fuelType: car.fuelType,
    horsepower: car.horsepower.getValue(),
  };
}
