import React, { useEffect } from "react";
import ComponentA from "component-a";

import { getTranslations } from "../../i18nConfig";
import { useTranslation } from "translator";

export default function App(props) {
    const translations = getTranslations();

    const { title } = translations;

    const { i18n } = useTranslation();

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <section>
            <h1>{title}</h1>
            <ComponentA />
            <button onClick={() => changeLang("en")}>English</button>
            <button onClick={() => changeLang("zh")}>中文</button>
        </section>
    );
}
