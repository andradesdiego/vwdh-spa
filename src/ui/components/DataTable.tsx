import { useState, useMemo } from "react";
import { useCarStore } from "@/state/useCarStore";
import type { CarModel } from "@/domain/models/CarModel";
import { CarShowcase } from "./CarShowcase";

type SortKey = keyof CarModel;
type SortDirection = "asc" | "desc";

export function DataTable() {
  const cars = useCarStore((state) => state.cars);
  const loading = useCarStore((state) => state.loading);
  const selectCar = useCarStore((s) => s.selectCar);
  const selectedCar = useCarStore((s) => s.selectedCar);

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const filteredAndSorted = useMemo(() => {
    const q = query.toLowerCase();
    const filtered = cars.filter((car) =>
      Object.values(car).some((val) => String(val).toLowerCase().includes(q))
    );

    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return sorted;
  }, [cars, query, sortKey, sortDirection]);

  const renderSortArrow = (key: SortKey) =>
    sortKey === key ? (sortDirection === "asc" ? "↑" : "↓") : "";

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
              {[
                ["name", "Nombre"],
                ["brand", "Marca"],
                ["year", "Año"],
                ["fuelType", "Combustible"],
                ["horsepower", "CV"],
              ].map(([key, label]) => (
                <th
                  key={key}
                  className="p-3 border cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort(key as SortKey)}
                >
                  {label} {renderSortArrow(key as SortKey)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Cargando...
                </td>
              </tr>
            ) : filteredAndSorted.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No hay resultados
                </td>
              </tr>
            ) : (
              filteredAndSorted.map((car) => (
                <tr
                  key={car.id}
                  onClick={() => selectCar(car)}
                  className="hover:bg-gray-700 text-sm transition-colors"
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
        {selectedCar && <CarShowcase car={selectedCar} />}
      </div>
    </div>
  );
}
