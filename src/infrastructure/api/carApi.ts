import type { CarModel } from "@/domain/models/CarModel";

export async function fetchCars(): Promise<CarModel[]> {
  const res = await fetch("http://localhost:3001/cars");
  if (!res.ok) throw new Error("Error fetching cars");
  return res.json();
}
