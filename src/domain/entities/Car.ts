import { Power } from "@/domain/value-objects/Power";

export type FuelType = "Gasoline" | "Diesel" | "Electric" | "Hybrid";

export class Car {
  private constructor(
    private readonly _id: number | null,
    private readonly _name: string,
    private readonly _brand: string,
    private readonly _year: number,
    private readonly _fuelType: FuelType,
    private readonly _horsepower: Power
  ) {}

  // -------- Factory (valida invariantes) --------
  static create(params: {
    id?: number | null;
    name: string;
    brand: string;
    year: number;
    fuelType: FuelType;
    horsepower: Power | number;
  }): Car {
    const id = params.id ?? null;

    const name = Car.ensureName(params.name);
    const brand = Car.ensureBrand(params.brand);
    const year = Car.ensureYear(params.year);
    const fuelType = params.fuelType;

    const hp =
      typeof params.horsepower === "number"
        ? Power.create(params.horsepower)
        : params.horsepower;

    return new Car(id, name, brand, year, fuelType, hp);
  }

  // -------- Invariantes --------
  private static ensureName(value: string): string {
    const v = value?.trim();
    if (!v) throw new Error("Car.name must not be empty");
    if (v.length > 80) throw new Error("Car.name too long");
    return v;
    // (si quieres permitir solo [a-z0-9 -], valida aquí)
  }

  private static ensureBrand(value: string): string {
    const v = value?.trim();
    if (!v) throw new Error("Car.brand must not be empty");
    if (v.length > 50) throw new Error("Car.brand too long");
    return v;
  }

  private static ensureYear(value: number): number {
    const current = new Date().getFullYear();
    if (!Number.isInteger(value)) throw new Error("Car.year must be integer");
    if (value < 1950 || value > current + 1) {
      throw new Error(`Car.year out of range (1950..${current + 1})`);
    }
    return value;
  }

  // -------- Getters seguros (sin exponer mutaciones) --------
  get id(): number | null {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get brand(): string {
    return this._brand;
  }
  get year(): number {
    return this._year;
  }
  get fuelType(): FuelType {
    return this._fuelType;
  }
  get horsepower(): Power {
    return this._horsepower;
  }

  // -------- Comportamiento de dominio --------
  rename(newName: string): Car {
    return new Car(
      this._id,
      Car.ensureName(newName),
      this._brand,
      this._year,
      this._fuelType,
      this._horsepower
    );
  }

  rebrand(newBrand: string): Car {
    return new Car(
      this._id,
      this._name,
      Car.ensureBrand(newBrand),
      this._year,
      this._fuelType,
      this._horsepower
    );
  }

  withYear(newYear: number): Car {
    return new Car(
      this._id,
      this._name,
      this._brand,
      Car.ensureYear(newYear),
      this._fuelType,
      this._horsepower
    );
  }

  withPower(hp: number | Power): Car {
    const p = typeof hp === "number" ? Power.create(hp) : hp;
    return new Car(
      this._id,
      this._name,
      this._brand,
      this._year,
      this._fuelType,
      p
    );
  }

  isElectric(): boolean {
    return this._fuelType === "Electric" || this._fuelType === "Hybrid"; // ajusta si híbrido no cuenta
  }

  age(asOf: Date = new Date()): number {
    return Math.max(0, asOf.getFullYear() - this._year);
  }

  // -------- Serialización segura --------
  toPrimitives(): {
    id: number | null;
    name: string;
    brand: string;
    year: number;
    fuelType: FuelType;
    horsepower: number;
  } {
    return {
      id: this._id,
      name: this._name,
      brand: this._brand,
      year: this._year,
      fuelType: this._fuelType,
      horsepower: this._horsepower.getValue(),
    };
  }
}
