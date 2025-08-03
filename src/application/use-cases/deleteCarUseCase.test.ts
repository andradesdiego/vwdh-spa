import { describe, it, expect, vi } from "vitest";
import { deleteCarUseCase } from "@/application/use-cases/deleteCarUseCase";
import { CarApiRepository } from "@/infrastructure/repositories/CarApiRepository";

describe("deleteCarUseCase", () => {
  it("should delete a car using the repository", async () => {
    const spy = vi.spyOn(CarApiRepository, "delete").mockResolvedValue();

    await deleteCarUseCase(1);

    expect(spy).toHaveBeenCalledWith(1);
  });
});
