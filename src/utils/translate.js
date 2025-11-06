import OpenAI from 'openai';

export function translateFactory(key, getTranslated) {
    const translate = translatorFactory(key);

    async function getAllTranslated(text, locales) {
        return Promise.all(locales.map(locale => translate(text, locale)));
    }

    return async (availableLocales, text, locked) => {
        const langs = availableLocales.map(({ language, locale }) => ({ language, locale }));

        const translated = await getAllTranslated(text, langs);

        return requestToMap(translated, locked, getTranslated);
    };
}

function translatorFactory(key) {
    const openai = new OpenAI({
        apiKey: key,
        dangerouslyAllowBrowser: true // Required for browser-based extensions
    });

    return async (text, { locale, language }) => {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o', // Default model for translation
                messages: [
                    {
                        role: 'system',
                        content: `You are a professional translator. Translate the given en-US text to ${locale}. Return ONLY the translated text with no explanations or additional content.`
                    },
                    {
                        role: 'user',
                        content: text
                    }
                ],
                temperature: 0.3, // Lower temperature for more consistent translations
                max_tokens: 1000
            });

            const translatedText = response.choices[0].message.content.trim();

            return { text: translatedText, locale, language };
        } catch (error) {
            console.error(`Translation error for ${language}:`, error);
            
            if (error.status === 401) {
                throw new Error('Invalid API Key');
            }
            
            // Return empty on error
            return { text: '', locale, language };
        }
    };
}

function requestToMap(translated, locked, getTranslated) {
    return translated.reduce((acc, fetched) => {
        const complete = locked[fetched.locale]
            ? getTranslated(fetched.locale)
            : fetched.text;

        return Object.assign(acc, {
            [fetched.locale]: complete
        });
    }, {});
}