import { createCarInApi } from "@/infrastructure/api/carApi";
import { CarModel } from "@/domain/models/CarModel";

/**
 * Caso de uso: crear un coche en el sistema
 */
export async function createCarUseCase(
  car: Omit<CarModel, "id">
): Promise<CarModel> {
  return await createCarInApi(car);
}
