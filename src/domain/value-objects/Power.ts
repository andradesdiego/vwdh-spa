export class Power {
  private constructor(private readonly value: number) {}

  static create(value: number): Power {
    if (value <= 0) {
      throw new Error("Power must be a positive number.");
    }
    return new Power(value);
  }

  getValue(): number {
    return this.value;
  }

  toKilowatts(): number {
    return Math.round(this.value * 0.7355 * 100) / 100;
  }

  equals(other: Power): boolean {
    return this.value === other.getValue();
  }

  toString(): string {
    return `${this.value} CV`;
  }
}
