import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { CarRow } from "./CarRow";
import { useCarStore } from "@/state/useCarStore";
import type { CarModel } from "@/domain/models/CarModel";

vi.mock("@/state/useCarStore", () => ({
  useCarStore: vi.fn(),
}));

const mockSelectCar = vi.fn();
const mockDeleteCar = vi.fn();

const car: CarModel = {
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
  test("renderiza los datos correctamente", () => {
    render(<CarRow car={car} />);
    expect(screen.getByText("T-Roc")).toBeInTheDocument();
    expect(screen.getByText("Volkswagen")).toBeInTheDocument();
  });

  test("selecciona coche al hacer clic en la fila", () => {
    render(<CarRow car={car} />);
    fireEvent.click(screen.getByText("T-Roc"));
    expect(mockSelectCar).toHaveBeenCalledWith(car);
  });

  test("elimina coche al hacer clic en el icono", () => {
    global.confirm = vi.fn(() => true); // simula confirmación
    render(<CarRow car={car} />);
    fireEvent.click(screen.getByTitle("Eliminar"));
    expect(mockDeleteCar).toHaveBeenCalledWith(car.id);
  });
});
