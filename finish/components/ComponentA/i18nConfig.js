import { importTranslation, importCommonTranslation, getTranslations as getTs } from 'translator';
        
        const configs = {
  namespace: 'ComponentA',
  keys: [ 'title' ],
  dictionary: { en: { title: 'Sample Component A' }, zh: { title: '样本模块A' } }
}
        
        importTranslation(configs);

        const getTranslations = (keys = []) => {
            return getTs(configs, keys);
        };

        export default configs;

        export { getTranslations };
        