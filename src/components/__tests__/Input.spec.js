import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "../Input";
import { WithTheme } from "../../utils/withTheme";

const MockInput = (props) => (
  <WithTheme>
    <Input {...props} />
  </WithTheme>
);

describe("Input", () => {
  it("renders with the correct value", () => {
    render(<MockInput label="Hello" value="value" />);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("value");
    expect(input.tagName).toBe("INPUT");
  });

  it("renders a multiline textarea when multiline is true", () => {
    render(<MockInput label="Hello" value="value" multiline={true} />);

    const textarea = screen.getByRole("textbox");
    expect(textarea.value).toBe("value");
    expect(textarea.tagName).toBe("TEXTAREA");
  });
});
