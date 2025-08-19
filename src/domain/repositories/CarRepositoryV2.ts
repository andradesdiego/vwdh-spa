import { Car } from "@/domain/entities/Car";

export interface CarRepositoryV2 {
  list(): Promise<Car[]>;
  create(car: Car): Promise<Car>; // devuelve con id asignado
  update(car: Car): Promise<Car>;
  remove(id: number): Promise<void>;
}
