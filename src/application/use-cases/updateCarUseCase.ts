import { CarModel } from "@/domain/models/CarModel";
import { updateCarInApi } from "@/infrastructure/api/carApi";

/**
 * Caso de uso: actualizar un coche existente
 */
export async function updateCarUseCase(car: CarModel): Promise<CarModel> {
  return await updateCarInApi(car);
}
