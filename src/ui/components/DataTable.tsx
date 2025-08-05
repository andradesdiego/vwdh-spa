import { useState, useMemo } from "react";
import { CarShowcase } from "./CarShowcase";
import type { CarModel } from "@/domain/models/CarModel";
import { useCarStore } from "@/state/useCarStore";
import { CarRow } from "./CarRow";
import { AnimatePresence } from "framer-motion";

type SortKey = keyof CarModel;
type SortDirection = "asc" | "desc";

export function DataTable() {
  const cars = useCarStore((state) => state.cars);
  const loading = useCarStore((state) => state.loading);
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
    <div className="space-y-6 px-4 lg:px-0">
      <label htmlFor="search" className="sr-only">
        Buscar coches
      </label>
      <input
        id="search"
        type="text"
        placeholder="Buscar por cualquier campo..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-white placeholder-gray-100 bg-gray-800 w-full p-2 rounded shadow-sm focus:outline-secondary"
        aria-label="Buscar por cualquier campo"
      />

      <div className="flex">
        <div
          className={`${
            !selectedCar
              ? "min-w-full h-96 overflow-auto"
              : "w-3/4 flex-2 mr-4 h-96 overflow-auto"
          }`}
        >
          <table className="min-w-full text-left border-collapse">
            <thead className="text-sm text-gray-50 sticky top-0 z-10">
              <tr className="bg-gray-800 font-semibold text-gray-50">
                {[
                  ["brand", "Marca"],
                  ["name", "Modelo"],
                  ["year", "Año"],
                  ["fuelType", "Combustible"],
                  ["horsepower", "CV"],
                  ["actions", "Eliminar"],
                ].map(([key, label]) => (
                  <th
                    key={key}
                    scope="col"
                    className={`${
                      !["year", "fuelType"].includes(key)
                        ? "p-3"
                        : "md:table-cell hidden"
                    }`}
                  >
                    {label !== "Eliminar" ? (
                      <button
                        type="button"
                        onClick={() => handleSort(key as SortKey)}
                        className="flex items-center justify-between w-full hover:bg-gray-700 p-1 rounded focus:outline focus:outline-gray-400"
                        aria-label={`Ordenar por ${label}`}
                      >
                        <span>{label}</span>
                        <span>{renderSortArrow(key as SortKey)}</span>
                      </button>
                    ) : (
                      <span className="flex justify-center">{label}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    Cargando...
                  </td>
                </tr>
              ) : filteredAndSorted.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No hay resultados
                  </td>
                </tr>
              ) : (
                <AnimatePresence initial={false}>
                  {filteredAndSorted.map((car) => (
                    <CarRow key={car.id} car={car} />
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex-1">
          {selectedCar && <CarShowcase car={selectedCar} />}
        </div>
      </div>
    </div>
  );
}
