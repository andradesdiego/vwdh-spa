import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CarDTO } from "@/infrastructure/dto/carDTO";

type ConfirmDialogState = {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

type CarStore = {
  cars: CarDTO[];
  loading: boolean;
  selectedCar?: CarDTO;
  selectCar: (car: CarDTO) => void;
  clearSelection: () => void;
  addCar: (car: CarDTO) => void;
  updateCar: (car: CarDTO) => void;
  deleteCar: (id: number) => void;
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
  setCars: (cars: CarDTO[]) => void;
  confirmDialog: ConfirmDialogState;
  showConfirmDialog: (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
  hideConfirmDialog: () => void;
};

export const useCarStore = create<CarStore>()(
  devtools((set, get) => ({
    cars: [],
    loading: false,
    selectedCar: undefined,

    setCars: (cars) => set({ cars }),
    selectCar: (car) => set({ selectedCar: car }),
    clearSelection: () => set({ selectedCar: undefined }),

    addCar: (car) => set((state) => ({ cars: [...state.cars, car] })),

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

    confirmDialog: {
      visible: false,
      message: "",
      onConfirm: () => {},
      onCancel: () => {},
    },
    showConfirmDialog: (message, onConfirm, onCancel = () => {}) =>
      set({
        confirmDialog: {
          visible: true,
          message,
          onConfirm,
          onCancel,
        },
      }),
    hideConfirmDialog: () =>
      set({
        confirmDialog: {
          visible: false,
          message: "",
          onConfirm: () => {},
          onCancel: () => {},
        },
      }),
  }))
);
