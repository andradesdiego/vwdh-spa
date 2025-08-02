import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { CarModel } from "@/domain/models/CarModel";
import { fetchCarsUseCase } from "@/application/usecases/fetchCars";
import { CarModelRepositoryImpl } from "@/infrastructure/repositories/CarModelRepositoryImpl";

type CarStore = {
  cars: CarModel[];
  loading: boolean;
  selectedCar?: CarModel;
  fetchCars: () => Promise<void>;
  selectCar: (car: CarModel) => void;
  clearSelection: () => void;
};

export const useCarStore = create<CarStore>()(
  devtools((set) => ({
    cars: [],
    loading: false,
    selectedCar: undefined,
    fetchCars: async () => {
      set({ loading: true });
      try {
        const cars = await fetchCarsUseCase(CarModelRepositoryImpl);
        set({ cars });
      } finally {
        set({ loading: false });
      }
    },
    selectCar: (car) => set({ selectedCar: car }),
    clearSelection: () => set({ selectedCar: undefined }),
  }))
);
