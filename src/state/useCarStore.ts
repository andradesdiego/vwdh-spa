// src/state/useCarStore.ts
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
  error: string | null;
  selectedCar?: CarDTO;

  // setters ya existentes
  setCars: (cars: CarDTO[]) => void;
  selectCar: (car: CarDTO) => void;
  clearSelection: () => void;
  addCar: (car: CarDTO) => void;
  updateCar: (car: CarDTO) => void;
  deleteCar: (id: number) => void;

  // helpers de estado
  setLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;

  // form / modal
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;

  // confirm dialog
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
    error: null,
    selectedCar: undefined,

    setCars: (cars) => set({ cars }),
    setLoading: (v) => set({ loading: v }),
    setError: (msg) => set({ error: msg }),

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
      set({ confirmDialog: { visible: true, message, onConfirm, onCancel } }),
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
