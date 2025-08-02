import { fetchCarsFromApi } from "@/infrastructure/api/carApi";
import { CarModel } from "@/domain/models/CarModel";

/**
 * Domain use case for fetching all cars
 */
export async function fetchCarsUseCase(): Promise<CarModel[]> {
  return await fetchCarsFromApi();
}
