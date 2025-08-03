import { CarApiRepository } from "@/infrastructure/repositories/CarApiRepository";
import type { CarRepository } from "@/domain/repositories/CarRepository";
import type { CarModel } from "@/domain/models/CarModel";

const repo: CarRepository = CarApiRepository;

export async function createCarUseCase(data: Omit<CarModel, "id">) {
  return await repo.create(data);
}
