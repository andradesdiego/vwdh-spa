import type { CarModel } from "@/domain/models/CarModel";

export interface CarModelRepository {
  getAll(): Promise<CarModel[]>;
}

export async function fetchCarsUseCase(
  repository: CarModelRepository
): Promise<CarModel[]> {
  return await repository.getAll();
}
