import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import DataTable from "./DataTable";
import { useCarStore } from "@/state/useCarStore";
import { Power } from "@/domain/value-objects/Power";
import { toCarDTO, toDomainCar } from "@/infrastructure/dto/carDTO";
import { CarModel } from "@/domain/models/CarModel";

vi.mock("@/state/useCarStore", () => ({
  useCarStore: vi.fn(),
}));

describe("DataTable", () => {
  test('muestra "cargando" cuando está cargando', () => {
    (useCarStore as any).mockImplementation((selector: any) =>
      selector({ loading: true, cars: [], selectedCar: undefined })
    );
    render(<DataTable />);
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  test('muestra "no hay resultados" si la lista está vacía', () => {
    (useCarStore as any).mockImplementation((selector: any) =>
      selector({ loading: false, cars: [], selectedCar: undefined })
    );
    render(<DataTable />);
    expect(screen.getByText(/no hay resultados/i)).toBeInTheDocument();
  });

  test("muestra coches si están cargados", () => {
    const mockCar = {
      id: 1,
      name: "Golf",
      brand: "VW",
      year: 2022,
      fuelType: "Gasoline" as CarModel["fuelType"],
      horsepower: Power.create(150),
    };
    const mockCarDTO = toCarDTO(mockCar);
    (useCarStore as any).mockImplementation((selector: any) =>
      selector({
        loading: false,
        cars: [mockCarDTO],
        selectedCar: undefined,
      })
    );
    render(<DataTable />);
    expect(screen.getByText("Golf")).toBeInTheDocument();
  });
});
