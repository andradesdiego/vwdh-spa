import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import { vi } from "vitest";

describe("Button Component", () => {
  it("should render the button with the default text", () => {
    render(<Button onClick={() => {}} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Añadir coche");
  });

  it("should apply primary variant styles by default", () => {
    render(<Button onClick={() => {}} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-secondary");
    expect(button).toHaveClass("text-brand");
    expect(button).toHaveClass("border-secondary");
  });

  it("should apply secondary variant styles when 'secondary' is passed as variant", () => {
    render(<Button onClick={() => {}} variant="secondary" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gray-800");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("border-secondary");
  });

  it("should trigger onClick event when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
