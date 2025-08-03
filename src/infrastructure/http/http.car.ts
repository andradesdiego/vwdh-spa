import type { CarModel } from "@/domain/models/CarModel";
import { CarDTO } from "../dto/carDTO";

const API_URL = "http://localhost:4000/cars";

/**
 * GET /cars
 */
export async function getAll(): Promise<CarDTO[]> {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener los coches");
    return await res.json();
  } catch (err) {
    console.error("[HTTP] getAll error:", err);
    throw err;
  }
}

/**
 * POST /cars
 */
export async function create(car: CarDTO): Promise<CarDTO> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    if (!res.ok) throw new Error("Error al crear el coche");
    return await res.json();
  } catch (err) {
    console.error("[HTTP] create error:", err);
    throw err;
  }
}

/**
 * PUT /cars/:id
 */
export async function update(car: CarDTO): Promise<CarDTO> {
  try {
    const res = await fetch(`${API_URL}/${car.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    if (!res.ok) throw new Error("Error al actualizar el coche");
    return await res.json();
  } catch (err) {
    console.error("[HTTP] update error:", err);
    throw err;
  }
}

/**
 * DELETE /cars/:id
 */
export async function remove(id: number): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar el coche");
  } catch (err) {
    console.error("[HTTP] remove error:", err);
    throw err;
  }
}
