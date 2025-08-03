import type { CarDTO } from "@/infrastructure/dto/carDTO";

type Props = {
  car: CarDTO;
};

export function CarShowcase({ car }: Props) {
  return (
    <div className="p-4 bg-gray-900 rounded shadow">
      <h2 className="text-xl font-semibold">{car.name}</h2>
      <p>
        <strong>Marca:</strong> {car.brand}
      </p>
      <p>
        <strong>Año:</strong> {car.year}
      </p>
      <p>
        <strong>Potencia:</strong> {car.horsepower} CV
      </p>
      <p>
        <strong>Combustible:</strong> {car.fuelType}
      </p>
    </div>
  );
}
