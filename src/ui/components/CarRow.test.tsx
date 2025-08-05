import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { CarRow } from "./CarRow";
import { useCarStore } from "@/state/useCarStore";
import type { CarDTO } from "@/infrastructure/dto/carDTO";
import * as httpCar from "@/infrastructure/http/http.car";

// Mock del store
vi.mock("@/state/useCarStore", () => ({
  useCarStore: vi.fn(),
}));

// Mock del módulo http
vi.mock("@/infrastructure/http/http.car", () => ({
  remove: vi.fn(),
}));

const mockSelectCar = vi.fn();
const mockDeleteCar = vi.fn();

const mockCar: CarDTO = {
  id: 1,
  name: "T-Roc",
  brand: "Volkswagen",
  year: 2021,
  fuelType: "Gasoline",
  horsepower: 150,
};

// Resetear mocks antes de cada test
beforeEach(() => {
  (useCarStore as any).mockImplementation((selector: any) =>
    selector({
      selectCar: mockSelectCar,
      deleteCar: mockDeleteCar,
    })
  );
  vi.clearAllMocks();
});

describe("CarRow", () => {
  test("renders car data correctly", () => {
    render(<CarRow car={mockCar} />);
    expect(screen.getByText("T-Roc")).toBeInTheDocument();
    expect(screen.getByText("Volkswagen")).toBeInTheDocument();
  });

  test("calls selectCar when row is clicked", () => {
    render(<CarRow car={mockCar} />);
    fireEvent.click(screen.getByText("T-Roc"));
    expect(mockSelectCar).toHaveBeenCalledWith(mockCar);
  });

  test("calls deleteCar when delete button is clicked with confirmation", async () => {
    global.confirm = vi.fn(() => true);
    vi.mocked(httpCar.remove).mockResolvedValue();

    render(<CarRow car={mockCar} />);
    fireEvent.click(screen.getByTitle("Eliminar"));

    await waitFor(() => {
      expect(httpCar.remove).toHaveBeenCalledWith(mockCar.id);
      expect(mockDeleteCar).toHaveBeenCalledWith(mockCar.id);
    });
  });

  test("does not call deleteCar if user cancels confirmation", async () => {
    global.confirm = vi.fn(() => false);

    render(<CarRow car={mockCar} />);
    fireEvent.click(screen.getByTitle("Eliminar"));

    await waitFor(() => {
      expect(httpCar.remove).not.toHaveBeenCalled();
      expect(mockDeleteCar).not.toHaveBeenCalled();
    });
  });

  test("handles error from httpCar.remove gracefully", async () => {
    global.confirm = vi.fn(() => true);
    vi.mocked(httpCar.remove).mockRejectedValue(new Error("API error"));

    render(<CarRow car={mockCar} />);
    fireEvent.click(screen.getByTitle("Eliminar"));

    await waitFor(() => {
      expect(httpCar.remove).toHaveBeenCalledWith(mockCar.id);
      expect(mockDeleteCar).not.toHaveBeenCalled(); // No se llama si la API falla
    });
  });
});
