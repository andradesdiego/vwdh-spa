import { CarModel } from "@/domain/models/CarModel";

export interface CarRepository {
  getAll(): Promise<CarModel[]>;
  create(car: Omit<CarModel, "id">): Promise<CarModel>;
  update(car: CarModel): Promise<CarModel>;
  delete(id: number): Promise<void>;
}
