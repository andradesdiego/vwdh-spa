import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { CarDTO } from "@/infrastructure/dto/carDTO";
import { toDomainCar } from "@/infrastructure/dto/carDTO"; // DTO -> CarModel (legacy)

import type { CarModel } from "@/domain/models/CarModel";

// === V2: Entidad/Repos/Use cases ===
import { CarApiRepositoryV2 } from "@/infrastructure/repositories/CarApiRepositoryV2";
import { listCars } from "@/application/use-cases/v2/listCars";
import { createCar as ucCreateCar } from "@/application/use-cases/v2/createCar";
import { updateCar as ucUpdateCar } from "@/application/use-cases/v2/updateCar";
import { removeCar as ucRemoveCar } from "@/application/use-cases/v2/removeCar";
import { entityToModel, modelToEntity } from "@/infrastructure/dto/carDTO"; // Entidad <-> CarModel
import { Power } from "@/domain/value-objects/Power";
import { CreateCarInput } from "@/application/use-cases/v2/createCar";

// Si quieres activar V2 por flag:
const USE_V2 = import.meta.env.VITE_USE_ENTITY === "true";

const repoV2 = new CarApiRepositoryV2();
const ucList = listCars(repoV2);
const ucCreate = ucCreateCar(repoV2);
const ucUpdate = ucUpdateCar(repoV2);
const ucRemove = ucRemoveCar(repoV2);

type ConfirmDialogState = {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

type CarStore = {
  // === Estado expuesto a la UI (dominio/UI, no DTO) ===
  cars: CarModel[];
  loading: boolean;
  selectedCar?: CarModel;
  mode?: "v1" | "v2"; // para UI legacy

  // === Actions sync (compatibilidad mientras migras UI) ===
  setCars: (cars: CarModel[] | CarDTO[]) => void;
  selectCar: (car: CarModel) => void;
  clearSelection: () => void;
  addCar: (car: CarModel) => void;
  updateCar: (car: CarModel) => void;
  deleteCar: (id: number) => void;

  // === Acciones async V2 (repos/UCs) ===
  load: () => Promise<void>;
  create: (input: CreateCarInput) => Promise<void>;
  save: (car: CarModel) => Promise<void>;
  remove: (id: number) => Promise<void>;

  // === UI ===
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;

  // === Confirm Dialog ===
  confirmDialog: ConfirmDialogState;
  showConfirmDialog: (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
  hideConfirmDialog: () => void;
};

// Helper: mapeo flexible DTO|Model -> Model
function normalizeToModel(items: (CarModel | CarDTO)[]): CarModel[] {
  if (!Array.isArray(items) || items.length === 0) return [];
  const looksLikeDTO = typeof (items[0] as any)?.horsepower === "number";
  return looksLikeDTO
    ? (items as CarDTO[]).map(toDomainCar)
    : (items as CarModel[]);
}

export const useCarStore = create<CarStore>()(
  devtools((set, get) => ({
    cars: [],
    loading: false,
    selectedCar: undefined,

    // =========================
    // Sync (compatibilidad)
    // =========================
    setCars: (cars) => set({ cars: normalizeToModel(cars) }),

    selectCar: (car) => set({ selectedCar: car }),
    clearSelection: () => set({ selectedCar: undefined }),

    addCar: (car) => set((state) => ({ cars: [...state.cars, car] })),

    updateCar: (updated) =>
      set((state) => ({
        cars: state.cars.map((c) => (c.id === updated.id ? updated : c)),
        selectedCar:
          state.selectedCar?.id === updated.id ? updated : state.selectedCar,
      })),

    deleteCar: (id) =>
      set((state) => ({
        cars: state.cars.filter((c) => c.id !== id),
        selectedCar:
          state.selectedCar?.id === id ? undefined : state.selectedCar,
      })),

    // =========================
    // Async V2 (repos + UCs)
    // =========================
    // Store actions (V1 + V2)
    mode: () => (import.meta.env.VITE_USE_ENTITY === "true" ? "v2" : "v1"),

    load: async () => {
      if (!USE_V2) return; // si aún no quieres activar V2
      set({ loading: true });
      try {
        const entities = await ucList();
        set({ cars: entities.map(entityToModel) });
      } finally {
        set({ loading: false });
      }
    },

    create: async (input) => {
      if (!USE_V2) return;
      set({ loading: true });
      try {
        // Optimistic: añade provisionalmente
        const tempModel: CarModel = {
          id: Math.floor(Math.random() * -1e9), // id temporal negativo
          name: input.name,
          brand: input.brand,
          year: input.year,
          fuelType: input.fuelType,
          horsepower: (
            await import("@/domain/value-objects/Power")
          ).Power.create(
            typeof input.horsepower === "number"
              ? input.horsepower
              : (input.horsepower as any).getValue?.() ?? input.horsepower
          ),
        };
        set((s) => ({ cars: [...s.cars, tempModel] }));

        const created = await ucCreate(input);
        const createdModel = entityToModel(created);

        // Reemplaza provisional por definitivo
        set((s) => ({
          cars: s.cars.map((c) => (c.id === tempModel.id ? createdModel : c)),
        }));
      } catch (e) {
        // rollback
        set((s) => ({ cars: s.cars.filter((c) => c.id >= 0) }));
        throw e;
      } finally {
        set({ loading: false });
      }
    },

    save: async (car) => {
      if (!USE_V2) return;
      set({ loading: true });
      const prev = get().cars;
      try {
        // Optimistic
        set((s) => ({
          cars: s.cars.map((c) => (c.id === car.id ? car : c)),
        }));

        const updated = await ucUpdate(modelToEntity(car));
        const updatedModel = entityToModel(updated);

        set((s) => ({
          cars: s.cars.map((c) => (c.id === car.id ? updatedModel : c)),
          selectedCar:
            s.selectedCar?.id === car.id ? updatedModel : s.selectedCar,
        }));
      } catch (e) {
        // rollback
        set({ cars: prev });
        throw e;
      } finally {
        set({ loading: false });
      }
    },

    remove: async (id) => {
      if (!USE_V2) return;
      set({ loading: true });
      const prev = get().cars;
      try {
        // Optimistic
        set((s) => ({
          cars: s.cars.filter((c) => c.id !== id),
          selectedCar: s.selectedCar?.id === id ? undefined : s.selectedCar,
        }));
        await ucRemove(id);
      } catch (e) {
        // rollback
        set({ cars: prev });
        throw e;
      } finally {
        set({ loading: false });
      }
    },

    // =========================
    // UI / Dialog
    // =========================
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
