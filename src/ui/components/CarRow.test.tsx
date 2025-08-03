import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { CarRow } from "./CarRow";
import { useCarStore } from "@/state/useCarStore";
import type { CarDTO } from "@/infrastructure/dto/carDTO";

vi.mock("@/state/useCarStore", () => ({
  useCarStore: vi.fn(),
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

(useCarStore as any).mockImplementation((selector: any) =>
  selector({
    selectCar: mockSelectCar,
    deleteCar: mockDeleteCar,
  })
);

describe("CarRow", () => {
  test("renders car data correctly", () => {
    render(<CarRow car={mockCar} />);
    expect(screen.getByText("T-Roc")).toBeInTheDocument();
    expect(screen.getByText("Volkswagen")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("Gasoline")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  test("calls selectCar when row is clicked", () => {
    render(<CarRow car={mockCar} />);
    fireEvent.click(screen.getByText("T-Roc"));
    expect(mockSelectCar).toHaveBeenCalledWith(mockCar);
  });

  test("calls deleteCar when delete button is clicked with confirmation", () => {
    global.confirm = vi.fn(() => true); // simulate confirm() returning true
    render(<CarRow car={mockCar} />);
    fireEvent.click(screen.getByTitle("Eliminar"));
    expect(mockDeleteCar).toHaveBeenCalledWith(mockCar.id);
  });
});
