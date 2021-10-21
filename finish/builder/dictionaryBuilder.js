const path = require("path");
const fs = require("fs");
const glob = require("glob");
const util = require("util");

const rootFolder = path.resolve(__dirname, "..");

exports.buildDictionaries = () => {
    console.log("Building the dictionaries");
    const defaultLang = "en";
    const langs = ["en", "zh"];

    const translations = glob.sync(`${rootFolder}/**/_translations`, {
        dot: true,
    });

    translations.forEach((folder) => {
        const result = {};

        const p = folder.split("/");
        p.pop();

        const ns = p.pop();

        result["namespace"] = ns;

        const dictionary = {};

        fs.readdirSync(folder).forEach((item) => {
            const filename = path.resolve(folder, item);

            const lang = item.split(".")[0];

            if (langs.includes(lang)) {
                const data = fs.readFileSync(filename);
                const translations = JSON.parse(data);

                dictionary[lang] = translations;

                if (lang === defaultLang) {
                    result["keys"] = Object.keys(translations);
                }
            }
        });

        result["dictionary"] = dictionary;

        const configPath = p.join("/");
        const configFile = `${configPath}/${ns}/i18nConfig.js`;

        const contents = `import { importTranslation, getTranslations as getTs } from 'translator';
        
        const configs = ${util.inspect(result, {
            depth: "null",
        })}
        
        importTranslation(configs);

        const getTranslations = (keys = []) => {
            return getTs(configs, keys);
        };

        export default configs;

        export { getTranslations };
        `;

        const parsedContents = contents.replace(/('")|("')|(`")|("`)/g, "");

        fs.writeFileSync(configFile, parsedContents);
    });
};
