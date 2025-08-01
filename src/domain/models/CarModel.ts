export type CarModel = {
  id: number;
  name: string;
  brand: string;
  year: number;
  fuelType: "Gasoline" | "Diesel" | "Electric" | "Hybrid";
  horsepower: number;
};
