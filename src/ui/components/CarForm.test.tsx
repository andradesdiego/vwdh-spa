import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CarForm } from "@/ui/components/CarForm";
import { CarModel } from "@/domain/models/CarModel";
import { useCarStore } from "@/state/useCarStore";
import user from "@testing-library/user-event";
import * as updateModule from "@/application/use-cases/updateCarUseCase";
import toast from "react-hot-toast";

describe("CarForm", () => {
  it("renders and submits form with user input", async () => {
    const mockSubmit = vi.fn();

    render(<CarForm onSubmit={mockSubmit} />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/nombre/i), "Tiguan");
    await user.type(screen.getByLabelText(/marca/i), "Volkswagen");
    await user.type(screen.getByLabelText(/año/i), "2023");
    await user.type(screen.getByLabelText(/potencia/i), "150");
    await user.selectOptions(screen.getByLabelText(/combustible/i), "Gasoline");

    await user.click(screen.getByRole("button", { name: /guardar/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: "Tiguan",
        brand: "Volkswagen",
        year: 2023,
        horsepower: 150,
        fuelType: "Gasoline",
      } as Partial<CarModel>);
    });
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});

// 🧪 Mock el toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("CarForm – edición", () => {
  it("permite editar un coche y llama al use case con los datos nuevos", async () => {
    const selectedCar = {
      id: 1,
      name: "Golf",
      brand: "Volkswagen",
      year: 2020,
      horsepower: 150,
      fuelType: "Gasoline" as CarModel["fuelType"],
    };

    const updatedCar = { ...selectedCar, name: "Golf GTI" };

    // 1. Establecer el coche seleccionado en el estado antes de renderizar
    useCarStore.setState({ selectedCar });

    // 2. Mockear el use case
    const spy = vi
      .spyOn(updateModule, "updateCarUseCase")
      .mockResolvedValue(updatedCar);

    // 3. Renderizar el formulario
    render(<CarForm />);

    // 4. Modificar el campo "Nombre"
    const nameInput = screen.getByLabelText(/nombre/i);
    await user.clear(nameInput);
    await user.type(nameInput, "Golf GTI");

    // 5. Enviar formulario
    const submit = screen.getByRole("button", { name: /actualizar/i });
    await user.click(submit);

    // 6. Esperar a que se llame al use case con el coche actualizado
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(updatedCar);
      expect(toast.success).toHaveBeenCalledWith("Coche actualizado con éxito");
    });
  });
});
