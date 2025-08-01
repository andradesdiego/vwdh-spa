export type VWBrand =
  | "Volkswagen"
  | "Audi"
  | "SEAT"
  | "Škoda"
  | "Porsche"
  | "Cupra";
export type FuelType = "Gasoline" | "Diesel" | "Electric" | "Hybrid";

export interface CarModel {
  id: number;
  name: string;
  brand: VWBrand;
  year: number;
  fuelType: FuelType;
  horsepower: number;
}
