import { useEffect, useState, Suspense, lazy } from "react";
import { CarsTableSkeleton } from "@/ui/components/skeletons/CarsTableSkeleton";
import { fetchCarsUseCase } from "@/application/use-cases/fetchCarsUseCase";
import { useCarStore } from "@/state/useCarStore";
import toast from "react-hot-toast";
import { toCarDTO } from "@/infrastructure/dto/carDTO";
import Button from "../components/Button";
import { FormSkeleton } from "../components/skeletons/FormSkeleton";
const DataTable = lazy(() => import("@/ui/components/DataTable"));
const Modal = lazy(() => import("@/ui/components/Modal"));
const CarForm = lazy(() =>
  import("@/ui/components/CarForm").then((m) => ({ default: m.CarForm }))
);
export default function CarListPage() {
  const setCars = useCarStore((s) => s.setCars);
  const setLoading = useCarStore((s) => s.setLoading);
  const setError = useCarStore((s) => s.setError);
  const loading = useCarStore((s) => s.loading);
  const error = useCarStore((s) => s.error);

  const isFormOpen = useCarStore((s) => s.isFormOpen);
  const openForm = useCarStore((s) => s.openForm);
  const closeForm = useCarStore((s) => s.closeForm);
  const selectedCar = useCarStore((s) => s.selectedCar);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const cars = await fetchCarsUseCase();
        if (mounted) setCars(cars.map(toCarDTO));
      } catch (err) {
        console.error("Failed to load cars:", err);
        if (mounted) {
          setCars([]);
          setError("Error al cargar los coches");
          toast.error("Error al cargar los coches");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [setCars, setLoading, setError]);

  function DelayedForm({ ms = 300 }: { ms?: number }) {
    const [ready, setReady] = useState(!import.meta.env.DEV); // en prod no retrasamos
    useEffect(() => {
      if (!ready) {
        const t = setTimeout(() => setReady(true), ms);
        return () => clearTimeout(t);
      }
    }, [ready, ms]);
    return ready ? <CarForm /> : <FormSkeleton />;
  }

  return (
    <div className="bg-gray-900 lg:mx-12 pb-4">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center sticky top-0 z-10 bg-gray-900 py-6 border-b border-gray-500">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-12 space-y-2 lg:space-y-0">
          <img
            className="w-48 lg:w-72"
            src="https://assets.vw-mms.de/assets/images/cws/volkswagen_group_logo-YD6OYBJM.svg"
            alt="vw group logo"
          />
          <h1 className="hidden lg:inline-flex text-xl text-gray-100 font-bold">
            Catálogo Grupo Volkswagen
          </h1>
        </div>
        {!selectedCar && (
          <Button onClick={openForm} variant="primary" text="Añadir coche" />
        )}
      </div>

      {/* Datos: skeleton/error/tabla */}
      {loading ? (
        <CarsTableSkeleton rows={6} />
      ) : error ? (
        <div role="alert" className="p-4 text-red-400">
          {error}
        </div>
      ) : (
        // Code-splitting de la tabla
        <Suspense fallback={<CarsTableSkeleton rows={6} />}>
          <DataTable />
        </Suspense>
      )}

      {/* Modal lazy (code-splitting del contenedor) */}
      {isFormOpen && (
        <Suspense fallback={<FormSkeleton />}>
          <Modal onClose={closeForm}>
            <DelayedForm ms={600} />
          </Modal>
        </Suspense>
      )}
    </div>
  );
}
