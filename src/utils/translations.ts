export interface TranslationMap {
  [key: string]: { [lang: string]: { [value: string]: string } };
}

export const TRANSLATIONS: TranslationMap = {
  sex: {
    en: { male: 'Male', female: 'Female', unknown: 'Unknown' },
    pl: { male: 'Mężczyzna', female: 'Kobieta', unknown: 'Nieznana' },
  },
  // Add more fields as needed (e.g., validity, rider_level)
};

export const translateObject = (obj: any, fields: string[], lang: string = 'pl'): any => {
  const translated = { ...obj };
  fields.forEach(field => {
    if (translated[field]) {
      translated[field] = translate(field, translated[field], lang);
    }
  });
  return translated;
};

export const translate = (field: string, value: string, lang: string = 'pl'): string => {
  
  console.log(`Translating field: ${field}, value: ${value}, lang: ${lang}`);
    const fieldMap = TRANSLATIONS[field];
  if (!fieldMap) return value; // Fallback to original value
  const langMap = fieldMap[lang] || fieldMap['pl']; // Default to Polish
  if (!langMap) return value; // Fallback if no language map
  return langMap[value] || langMap['unknown'] || value;
};