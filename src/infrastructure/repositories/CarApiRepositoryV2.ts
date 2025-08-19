import { CarRepositoryV2 } from "@/domain/repositories/CarRepositoryV2";
import { Car } from "@/domain/entities/Car";
import { toEntityCar, entityToCarDTO } from "@/infrastructure/dto/carDTO";
import * as http from "@/infrastructure/http/http.car";

export class CarApiRepositoryV2 implements CarRepositoryV2 {
  async list(): Promise<Car[]> {
    const dtos = await http.getAll();
    return dtos.map(toEntityCar);
  }

  async create(car: Car): Promise<Car> {
    const created = await http.create(entityToCarDTO(car));
    return toEntityCar(created);
  }

  async update(car: Car): Promise<Car> {
    const updated = await http.update(entityToCarDTO(car));
    return toEntityCar(updated);
  }

  async remove(id: number): Promise<void> {
    await http.remove(id);
  }
}
