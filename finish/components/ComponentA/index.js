import React from "react";
import { getTranslations } from "./i18nConfig";

export default function ComponentA(props) {
    // const title = "Sample Component A";
    // const { title } = getTranslations();
    const { title, test } = getTranslations(["test"]);

    return (
        <div
            style={{
                padding: "1rem",
            }}
        >
            <p>{title}</p>
            <p>{test}</p>
        </div>
    );
}
