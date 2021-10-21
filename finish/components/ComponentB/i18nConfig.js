import { importTranslation, importCommonTranslation, getTranslations as getTs } from 'translator';
        
        const configs = {
  namespace: 'ComponentB',
  keys: [ 'title' ],
  dictionary: { en: { title: 'Sample Component B' }, zh: { title: '样本模块B' } }
}
        
        importTranslation(configs);

        const getTranslations = (keys = []) => {
            return getTs(configs, keys);
        };

        export default configs;

        export { getTranslations };
        