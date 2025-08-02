import { useEffect } from "react";
import { useCarStore } from "@/state/useCarStore";
import { DataTable } from "@/ui/components/DataTable";

export default function CarListPage() {
  const fetchCars = useCarStore((state) => state.fetchCars);

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Catálogo Grupo Volkswagen</h1>
      <DataTable />
    </div>
  );
}
