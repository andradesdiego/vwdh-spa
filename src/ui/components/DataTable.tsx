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
  const clearSelection = useCarStore((s) => s.clearSelection);

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
        className="text-white placeholder-gray-100 bg-gray-800 w-full p-2 rounded shadow-sm focus:outline focus:outline-secondary"
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
                        className="flex items-center justify-between w-full hover:text-secondary"
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
        {/* Desktop: panel lateral */}
        <div className="hidden lg:block w-1/3 pl-4">
          {selectedCar && <CarShowcase car={selectedCar} />}
        </div>

        {/* Mobile: ficha encima de tabla en modo modal deslizante */}
        {selectedCar && (
          <div className="lg:hidden fixed inset-0 z-40 bg-gray-900 overflow-auto px-4 py-6 animate-slide-in">
            {/* <button
              onClick={() => useCarStore.getState().clearSelection()}
              className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Cerrar
            </button> */}
            <div className="flex flex-col space-y-12">
              <button
                onClick={clearSelection}
                className="absolute top-2 right-3 text-secondary hover:text-sec_hover text-2xl font-light"
                aria-label="Cerrar"
              >
                &times;
              </button>
              <CarShowcase car={selectedCar} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
