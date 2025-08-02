import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CarForm } from "@/ui/components/CarForm";
import { CarModel } from "@/domain/models/CarModel";

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

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "Tiguan",
      brand: "Volkswagen",
      year: 2023,
      horsepower: 150,
      fuelType: "Gasoline",
    } as Partial<CarModel>);
  });
});
