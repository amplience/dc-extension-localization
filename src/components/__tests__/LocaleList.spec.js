import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LocaleList } from "../LocaleList";
import { WithTheme } from "../../utils/withTheme";

const MockLocaleList = (props) => (
  <WithTheme>
    <LocaleList {...props} />
  </WithTheme>
);

describe("LocaleList", () => {
  const locales = [{ locale: "en" }, { locale: "fr" }];

  it("renders inputs for all locales", () => {
    render(
      <MockLocaleList
        locales={locales}
        readOnly={false}
        isLocked={() => false}
        getTranslated={() => {}}
        setLockedLocale={() => {}}
        updateTranslated={() => {}}
      />
    );

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
  });

  it("calls updateTranslated on input change", () => {
    const isLocked = jest.fn(() => false);
    const getTranslated = jest.fn();
    const setLockedLocale = jest.fn();
    const updateTranslated = jest.fn();

    render(
      <MockLocaleList
        locales={locales}
        readOnly={false}
        isLocked={isLocked}
        getTranslated={getTranslated}
        setLockedLocale={setLockedLocale}
        updateTranslated={updateTranslated}
      />
    );

    const inputs = screen.getAllByRole("textbox");

    fireEvent.change(inputs[0], { target: { value: "hello" } });

    expect(inputs).toHaveLength(2);
    expect(updateTranslated).toHaveBeenCalledWith("en", "hello", false);
  });

  it("calls setLockedLocale when clicking lock icons", () => {
    const isLocked = jest.fn(() => false);
    const getTranslated = jest.fn();
    const setLockedLocale = jest.fn();
    const setLockedLocaleFactory = jest.fn((locale) => setLockedLocale);
    const updateTranslated = jest.fn();

    const { container } = render(
      <MockLocaleList
        locales={locales}
        readOnly={false}
        isLocked={isLocked}
        getTranslated={getTranslated}
        setLockedLocale={setLockedLocaleFactory}
        updateTranslated={updateTranslated}
      />
    );

    expect(setLockedLocaleFactory).toHaveBeenCalledWith("en");
    expect(setLockedLocaleFactory).toHaveBeenCalledWith("fr");

    const lockButtons = screen.getAllByLabelText("lock icon");

    fireEvent.click(lockButtons[0]);
    fireEvent.click(lockButtons[1]);

    expect(lockButtons).toHaveLength(locales.length);
    expect(setLockedLocale).toHaveBeenCalledTimes(2);
  });

  it("renders values from getTranslated", () => {
    const values = { en: "value1", fr: "value2" };
    const isLocked = jest.fn(() => false);
    const getTranslated = jest.fn((locale) => values[locale]);
    const setLockedLocale = jest.fn();
    const setLockedLocaleFactory = jest.fn((locale) => setLockedLocale);
    const updateTranslated = jest.fn();

    render(
      <MockLocaleList
        locales={locales}
        readOnly={false}
        isLocked={isLocked}
        getTranslated={getTranslated}
        setLockedLocale={setLockedLocaleFactory}
        updateTranslated={updateTranslated}
      />
    );

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);

    expect(inputs[0].value).toBe("value1");
    expect(inputs[1].value).toBe("value2");
  });
});
