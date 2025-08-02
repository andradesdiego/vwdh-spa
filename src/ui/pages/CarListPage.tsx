import { useEffect } from "react";
import { useCarStore } from "@/state/useCarStore";
import { DataTable } from "@/ui/components/DataTable";
import { CarForm } from "@/ui/components/CarForm";

export default function CarListPage() {
  const fetchCars = useCarStore((state) => state.fetchCars);

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Catálogo Grupo Volkswagen</h1>
      <DataTable />
      <CarForm />
    </div>
  );
}
