import type { CarModel } from "@/domain/models/CarModel";
import { useCarStore } from "@/state/useCarStore";

export function CarShowcase({ car }: { car: CarModel }) {
  const clearSelection = useCarStore((s) => s.clearSelection);

  return (
    <div className="mt-6 p-4 rounded border bg-white shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{car.name}</h2>
        <button
          onClick={clearSelection}
          className="text-sm text-blue-600 hover:underline"
        >
          Cerrar
        </button>
      </div>
      <ul className="text-sm text-gray-700 space-y-1">
        <li>
          <strong>Marca:</strong> {car.brand}
        </li>
        <li>
          <strong>Año:</strong> {car.year}
        </li>
        <li>
          <strong>Tipo de combustible:</strong> {car.fuelType}
        </li>
        <li>
          <strong>Potencia:</strong> {car.horsepower} CV
        </li>
        <li>
          <strong>ID:</strong> {car.id}
        </li>
      </ul>
    </div>
  );
}
