// src/ui/pages/CarListPage.spec.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Power } from "@/domain/value-objects/Power";

// Mock del use case V1
vi.mock("@/application/use-cases/fetchCarsUseCase", () => ({
  fetchCarsUseCase: vi.fn(),
}));
import * as fetchUseCase from "@/application/use-cases/fetchCarsUseCase";

type CarModel = {
  id: number;
  name: string;
  brand: string;
  year: number;
  fuelType: "Gasoline" | "Diesel" | "Electric" | "Hybrid";
  horsepower: ReturnType<typeof Power.create>;
};

const mockCars: CarModel[] = [
  {
    id: 1,
    name: "Golf",
    brand: "Volkswagen",
    year: 2022,
    horsepower: Power.create(150),
    fuelType: "Gasoline",
  },
  {
    id: 2,
    name: "Ibiza",
    brand: "SEAT",
    year: 2021,
    horsepower: Power.create(150),
    fuelType: "Diesel",
  },
];

async function importStore() {
  const mod = await import("@/state/useCarStore");
  return mod.useCarStore;
}

async function importPage() {
  const mod = await import("@/ui/pages/CarListPage");
  return mod.default;
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("CarListPage - V1 (DTO path)", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.stubEnv("VITE_USE_ENTITY", "false");

    // Prepara el store base antes de renderizar
    const useCarStore = await importStore();
    useCarStore.setState({
      ...useCarStore.getState(),
      cars: [],
      loading: false,
      selectedCar: undefined,
      isFormOpen: false,
      // acciones mínimas que usa la página
      setCars: (cars: any[]) => useCarStore.setState({ cars }),
      selectCar: (car: any) => useCarStore.setState({ selectedCar: car }),
      clearSelection: () => useCarStore.setState({ selectedCar: undefined }),
      openForm: () => useCarStore.setState({ isFormOpen: true }),
      closeForm: () => useCarStore.setState({ isFormOpen: false }),
    });

    // Mock del use case V1 -> devuelve CarModel[]
    vi.mocked(fetchUseCase.fetchCarsUseCase).mockResolvedValueOnce(
      mockCars as any
    );
  });

  it("renders car list from fetchCarsUseCase (V1)", async () => {
    const CarListPage = await importPage();
    render(<CarListPage />);

    // espera a que aparezca el Golf
    const golfCell = await screen.findByText(/Golf/i);
    expect(golfCell).toBeInTheDocument();

    // localiza la fila que contiene "Golf" y aserta "150 CV" dentro de esa fila
    const rows = screen.getAllByRole("row");
    const golfRow = rows.find((r) => within(r).queryByText(/Golf/i));
    expect(golfRow).toBeTruthy();

    expect(
      within(golfRow as HTMLElement).getByText(/150\s*CV/i)
    ).toBeInTheDocument();
    expect(fetchUseCase.fetchCarsUseCase).toHaveBeenCalledTimes(1);
  });

  it("opens the modal when clicking 'Añadir coche' (V1)", async () => {
    const CarListPage = await importPage();
    render(<CarListPage />);

    const button = await screen.findByRole("button", {
      name: /añadir coche/i,
    });
    await userEvent.click(button);

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej:\s*Golf/i)).toBeInTheDocument();
  });
});

describe("CarListPage - V2 (Entity path)", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.stubEnv("VITE_USE_ENTITY", "true");

    const useCarStore = await importStore();

    // Configura load() para poblar el estado cuando la página lo llame
    useCarStore.setState({
      ...useCarStore.getState(),
      cars: [],
      loading: false,
      selectedCar: undefined,
      isFormOpen: false,
      setCars: (cars: any[]) => useCarStore.setState({ cars }), // no se usa en V2, pero lo dejamos
      selectCar: (car: any) => useCarStore.setState({ selectedCar: car }),
      clearSelection: () => useCarStore.setState({ selectedCar: undefined }),
      openForm: () => useCarStore.setState({ isFormOpen: true }),
      closeForm: () => useCarStore.setState({ isFormOpen: false }),
      load: async () => {
        useCarStore.setState({ cars: mockCars });
      },
    });
  });

  it("renders car list using store.load (V2) and does not call fetchCarsUseCase", async () => {
    const CarListPage = await importPage();
    render(<CarListPage />);

    expect(await screen.findByText("Golf")).toBeInTheDocument();
    expect(screen.getByText("Ibiza")).toBeInTheDocument();
    expect(screen.getAllByText("150 CV").length).toBeGreaterThan(0);

    // En V2 no debería llamarse el UC V1
    expect(fetchUseCase.fetchCarsUseCase).not.toHaveBeenCalled();
  });

  it("opens the modal when clicking 'Añadir coche' (V2)", async () => {
    const CarListPage = await importPage();
    render(<CarListPage />);

    const button = await screen.findByRole("button", {
      name: /añadir coche/i,
    });
    await userEvent.click(button);

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej:\s*Golf/i)).toBeInTheDocument();
  });
});
