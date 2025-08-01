import { useEffect } from "react";
import { useCarStore } from "@/state/useCarStore";

export default function CarListPage() {
  const cars = useCarStore((state) => state.cars);
  const loading = useCarStore((state) => state.loading);
  const fetchCars = useCarStore((state) => state.fetchCars);

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Catálogo Grupo Volkswagen</h1>

      {loading ? (
        <p className="text-gray-500">Cargando vehículos...</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {cars.map((car) => (
            <li
              key={car.id}
              className="p-4 border rounded shadow-sm bg-gray-800"
            >
              <h2 className="text-lg font-semibold">{car.name}</h2>
              <p className="text-sm text-gray-400">
                {car.brand} - {car.year}
              </p>
              <p className="text-sm text-gray-200">
                {car.fuelType} — {car.horsepower} CV
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
