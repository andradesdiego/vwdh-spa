import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CarRow } from "./CarRow";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { useCarStore } from "@/state/useCarStore";
import { deleteCarUseCase } from "@/application/use-cases/deleteCarUseCase";
import toast from "react-hot-toast";
import { CarDTO } from "@/infrastructure/dto/carDTO";
import { CarModel } from "@/domain/models/CarModel";
import { Power } from "@/domain/value-objects/Power";

// Mocks
vi.mock("@/state/useCarStore", () => ({
  useCarStore: vi.fn(),
}));

vi.mock("@/application/use-cases/deleteCarUseCase", () => ({
  deleteCarUseCase: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
  success: vi.fn(),
  error: vi.fn(),
}));

// Sample car
const sampleCar: CarModel = {
  id: 123,
  brand: "Audi",
  name: "A3 Sportback",
  year: 2021,
  fuelType: "Gasoline",
  horsepower: Power.create(140),
};

describe("<CarRow />", () => {
  const selectCar = vi.fn();
  const deleteCar = vi.fn();
  const showConfirmDialog = vi.fn();

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Zustand mock return values
    (useCarStore as any).mockImplementation((selector: any) =>
      selector({
        selectCar,
        deleteCar,
        selectedCar: null,
        showConfirmDialog,
      })
    );
  });

  it("renderiza los datos del coche correctamente", () => {
    render(
      <table>
        <tbody>
          <CarRow car={sampleCar} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Audi")).toBeInTheDocument();
    expect(screen.getByText("A3 Sportback")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("Gasoline")).toBeInTheDocument();
    expect(screen.getByText("140 CV")).toBeInTheDocument();
  });

  it("llama a selectCar al hacer click en la fila", () => {
    render(
      <table>
        <tbody>
          <CarRow car={sampleCar} />
        </tbody>
      </table>
    );

    const row = screen.getByRole("row");
    fireEvent.click(row);

    expect(selectCar).toHaveBeenCalledWith(sampleCar);
  });

  it("dispara el diálogo de confirmación al hacer click en el botón de eliminar", async () => {
    render(
      <table>
        <tbody>
          <CarRow car={sampleCar} />
        </tbody>
      </table>
    );

    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton);

    expect(showConfirmDialog).toHaveBeenCalledWith(
      expect.stringContaining("¿Eliminar Audi A3 Sportback?"),
      expect.any(Function)
    );
  });

  it("ejecuta deleteCarUseCase y muestra toast de éxito si se confirma", async () => {
    const confirmCallback = vi.fn();
    showConfirmDialog.mockImplementation((msg, cb) => cb());
    (deleteCarUseCase as any).mockResolvedValueOnce(undefined);

    render(
      <table>
        <tbody>
          <CarRow car={sampleCar} />
        </tbody>
      </table>
    );

    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteCarUseCase).toHaveBeenCalledWith(123);
      expect(deleteCar).toHaveBeenCalledWith(123);
      expect(toast.success).toHaveBeenCalledWith(
        "Coche A3 Sportback eliminado correctamente"
      );
    });
  });

  it("muestra toast de error si falla deleteCarUseCase", async () => {
    showConfirmDialog.mockImplementation((msg, cb) => cb());
    (deleteCarUseCase as any).mockRejectedValueOnce(new Error("API Error"));

    render(
      <table>
        <tbody>
          <CarRow car={sampleCar} />
        </tbody>
      </table>
    );

    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error al eliminar el coche");
    });
  });
});
