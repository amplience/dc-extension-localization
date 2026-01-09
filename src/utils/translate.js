import OpenAI from "openai";

export function translateFactory(key, model, prompt, getTranslated) {
  const translate = translatorFactory(key, model, prompt);

  async function getAllTranslated(text, locales) {
    return Promise.all(locales.map((locale) => translate(text, locale)));
  }

  return async (availableLocales, text, locked) => {
    const langs = availableLocales.map(({ language, locale }) => ({
      language,
      locale,
    }));

    const translated = await getAllTranslated(text, langs);

    return requestToMap(translated, locked, getTranslated);
  };
}

function translatorFactory(key, gptModel = "gpt-4o", prompt) {
  const openai = new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true, // Required for browser-based extensions
  });

  return async (text, { locale, language }) => {
    const defaultPrompt = `You are a professional translator. Detect the input locale from the given content text and use this as the default locale. Translate the content text from the default locale to ${locale}. Return ONLY the translated text with no explanations or additional content. If the detected locale is the same as the required translation locale, use the content text as it was received.`;

    try {
      const response = await openai.chat.completions.create({
        model: gptModel, // Default model for translation
        messages: [
          {
            role: "system",
            content: prompt
              ? prompt.replace("${locale}", locale)
              : defaultPrompt,
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.3, // Lower temperature for more consistent translations
        max_tokens: 1000,
      });

      const translatedText = response.choices[0].message.content.trim();

      return { text: translatedText, locale, language };
    } catch (error) {
      console.error(`Translation error for ${language}:`, error);

      if (error.status === 401) {
        throw new Error("Invalid API Key");
      }

      // Return empty on error
      return { text: "", locale, language };
    }
  };
}

function requestToMap(translated, locked, getTranslated) {
  return translated.reduce((acc, fetched) => {
    const complete = locked[fetched.locale]
      ? getTranslated(fetched.locale)
      : fetched.text;

    return Object.assign(acc, {
      [fetched.locale]: complete,
    });
  }, {});
}
