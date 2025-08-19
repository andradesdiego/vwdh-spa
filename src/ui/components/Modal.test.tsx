import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import { describe, test, expect, vi } from "vitest";

describe("Modal", () => {
  test("renderiza contenido y se cierra al hacer clic en ×", () => {
    const mockClose = vi.fn();

    render(
      <Modal onClose={mockClose}>
        <div>Contenido de prueba</div>
      </Modal>
    );

    expect(screen.getByText("Contenido de prueba")).toBeInTheDocument();
    fireEvent.click(screen.getByText("×"));
    expect(mockClose).toHaveBeenCalled();
  });
});
