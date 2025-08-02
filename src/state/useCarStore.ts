import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CarModel } from "@/domain/models/CarModel";

type CarStore = {
  cars: CarModel[];
  loading: boolean;
  selectedCar?: CarModel;
  selectCar: (car: CarModel) => void;
  clearSelection: () => void;
  addCar: (car: Omit<CarModel, "id">) => void;
  updateCar: (car: CarModel) => void;
  deleteCar: (id: number) => void;
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
  setCars: (cars: CarModel[]) => void;
};
export const useCarStore = create<CarStore>()(
  devtools((set, get) => ({
    cars: [],
    loading: false,
    selectedCar: undefined,

    setCars: (cars) => set({ cars }),
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
