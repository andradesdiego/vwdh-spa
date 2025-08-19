import { CarRepositoryV2 } from "@/domain/repositories/CarRepositoryV2";
import { Car } from "@/domain/entities/Car";
export const updateCar = (repo: CarRepositoryV2) => (car: Car) =>
  repo.update(car);
