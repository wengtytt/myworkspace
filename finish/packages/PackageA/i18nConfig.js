import {
    importTranslation,
    importCommonTranslation,
    getTranslations as getTs,
} from "translator";

const configs = {
    namespace: "PackageA",
    keys: ["title", "test"],
    dictionary: {
        en: {
            title: "Sample container of the package A",
            test: "Some text for testing",
        },
        zh: { title: "在项目A中的样板容器", test: "一些测试用的文字" },
    },
};

importTranslation(configs);

const getTranslations = (keys = []) => {
    return getTs(configs, keys);
};

export default configs;

export { getTranslations };
importCommonTranslation(configs);
