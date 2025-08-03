import type { CarDTO } from "@/infrastructure/dto/carDTO";
import { useCarStore } from "@/state/useCarStore";

type Props = {
  car: CarDTO;
};

export function CarShowcase({ car }: Props) {
  const clearSelection = useCarStore((s) => s.clearSelection);
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
      <button
        onClick={clearSelection}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        Cerrar
      </button>
    </div>
  );
}
