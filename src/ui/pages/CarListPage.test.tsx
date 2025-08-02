import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import CarListPage from "@/ui/pages/CarListPage";
import * as fetchUseCase from "@/application/use-cases/fetchCarsUseCase";
import { useCarStore } from "@/state/useCarStore";
import { CarModel } from "@/domain/models/CarModel";

// Mock de coches
const mockCars: CarModel[] = [
  {
    id: 1,
    name: "Golf",
    brand: "Volkswagen",
    year: 2022,
    horsepower: 245,
    fuelType: "Gasoline",
  },
  {
    id: 2,
    name: "Ibiza",
    brand: "SEAT",
    year: 2021,
    horsepower: 115,
    fuelType: "Diesel",
  },
];

vi.mock("@/application/use-cases/fetchCarsUseCase", () => ({
  fetchCarsUseCase: vi.fn(),
}));

describe("CarListPage", () => {
  beforeEach(() => {
    // Reset Zustand entre tests
    useCarStore.setState({
      cars: [],
      selectedCar: undefined,
      isFormOpen: false,
      setCars: (cars) => useCarStore.setState({ cars }),
      selectCar: (car) => useCarStore.setState({ selectedCar: car }),
      openForm: () => useCarStore.setState({ isFormOpen: true }),
      closeForm: () => useCarStore.setState({ isFormOpen: false }),
    });

    // Mockear la llamada al use case
    vi.mocked(fetchUseCase.fetchCarsUseCase).mockResolvedValue(mockCars);
  });

  it("renders car list from fetchCarsUseCase", async () => {
    render(<CarListPage />);

    await waitFor(() => {
      expect(screen.getByText("Golf")).toBeInTheDocument();
      expect(screen.getByText("Ibiza")).toBeInTheDocument();
      expect(screen.getByText("Catálogo Grupo Volkswagen")).toBeInTheDocument();
    });
  });
});
