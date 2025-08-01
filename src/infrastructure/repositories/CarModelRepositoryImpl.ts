import type { CarModel } from "@/domain/models/CarModel";

const mockCars: CarModel[] = [
  {
    id: 1,
    name: "Golf GTI",
    brand: "Volkswagen",
    year: 2023,
    fuelType: "Gasoline",
    horsepower: 245,
  },
  {
    id: 2,
    name: "Taycan Turbo S",
    brand: "Porsche",
    year: 2024,
    fuelType: "Electric",
    horsepower: 750,
  },
  {
    id: 3,
    name: "A3 Sportback",
    brand: "Audi",
    year: 2022,
    fuelType: "Diesel",
    horsepower: 150,
  },
  {
    id: 4,
    name: "Ibiza FR",
    brand: "SEAT",
    year: 2021,
    fuelType: "Gasoline",
    horsepower: 110,
  },
  {
    id: 5,
    name: "Enyaq iV",
    brand: "Škoda",
    year: 2023,
    fuelType: "Electric",
    horsepower: 204,
  },
  {
    id: 6,
    name: "Formentor VZ",
    brand: "Cupra",
    year: 2024,
    fuelType: "Hybrid",
    horsepower: 310,
  },
];

export const CarModelRepositoryImpl = {
  getAll: async (): Promise<CarModel[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCars), 500); // simulamos latencia
    });
  },
};
