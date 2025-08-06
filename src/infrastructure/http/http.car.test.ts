import { describe, test, expect, vi, beforeEach } from "vitest";
import * as httpCar from "./http.car";
import { CarModel } from "@/domain/models/CarModel";
import { Power } from "@/domain/value-objects/Power";
import { toCarDTO } from "../dto/carDTO";

global.fetch = vi.fn();

const mockCar = {
  id: 1,
  name: "Golf",
  brand: "Volkswagen",
  year: 2022,
  fuelType: "Gasoline" as CarModel["fuelType"],
  horsepower: Power.create(150),
};

describe("http.car", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("getAll() devuelve lista de coches", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => [mockCar],
    } as Response);

    const result = await httpCar.getAll();
    expect(result).toEqual([mockCar]);
    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/cars");
  });

  test("create() envía POST con datos", async () => {
    const newCar = { ...mockCar, id: undefined };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockCar,
    } as Response);

    const result = await httpCar.create(newCar as any);
    expect(result).toEqual(mockCar);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/cars",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      })
    );
  });

  test("update() hace PUT con datos", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockCar,
    } as Response);

    const dto = toCarDTO(mockCar);

    const result = await httpCar.update(dto);

    expect(result).toEqual(mockCar);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/cars/1",
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify(dto),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });

  test("remove() hace DELETE", async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: true } as Response);

    await httpCar.remove(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/cars/1", {
      method: "DELETE",
    });
  });
});
