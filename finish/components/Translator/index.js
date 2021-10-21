import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

const fallbackLng = "en";

const activeLang = "en";

i18n.use(initReactI18next) // passes i18n down to react-i18next
    // .use(LanguageDetector)
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                common: {
                    "Welcome to React": "Welcome to React and react-i18next",
                },
            },
        },
        defaultNS: "common",
        lng: activeLang, // if you're using a language detector, do not define the lng option
        fallbackLng: fallbackLng,
        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
        react: {
            bindI18n: "languageChanged",
            bindI18nStore: "added",
            useSuspense: true,
        },
    });

export default i18n;

export const init = (resources) => {
    return i18n.addResourceBundle(activeLang, "common", resources, true, true);
};

export const importTranslation = (conf) => {
    const { namespace, dictionary } = conf;

    let lang, translation;

    if (dictionary[activeLang]) {
        lang = activeLang;

        translation = dictionary[activeLang];
    } else if (dictionary[fallbackLng]) {
        lang = fallbackLng;

        translation = dictionary[fallbackLng];
    }

    if (!i18n.hasResourceBundle(lang, namespace)) {
        i18n.addResourceBundle(lang, namespace, translation);
    }

    return namespace;
};

export const getText = (key, ns) => {
    const { t } = useTranslation();

    const nsKey = `${ns}:${key}`;
    const commonKey = `common:${key}`;

    return i18n.exists(nsKey)
        ? t(nsKey)
        : i18n.exists(commonKey)
        ? i18n.t(commonKey)
        : "";
};

export const getTranslations = (config, keys = []) => {
    // const ns = importTranslation(config);
    const ns = config.namespace;
    const result = {};

    const configKeys = config.keys || [];

    const items = [...configKeys, ...keys];

    items.forEach((item) => {
        result[item] = getText(item, ns);
    });

    return result;
};
