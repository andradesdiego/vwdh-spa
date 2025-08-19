import { CarModel } from "@/domain/models/CarModel";
import { Power } from "@/domain/value-objects/Power";
import { Car, FuelType } from "@/domain/entities/Car";

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

/* =========================
   V2: Mapeos a Entidad Car
   ========================= */

/** DTO -> Entidad Car (nueva capa de dominio rica) */
export function toEntityCar(dto: CarDTO): Car {
  return Car.create({
    id: dto.id,
    name: dto.name,
    brand: dto.brand,
    year: dto.year,
    fuelType: dto.fuelType as FuelType,
    horsepower: dto.horsepower,
  });
}

/** Entidad Car -> DTO */
export function entityToCarDTO(entity: Car): CarDTO {
  const p = entity.toPrimitives();
  return {
    id: (p.id ?? 0) as number, // JSON Server asigna id en create
    name: p.name,
    brand: p.brand,
    year: p.year,
    fuelType: p.fuelType as CarModel["fuelType"],
    horsepower: p.horsepower,
  };
}

/** Entidad Car -> CarModel (puente temporal para UI/Store legacy) */
export function entityToModel(entity: Car): CarModel {
  const p = entity.toPrimitives();
  return {
    id: (p.id ?? 0) as number,
    name: p.name,
    brand: p.brand,
    year: p.year,
    fuelType: p.fuelType as CarModel["fuelType"],
    horsepower: Power.create(p.horsepower),
  };
}

/** CarModel (legacy) -> Entidad Car (por si lo necesitas en formularios) */
export function modelToEntity(model: CarModel): Car {
  return Car.create({
    id: model.id,
    name: model.name,
    brand: model.brand,
    year: model.year,
    fuelType: model.fuelType as FuelType,
    horsepower: model.horsepower, // ya es Power
  });
}
