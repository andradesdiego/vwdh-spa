// src/ui/components/CarForm.tsx
import { useEffect, useState } from "react";
import { useCarStore } from "@/state/useCarStore";
import type { CarModel } from "@/domain/models/CarModel";
import { createCarUseCase } from "@/application/use-cases/createCarUseCase"; // V1
import { updateCarUseCase } from "@/application/use-cases/updateCarUseCase"; // V1
import { Power } from "@/domain/value-objects/Power";
import Button from "./Button";
import toast from "react-hot-toast";

interface CarFormProps {
  onSubmit?: (data: Partial<CarModel>) => void;
}

export function CarForm({ onSubmit }: CarFormProps) {
  // Store actions (V1 + V2)
  const mode = useCarStore(
    (s) => s.mode ?? (import.meta.env.VITE_USE_ENTITY === "true" ? "v2" : "v1")
  );
  const addCar = useCarStore((s) => s.addCar); // V1 (sync)
  const updateCar = useCarStore((s) => s.updateCar); // V1 (sync)
  const createV2 = useCarStore((s) => s.create); // V2 (async)
  const saveV2 = useCarStore((s) => s.save); // V2 (async)

  const selectedCar = useCarStore((s) => s.selectedCar);
  const clearSelection = useCarStore((s) => s.clearSelection);
  const closeForm = useCarStore((s) => s.closeForm);

  // Estado del formulario (inputs controlados como string para comodidad)
  const [form, setForm] = useState({
    name: "",
    brand: "",
    year: "",
    fuelType: "Gasoline" as CarModel["fuelType"],
    horsepower: "",
  });

  const resetForm = () =>
    setForm({
      name: "",
      brand: "",
      year: "",
      fuelType: "Gasoline",
      horsepower: "",
    });

  // Cargar datos al editar (usar VO.getValue() para el input numérico)
  useEffect(() => {
    if (selectedCar) {
      setForm({
        name: selectedCar.name,
        brand: selectedCar.brand,
        year: String(selectedCar.year),
        fuelType: selectedCar.fuelType,
        horsepower: String(selectedCar.horsepower.getValue()),
      });
    } else {
      resetForm();
    }
  }, [selectedCar]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación simple
    const yearNum = Number(form.year);
    const hpNum = Number(form.horsepower);
    const currentYear = new Date().getFullYear();
    if (
      !form.name.trim() ||
      !form.brand.trim() ||
      !form.year ||
      !form.horsepower ||
      Number.isNaN(yearNum) ||
      Number.isNaN(hpNum) ||
      yearNum < 1950 ||
      yearNum > currentYear + 1 ||
      hpNum <= 0
    ) {
      alert("Por favor, completa todos los campos con valores válidos.");
      return;
    }

    // Modelo listo para V1 (CarModel)
    const data: Omit<CarModel, "id"> = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      year: yearNum,
      fuelType: form.fuelType,
      horsepower: Power.create(hpNum),
    };

    try {
      if (selectedCar) {
        // EDITAR
        if (mode === "v2" && saveV2) {
          // V2: store gestiona optimistic update + repo
          await saveV2({ ...selectedCar, ...data });
        } else {
          // V1: use-case + sync store
          const updatedCar = await updateCarUseCase({
            ...selectedCar,
            ...data,
          });
          updateCar(updatedCar);
        }
        toast.success("Coche actualizado con éxito");
      } else {
        // CREAR
        if (mode === "v2" && createV2) {
          await createV2(data);
        } else {
          const createdCar = await createCarUseCase(data);
          addCar(createdCar);
        }
        toast.success("Coche añadido con éxito");
      }

      onSubmit?.(data);
      clearSelection();
      resetForm();
      closeForm();
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar el coche");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 py-4 rounded bg-gray-900"
    >
      <h2 className="px-4 text-lg font-semibold">
        {selectedCar
          ? `Editar coche: ${selectedCar.name}`
          : "Añadir nuevo coche"}
      </h2>

      <fieldset
        className="space-y-4 gap-2 p-2 rounded"
        aria-describedby="form-description"
      >
        <legend id="form-description" className="sr-only">
          Formulario para crear o editar un coche
        </legend>

        <label htmlFor="brand" className="block text-sm text-white">
          Marca
        </label>
        <input
          autoFocus
          id="brand"
          name="brand"
          placeholder="Ej: Volkswagen"
          autoComplete="organization"
          value={form.brand}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white w-full shadow-md"
          required
        />

        <label htmlFor="name" className="block text-sm text-white">
          Modelo
        </label>
        <input
          id="name"
          name="name"
          placeholder="Ej: Golf"
          autoComplete="off"
          value={form.name}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white w-full shadow-md"
          required
        />

        <label htmlFor="year" className="block text-sm text-white">
          Año
        </label>
        <input
          id="year"
          name="year"
          type="number"
          placeholder="2020"
          value={form.year}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white w-full shadow-md"
          required
          min={1950}
          max={new Date().getFullYear() + 1}
        />

        <label htmlFor="horsepower" className="block text-sm text-white">
          Potencia (CV)
        </label>
        <input
          id="horsepower"
          name="horsepower"
          type="number"
          placeholder="Ej: 150"
          value={form.horsepower}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white w-full shadow-md"
          required
          min={30}
        />

        <label htmlFor="fuelType" className="block text-sm text-white">
          Tipo de combustible
        </label>
        <select
          id="fuelType"
          name="fuelType"
          value={form.fuelType}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white w-full shadow-md"
          required
        >
          <option value="Gasoline">Gasolina</option>
          <option value="Diesel">Diésel</option>
          <option value="Electric">Eléctrico</option>
          <option value="Hybrid">Híbrido</option>
        </select>
      </fieldset>

      <div className="flex gap-4 justify-center py-2 text-xs lg:text-sm">
        <button
          type="submit"
          className="px-4 py-2 bg-secondary text-brand border rounded border-secondary hover:bg-gray-700 hover:border-secondary hover:text-secondary transition-colors duration-200 text-sm font-semibold shadow-md"
        >
          {selectedCar ? "Actualizar" : "Guardar"}
        </button>
        <Button onClick={closeForm} variant="secondary" text="Cerrar" />
      </div>
    </form>
  );
}
