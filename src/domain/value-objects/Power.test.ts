import { describe, it, expect } from "vitest";
import { Power } from "@/domain/value-objects/Power";

describe("Power Value Object", () => {
  it("should create a valid Power instance", () => {
    const power = Power.create(150);
    expect(power.getValue()).toBe(150);
  });

  it("should convert horsepower to kilowatts correctly", () => {
    const power = Power.create(100);
    expect(power.toKilowatts()).toBeCloseTo(73.55, 2); // redondeo a 2 decimales
  });

  it("should throw an error if value is zero or negative", () => {
    expect(() => Power.create(0)).toThrowError();
    expect(() => Power.create(-50)).toThrowError();
  });

  it("should compare equality of two Power objects", () => {
    const a = Power.create(200);
    const b = Power.create(200);
    const c = Power.create(180);

    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });

  it("should return a string representation with 'CV'", () => {
    const power = Power.create(123);
    expect(power.toString()).toBe("123 CV");
  });
});
