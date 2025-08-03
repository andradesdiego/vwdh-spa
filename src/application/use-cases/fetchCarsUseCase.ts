import { CarApiRepository } from "@/infrastructure/repositories/CarApiRepository";
import type { CarRepository } from "@/domain/repositories/CarRepository";

const repo: CarRepository = CarApiRepository;

export async function fetchCarsUseCase() {
  return await repo.getAll();
}
