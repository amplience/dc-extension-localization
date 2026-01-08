import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Lock } from "../Lock";

const lockedPath =
  "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z";
const unlockedPath =
  "M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z";

describe("Lock", () => {
  it("renders locked icon", () => {
    const { container } = render(<Lock locked={true} locale="en" />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("d", lockedPath);
  });

  it("renders unlocked icon", () => {
    const { container } = render(<Lock locked={false} locale="en" />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("d", unlockedPath);
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    const { getByRole, container } = render(
      <Lock locked={false} onClick={onClick} locale="en" />
    );

    const button = getByRole("button", { name: /lock-en/i });
    fireEvent.click(button);

    const path = container.querySelector("path");
    expect(path).toHaveAttribute("d", unlockedPath);
    expect(onClick).toHaveBeenCalled();
  });
});
