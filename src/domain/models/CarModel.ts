import { Power } from "@/domain/value-objects/Power";

export type FuelType = "Gasoline" | "Diesel" | "Electric" | "Hybrid";

export interface CarModel {
  id: number;
  name: string;
  brand: string;
  year: number;
  fuelType: FuelType;
  horsepower: Power;
}
