"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = exports.translateObject = exports.TRANSLATIONS = void 0;
exports.TRANSLATIONS = {
    sex: {
        en: { male: 'Male', female: 'Female', unknown: 'Unknown' },
        pl: { male: 'Mężczyzna', female: 'Kobieta', unknown: 'Nieznana' }
    },
    rider_level: {
        en: { freshman: 'Freshman', beginner: 'Beginner', medium: 'Medium', advanced: 'Advanced', semipro: 'Semi-professional', professional: 'Professional' },
        pl: { freshman: 'Świeżak', beginner: 'Początkujący', medium: 'Średniozaawansowany', advanced: 'Zaawansowany', semipro: 'Półprofesjonalny', professional: 'Zawodowiec' }
    },
    validity: {
        en: { low: 'Low', medium: 'Medium', high: 'High', very_high: 'Very high' },
        pl: { low: 'Niska', medium: 'Średnia', high: 'Wysoka', very_high: 'Bardzo wysoka' }
    }
    // Add more fields as needed (e.g., validity, rider_level)
};
const translateObject = (obj, fields, lang = 'pl') => {
    const translated = { ...obj };
    fields.forEach(field => {
        if (translated[field]) {
            translated[field] = (0, exports.translate)(field, translated[field], lang);
        }
    });
    return translated;
};
exports.translateObject = translateObject;
const translate = (field, value, lang = 'pl') => {
    // console.log(`Translating field: ${field}, value: ${value}, lang: ${lang}`);
    const fieldMap = exports.TRANSLATIONS[field];
    if (!fieldMap)
        return value; // Fallback to original value
    const langMap = fieldMap[lang] || fieldMap['pl']; // Default to Polish
    if (!langMap)
        return value; // Fallback if no language map
    return langMap[value] || langMap['unknown'] || value;
};
exports.translate = translate;
//# sourceMappingURL=translations.js.map