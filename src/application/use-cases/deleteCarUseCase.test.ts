import { describe, it, expect, vi } from "vitest";
import { deleteCarUseCase } from "@/application/use-cases/deleteCarUseCase";
import * as api from "@/infrastructure/api/carApi";

describe("deleteCarUseCase", () => {
  it("should call deleteCarInApi with the correct ID", async () => {
    const mockId = 42;

    const spy = vi.spyOn(api, "deleteCarInApi").mockResolvedValue(undefined);

    await deleteCarUseCase(mockId);

    expect(spy).toHaveBeenCalledWith(mockId);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
