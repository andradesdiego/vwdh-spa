import { CarModel } from "@/domain/models/CarModel";
import { CarRepository } from "@/domain/repositories/CarRepository";
import * as http from "../http/http.car";
import { toCarDTO, toDomainCar } from "@/infrastructure/dto/carDTO";

export const CarApiRepository: CarRepository = {
  async getAll(): Promise<CarModel[]> {
    const dtos = await http.getAll();
    return dtos.map(toDomainCar);
  },

  async create(car: Partial<CarModel>): Promise<CarModel> {
    const dto = toCarDTO(car as CarModel);
    const result = await http.create(dto);
    return toDomainCar(result);
  },

  async update(car: CarModel): Promise<CarModel> {
    const dto = toCarDTO(car);
    const result = await http.update(dto);
    return toDomainCar(result);
  },

  async delete(id: number): Promise<void> {
    await http.remove(id);
  },
};
