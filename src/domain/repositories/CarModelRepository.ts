import type { CarModel } from "../models/CarModel";

export interface CarModelRepository {
  getAll(): Promise<CarModel[]>;
}
