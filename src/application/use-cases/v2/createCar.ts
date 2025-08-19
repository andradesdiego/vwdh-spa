import { CarRepositoryV2 } from "@/domain/repositories/CarRepositoryV2";
import { Car } from "@/domain/entities/Car";
import { FuelType } from "@/domain/entities/Car";
import { Power } from "@/domain/value-objects/Power";

export type CreateCarInput = {
  name: string;
  brand: string;
  year: number;
  fuelType: FuelType;
  horsepower: number | Power;
};

export const createCar = (repo: CarRepositoryV2) => (input: CreateCarInput) => {
  const hp =
    typeof input.horsepower === "number"
      ? input.horsepower
      : input.horsepower.getValue();

  const entity = Car.create({ ...input, id: null, horsepower: hp });
  return repo.create(entity);
};
