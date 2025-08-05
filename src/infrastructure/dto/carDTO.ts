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
 * Convierte un DTO plano a un modelo de dominio con VO Power
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
 * Convierte un modelo de dominio a un DTO plano para persistencia
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
