import { deleteCarInApi } from "@/infrastructure/api/carApi";

/**
 * Caso de uso: eliminar un coche por ID
 */
export async function deleteCarUseCase(id: number): Promise<void> {
  return await deleteCarInApi(id);
}
