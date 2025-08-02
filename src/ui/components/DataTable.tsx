import { useState, useMemo } from "react";
import { useCarStore } from "@/state/useCarStore";
import type { CarModel } from "@/domain/models/CarModel";

export function DataTable() {
  const cars = useCarStore((state) => state.cars);
  const loading = useCarStore((state) => state.loading);

  const [query, setQuery] = useState("");

  const filteredCars = useMemo(() => {
    const q = query.toLowerCase();
    return cars.filter((car) =>
      Object.values(car).some((value) =>
        String(value).toLowerCase().includes(q)
      )
    );
  }, [cars, query]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Buscar por cualquier campo..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border rounded bg-gray-900 shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="p-3 border">Nombre</th>
              <th className="p-3 border">Marca</th>
              <th className="p-3 border">Año</th>
              <th className="p-3 border">Combustible</th>
              <th className="p-3 border">CV</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Cargando...
                </td>
              </tr>
            ) : filteredCars.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No hay resultados
                </td>
              </tr>
            ) : (
              filteredCars.map((car: CarModel) => (
                <tr
                  key={car.id}
                  className="hover:bg-gray-50 text-sm transition-colors"
                >
                  <td className="p-3 border">{car.name}</td>
                  <td className="p-3 border">{car.brand}</td>
                  <td className="p-3 border">{car.year}</td>
                  <td className="p-3 border">{car.fuelType}</td>
                  <td className="p-3 border">{car.horsepower}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
