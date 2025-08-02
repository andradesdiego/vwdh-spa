import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { fetchCarsUseCase } from "@/application/usecases/fetchCars";
import type { CarModel } from "@/domain/models/CarModel";
import { CarModelRepositoryImpl } from "@/infrastructure/repositories/CarModelRepositoryImpl";

type CarStore = {
  cars: CarModel[];
  loading: boolean;
  selectedCar?: CarModel;
  fetchCars: () => Promise<void>;
  selectCar: (car: CarModel) => void;
  clearSelection: () => void;
  addCar: (car: Omit<CarModel, "id">) => void;
  updateCar: (car: CarModel) => void;
  deleteCar: (id: number) => void;
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
};
export const useCarStore = create<CarStore>()(
  devtools((set, get) => ({
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
    addCar: (newCar) => {
      const nextId = get().cars.reduce((max, c) => Math.max(max, c.id), 0) + 1;
      const carWithId = { ...newCar, id: nextId };
      set((state) => ({ cars: [...state.cars, carWithId] }));
    },
    updateCar: (updated) =>
      set((state) => ({
        cars: state.cars.map((c) => (c.id === updated.id ? updated : c)),
        selectedCar: undefined,
      })),
    deleteCar: (id) =>
      set((state) => ({
        cars: state.cars.filter((c) => c.id !== id),
        selectedCar:
          state.selectedCar?.id === id ? undefined : state.selectedCar,
      })),
    isFormOpen: false,
    openForm: () => set({ isFormOpen: true }),
    closeForm: () => set({ isFormOpen: false, selectedCar: undefined }),
  }))
);
