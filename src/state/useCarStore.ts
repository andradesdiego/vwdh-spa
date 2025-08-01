import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { CarModel } from "@/domain/models/CarModel";
import { fetchCarsUseCase } from "@/application/usecases/fetchCars";
import { CarModelRepositoryImpl } from "@/infrastructure/repositories/CarModelRepositoryImpl";

type CarStore = {
  cars: CarModel[];
  loading: boolean;
  fetchCars: () => Promise<void>;
};

export const useCarStore = create<CarStore>()(
  devtools((set) => ({
    cars: [],
    loading: false,
    fetchCars: async () => {
      set({ loading: true });
      try {
        const cars = await fetchCarsUseCase(CarModelRepositoryImpl);
        set({ cars });
      } finally {
        set({ loading: false });
      }
    },
  }))
);
