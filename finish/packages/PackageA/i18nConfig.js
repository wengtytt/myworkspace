import { importTranslation, getTranslations as getTs } from 'translator';
        
        const configs = {
  namespace: 'PackageA',
  keys: [ 'showMore', 'viewAll' ],
  dictionary: { en: { showMore: 'Show more', viewAll: 'View all' } }
}
        
        importTranslation(configs);

        const getTranslations = (keys = []) => {
            return getTs(configs, keys);
        };

        export default configs;

        export { getTranslations };
        