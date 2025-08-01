import type { CarModelRepository } from "@/domain/repositories/CarModelRepository";
import type { CarModel } from "@/domain/models/CarModel";

export async function fetchCarsUseCase(
  repo: CarModelRepository
): Promise<CarModel[]> {
  return await repo.getAll();
}
