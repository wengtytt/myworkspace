import { importTranslation, importCommonTranslation, getTranslations as getTs } from 'translator';
        
        const configs = {
  namespace: 'PackageB',
  keys: [ 'title' ],
  dictionary: {
    en: { title: 'Sample container of the package B' },
    zh: { title: '在项目B中的样板容器' }
  }
}
        
        importTranslation(configs);

        const getTranslations = (keys = []) => {
            return getTs(configs, keys);
        };

        export default configs;

        export { getTranslations };
        importCommonTranslation(configs);