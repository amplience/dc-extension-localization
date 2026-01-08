import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "../Button";

describe("Button", () => {
  it("renders with the correct label and is enabled by default", () => {
    render(<Button label="Hello" />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Hello");
    expect(button).not.toBeDisabled();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<Button label="Hello" onClick={onClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("is disabled if readOnly prop is true", () => {
    render(<Button label="Hello" readOnly={true} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
