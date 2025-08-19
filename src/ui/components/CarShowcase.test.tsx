import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { CarShowcase } from "./CarShowcase";
import type { CarDTO } from "@/infrastructure/dto/carDTO";
import { CarModel } from "@/domain/models/CarModel";
import { Power } from "@/domain/value-objects/Power";

const mockCar: CarModel = {
  id: 2,
  name: "ID.3",
  brand: "Volkswagen",
  year: 2024,
  fuelType: "Electric",
  horsepower: Power.create(204),
};

describe("CarShowcase", () => {
  test("renders all car fields from CarDTO", () => {
    render(<CarShowcase car={mockCar} />);

    expect(screen.getByText(/ID.3/)).toBeInTheDocument();
    expect(screen.getByText(/Volkswagen/)).toBeInTheDocument();
    expect(screen.getByText(/2024/)).toBeInTheDocument();
    expect(screen.getByText(/Electric/)).toBeInTheDocument();
    expect(screen.getByText(/204 CV/)).toBeInTheDocument();
  });
});
