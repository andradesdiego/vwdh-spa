import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { CarRow } from "./CarRow";
import { useCarStore } from "@/state/useCarStore";
import { deleteCarUseCase } from "@/application/use-cases/deleteCarUseCase";
import toast from "react-hot-toast";
import type { CarDTO } from "@/infrastructure/dto/carDTO";
import { type Mock } from "vitest";

// ✅ Mocks
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
const mockCar: CarDTO = {
  id: 1,
  name: "T-Roc",
  brand: "Volkswagen",
  year: 2021,
  fuelType: "Gasoline",
  horsepower: 150,
};

// Variables para los mocks del store
const mockSelectCar = vi.fn();
const mockDeleteCar = vi.fn();
const mockShowConfirmDialog = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  (useCarStore as any).mockImplementation((selector: any) =>
    selector({
      selectCar: mockSelectCar,
      deleteCar: mockDeleteCar,
      showConfirmDialog: mockShowConfirmDialog,
      selectedCar: null,
    })
  );
});

describe("CarRow", () => {
  test("renders car data correctly", () => {
    render(
      <table>
        <tbody>
          <CarRow car={mockCar} />
        </tbody>
      </table>
    );
    expect(screen.getByText("T-Roc")).toBeInTheDocument();
    expect(screen.getByText("Volkswagen")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("Gasoline")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  test("calls selectCar when row is clicked", () => {
    render(
      <table>
        <tbody>
          <CarRow car={mockCar} />
        </tbody>
      </table>
    );
    fireEvent.click(screen.getByRole("row"));
    expect(mockSelectCar).toHaveBeenCalledWith(mockCar);
  });

  test("calls deleteCarUseCase and deleteCar on confirmation", async () => {
    // Simula la confirmación del usuario: ejecuta la callback directamente
    mockShowConfirmDialog.mockImplementation((_msg, callback) => callback());

    (deleteCarUseCase as Mock).mockResolvedValueOnce(undefined);

    render(
      <table>
        <tbody>
          <CarRow car={mockCar} />
        </tbody>
      </table>
    );
    fireEvent.click(screen.getByTitle("Eliminar"));

    await waitFor(() => {
      expect(deleteCarUseCase).toHaveBeenCalledWith(1);
      expect(mockDeleteCar).toHaveBeenCalledWith(1);
      expect(toast.success).toHaveBeenCalledWith(
        "Coche T-Roc eliminado correctamente"
      );
    });
  });

  test("shows error toast if deleteCarUseCase fails", async () => {
    mockShowConfirmDialog.mockImplementation((_msg, callback) => callback());

    (deleteCarUseCase as Mock).mockRejectedValueOnce(new Error("Error"));

    render(
      <table>
        <tbody>
          <CarRow car={mockCar} />
        </tbody>
      </table>
    );
    fireEvent.click(screen.getByTitle("Eliminar"));

    await waitFor(() => {
      expect(deleteCarUseCase).toHaveBeenCalledWith(1);
      expect(toast.error).toHaveBeenCalledWith("Error al eliminar el coche");
    });
  });

  test("opens confirmation dialog when delete is clicked", () => {
    render(
      <table>
        <tbody>
          <CarRow car={mockCar} />
        </tbody>
      </table>
    );
    fireEvent.click(screen.getByTitle("Eliminar"));
    expect(mockShowConfirmDialog).toHaveBeenCalledWith(
      expect.stringContaining("¿Eliminar T-Roc?"),
      expect.any(Function)
    );
  });
});
