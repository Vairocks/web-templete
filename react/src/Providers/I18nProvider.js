import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

/*import support locale file here*/
import en from '../Assets/Locale/en.json';
import fr from '../Assets/Locale/fr.json';


const resources = {en, fr};
i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'fr',
        fallbackLng: 'en',
        keySeparator: false,
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;