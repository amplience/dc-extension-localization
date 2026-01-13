import React from "react";

import { useInput } from "../hooks/useInput";
import { useLocked } from "../hooks/useLocked";
import { useLocales } from "../hooks/useLocales";
import { useReadOnly } from "../hooks/useReadOnly";
import { useTranslation } from "../hooks/useTranslate";

import { Input } from "./Input";
import { Button } from "./Button";
import { LocaleList } from "./LocaleList";

export function Localise({ locales, initalData }) {
  const { readOnly } = useReadOnly();
  const [searchText, onSearchTextChange] = useInput("");
  const { locked, setLockedLocale, lockAll, isLocked } = useLocked(locales);
  const { translate, translated, actions } = useTranslation(
    searchText,
    locked,
    lockAll,
    initalData
  );

  useLocales(translated);

  return (
    <React.Fragment>
      <Input
        value={searchText}
        disabled={readOnly}
        onChange={onSearchTextChange}
        multiline={true}
        label={"Type text to translate here"}
      />

      <Button
        onClick={translate}
        readOnly={readOnly || !searchText}
        label={"Click to translate"}
      />

      <LocaleList
        isLocked={isLocked}
        readOnly={readOnly}
        locales={locales}
        setLockedLocale={setLockedLocale}
        getTranslated={actions.getTranslated}
        updateTranslated={actions.updateTranslated}
      />
    </React.Fragment>
  );
}
