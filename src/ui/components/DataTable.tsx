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

  // const renderSortArrow = (key: SortKey) =>
  //   sortDirection === "asc" ? "↑" : "↓";
  const renderSortArrow = (key: SortKey) =>
    sortKey === key ? (sortDirection === "asc" ? "↑" : "↓") : "";

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Buscar por cualquier campo..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-white placeholder-gray-100 bg-gray-900 w-full p-2 border rounded shadow-md focus:outline-gray-300"
      />

      <div className="overflow-x-auto rounded shadow-sm flex">
        <div className={`${!selectedCar ? "min-w-full" : "w-3/4 flex-2 mx-4"}`}>
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-500 text-sm text-gray-50">
              <tr className="bg-gray-500 text-left text-sm font-semibold text-gray-50">
                {[
                  ["name", "Nombre"],
                  ["brand", "Marca"],
                  ["year", "Año"],
                  ["fuelType", "Combustible"],
                  ["horsepower", "CV"],
                  ["actions", "Eliminar"],
                ].map(([key, label]) => (
                  <th
                    key={key}
                    className="p-3 cursor-pointer hover:bg-gray-600"
                    onClick={() => handleSort(key as SortKey)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{label}</span>
                      {label != "Eliminar" ? (
                        <span>{renderSortArrow(key as SortKey)}</span>
                      ) : null}
                    </div>
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
                <AnimatePresence>
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
