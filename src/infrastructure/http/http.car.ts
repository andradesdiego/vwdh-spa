import type { CarModel } from "@/domain/models/CarModel";
import { CarDTO } from "../dto/carDTO";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000" // JSON Server local
    : "/api"; // Vercel Function en PROD

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const DEV_DELAY = Number(import.meta.env.VITE_HTTP_DELAY_MS ?? 600);

/**
 * GET /cars
 */
export async function getAll(): Promise<CarDTO[]> {
  if (import.meta.env.DEV && DEV_DELAY > 0) await delay(DEV_DELAY);
  try {
    const res = await fetch(`${baseURL}/cars`);
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
    const res = await fetch(`${baseURL}/cars`, {
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
    const res = await fetch(`${baseURL}/cars/${car.id}`, {
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
    const res = await fetch(`${baseURL}/cars/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("API error");
  } catch (err) {
    console.error("[HTTP] remove error:", err);
    throw new Error("API error");
  }
}
