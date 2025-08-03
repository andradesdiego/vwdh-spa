import type { CarRepository } from "@/domain/repositories/CarRepository";
import type { CarModel } from "@/domain/models/CarModel";
import * as HttpCar from "@/infrastructure/http/http.car";

export const CarApiRepository: CarRepository = {
  async getAll(): Promise<CarModel[]> {
    return await HttpCar.getAll();
  },

  async create(car: Omit<CarModel, "id">): Promise<CarModel> {
    return await HttpCar.create(car);
  },

  async update(car: CarModel): Promise<CarModel> {
    return await HttpCar.update(car);
  },

  async delete(id: number): Promise<void> {
    return await HttpCar.remove(id);
  },
};
