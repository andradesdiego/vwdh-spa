import { useEffect, useState } from "react";
import { useCarStore } from "@/state/useCarStore";
import type { CarModel } from "@/domain/models/CarModel";
import { createCarUseCase } from "@/application/use-cases/createCarUseCase";
import toast from "react-hot-toast";
import { updateCarUseCase } from "@/application/use-cases/updateCarUseCase";
import { Power } from "@/domain/value-objects/Power";
import { toCarDTO } from "@/infrastructure/dto/carDTO";
import Button from "./Button";

interface CarFormProps {
  onSubmit?: (data: Partial<CarModel>) => void;
}

export function CarForm({ onSubmit }: CarFormProps) {
  const addCar = useCarStore((s) => s.addCar);
  const updateCar = useCarStore((s) => s.updateCar);
  const selectedCar = useCarStore((s) => s.selectedCar);
  const clearSelection = useCarStore((s) => s.clearSelection);
  const closeForm = useCarStore((s) => s.closeForm);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    year: "",
    fuelType: "Gasoline",
    horsepower: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      brand: "",
      year: "",
      fuelType: "Gasoline",
      horsepower: "",
    });
  };

  useEffect(() => {
    if (selectedCar) {
      setForm({
        name: selectedCar.name,
        brand: selectedCar.brand,
        year: String(selectedCar.year),
        fuelType: selectedCar.fuelType,
        horsepower: String(selectedCar.horsepower),
      });
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

    if (
      !form.name ||
      !form.brand ||
      !form.year ||
      !form.horsepower ||
      isNaN(Number(form.horsepower))
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const data: Omit<CarModel, "id"> = {
      name: form.name,
      brand: form.brand,
      year: Number(form.year),
      fuelType: form.fuelType as CarModel["fuelType"],
      horsepower: Power.create(Number(form.horsepower)),
    };

    try {
      if (selectedCar) {
        const updatedCar = await updateCarUseCase({ ...selectedCar, ...data });
        updateCar(toCarDTO(updatedCar));
        toast.success("Coche actualizado con éxito");
      } else {
        const createdCar = await createCarUseCase(data);
        addCar(toCarDTO(createdCar));
        toast.success("Coche añadido con éxito");
      }

      onSubmit?.(data);
      clearSelection();
      resetForm();
      closeForm();
    } catch (error) {
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
          min="1900"
          max={new Date().getFullYear()}
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
          min="30"
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

      {/* Botones */}
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
