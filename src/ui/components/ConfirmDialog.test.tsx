import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ConfirmDialog } from "./ConfirmDialog";

const defaultProps = {
  message: "¿Estás seguro de eliminar esto?",
  onConfirm: vi.fn(),
  onCancel: vi.fn(),
};

describe("<ConfirmDialog />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra el mensaje y el título por defecto", () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(screen.getByText("Confirmar acción")).toBeInTheDocument();
    expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
  });

  it("usa el título personalizado si se pasa por props", () => {
    render(<ConfirmDialog {...defaultProps} title="Eliminar elemento" />);

    expect(screen.getByText("Eliminar elemento")).toBeInTheDocument();
  });

  it("llama a onConfirm al hacer click en el botón Confirmar", () => {
    render(<ConfirmDialog {...defaultProps} />);

    fireEvent.click(screen.getByText("Confirmar"));
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it("llama a onCancel al hacer click en el botón Cancelar", () => {
    render(<ConfirmDialog {...defaultProps} />);

    fireEvent.click(screen.getByText("Cancelar"));
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it("llama a onCancel al presionar la tecla Escape", () => {
    render(<ConfirmDialog {...defaultProps} />);

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });
});
