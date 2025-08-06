import React from "react";

type ButtonProps = {
  onClick: () => void;
  text?: string;
  variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({
  onClick,

  text = "Añadir coche",
  variant = "primary",
}) => {
  const primaryClasses =
    "px-4 py-2 bg-secondary text-brand border rounded border-secondary hover:bg-gray-700 hover:border-secondary hover:text-secondary transition-colors duration-200 text-sm font-semibold shadow-md";

  const secondaryClasses =
    "px-4 py-2 bg-gray-800 text-white shadow-md hover:bg-gray-700 hover:text-secondary border rounded border-secondary transition-colors duration-200 text-sm font-semibold shadow-md";

  const buttonClasses =
    variant === "primary" ? primaryClasses : secondaryClasses;

  return (
    <button onClick={onClick} className={`${buttonClasses}`}>
      {text}
    </button>
  );
};

export default Button;
