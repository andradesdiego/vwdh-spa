import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CarForm } from "./CarForm";
import { useCarStore } from "@/state/useCarStore";
import React from "react";

// Mock Zustand store
vi.mock("@/state/useCarStore", async () => {
  const actual = await vi.importActual<typeof import("@/state/useCarStore")>(
    "@/state/useCarStore"
  );
  return {
    ...actual,
    useCarStore: vi.fn(),
  };
});

const mockAddCar = vi.fn();
const mockUpdateCar = vi.fn();
const mockClearSelection = vi.fn();

beforeEach(() => {
  // Reseteamos mocks
  mockAddCar.mockReset();
  mockUpdateCar.mockReset();
  mockClearSelection.mockReset();
});

describe("CarForm", () => {
  test("crea un coche nuevo correctamente", () => {
    // Mock modo creación (sin selectedCar)
    (useCarStore as any).mockImplementation((selector: any) =>
      selector({
        selectedCar: undefined,
        addCar: mockAddCar,
        updateCar: mockUpdateCar,
        clearSelection: mockClearSelection,
      })
    );

    render(<CarForm />);

    fireEvent.change(screen.getByPlaceholderText("Nombre"), {
      target: { value: "Golf" },
    });
    fireEvent.change(screen.getByPlaceholderText("Marca"), {
      target: { value: "Volkswagen" },
    });
    fireEvent.change(screen.getByPlaceholderText("Año"), {
      target: { value: "2022" },
    });
    fireEvent.change(screen.getByPlaceholderText("CV"), {
      target: { value: "245" },
    });

    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));

    expect(mockAddCar).toHaveBeenCalledWith({
      name: "Golf",
      brand: "Volkswagen",
      year: 2022,
      fuelType: "Gasoline",
      horsepower: 245,
    });

    expect(mockClearSelection).toHaveBeenCalled();
  });

  test("edita un coche existente correctamente", () => {
    const car = {
      id: 1,
      name: "A3",
      brand: "Audi",
      year: 2020,
      fuelType: "Diesel",
      horsepower: 150,
    };

    (useCarStore as any).mockImplementation((selector: any) =>
      selector({
        selectedCar: car,
        addCar: mockAddCar,
        updateCar: mockUpdateCar,
        clearSelection: mockClearSelection,
      })
    );

    render(<CarForm />);

    fireEvent.change(screen.getByPlaceholderText("Nombre"), {
      target: { value: "A3 Sportback" },
    });

    fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));

    expect(mockUpdateCar).toHaveBeenCalledWith({
      ...car,
      name: "A3 Sportback",
    });

    expect(mockClearSelection).toHaveBeenCalled();
  });

  test("muestra error si se envía vacío", () => {
    (useCarStore as any).mockImplementation((selector: any) =>
      selector({
        selectedCar: undefined,
        addCar: mockAddCar,
        updateCar: mockUpdateCar,
        clearSelection: mockClearSelection,
      })
    );

    render(<CarForm />);
    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));

    expect(mockAddCar).not.toHaveBeenCalled();
  });
});
