import type { CarModelRepository } from "@/domain/repositories/CarModelRepository";
import { fetchCars } from "../api/carApi";

export const CarModelRepositoryImpl: CarModelRepository = {
  getAll: fetchCars,
};
