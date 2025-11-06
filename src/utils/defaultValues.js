export function defaultValues(locales, initalValue) {
    const values = locales.reduce((acc, value) => {
        if (initalValue && initalValue.values && initalValue.values.length) {
            const found = initalValue.values.find(
                ({ locale }) => value.locale === locale
            );

            const text = found ? found.value : '';

            return Object.assign(acc, { [value.locale]: text });
        }

        return Object.assign(acc, { [value.locale]: '' });
    }, {});

    return values;
}
