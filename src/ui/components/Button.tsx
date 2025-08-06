import React from "react";

// Definir tipos para las props
type ButtonProps = {
  onClick: () => void; // Función que se ejecuta al hacer clic
  text?: string; // Texto del botón, opcional
  variant?: "primary" | "secondary"; // Variantes disponibles
};

const Button: React.FC<ButtonProps> = ({
  onClick,

  text = "Añadir coche",
  variant = "primary", // Variante predeterminada será 'primary'
}) => {
  // Clases para la variante primaria
  const primaryClasses =
    "px-4 py-2 bg-secondary text-brand border rounded border-secondary hover:bg-gray-700 hover:border-secondary hover:text-secondary transition-colors duration-200 text-sm font-semibold shadow-md";

  // Clases para la variante secundaria
  const secondaryClasses =
    "px-4 py-2 bg-gray-800 text-white shadow-md hover:bg-gray-700 hover:text-secondary border rounded border-secondary transition-colors duration-200 text-sm font-semibold shadow-md";

  // Seleccionamos las clases según la variante
  const buttonClasses =
    variant === "primary" ? primaryClasses : secondaryClasses;

  return (
    <button onClick={onClick} className={`${buttonClasses}`}>
      {text}
    </button>
  );
};

export default Button;
