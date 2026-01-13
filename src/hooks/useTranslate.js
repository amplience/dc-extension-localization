import { useState, useContext, useCallback, useMemo } from "react";
import { translateFactory } from "../utils/translate";
import { defaultValues } from "../utils/defaultValues";
import { ExtensionContext } from "../components/ExtensionProvider";

export function useTranslation(text, locked, lockAll, initalValue) {
  const sdk = useContext(ExtensionContext);

  const { locales, params } = sdk;
  const { installation } = params;
  const { available: availableLocales } = locales;

  const [translated, setTranslated] = useState(
    defaultValues(availableLocales, initalValue)
  );

  const getTranslated = useCallback(
    (locale) => {
      return translated[locale] || "";
    },
    [translated]
  );

  const translate = useMemo(
    () =>
      translateFactory(
        installation.TRANSLATION_API_KEY,
        installation.MODEL,
        installation.PROMPT,
        getTranslated
      ),
    [
      installation.TRANSLATION_API_KEY,
      installation.MODEL,
      installation.PROMPT,
      getTranslated,
    ]
  );

  const translateText = useCallback(async () => {
    if (!text) {
      return;
    }

    try {
      const translations = await translate(availableLocales, text, locked);

      setTranslated(translations);
      lockAll();
    } catch (e) {
      console.error("couldnt translate", e);
    }
  }, [translate, availableLocales, text, locked, lockAll]);

  const updateTranslated = useCallback(
    (locale, value) => {
      const updated = Object.assign({}, translated, { [locale]: value });

      setTranslated(updated);
    },
    [translated]
  );

  return {
    translated,
    translate: translateText,
    actions: { updateTranslated, getTranslated },
  };
}
