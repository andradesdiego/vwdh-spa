import { CarModel } from "@/domain/models/CarModel";

const API_URL = "http://localhost:4000/cars";

export async function fetchCarsFromApi(): Promise<CarModel[]> {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("fetchCarsFromApi error:", error);
    throw error;
  }
}
