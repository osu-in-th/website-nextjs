import en from "@/data/langs/en.json";
import th from "@/data/langs/th.json";

export type CombiledLanguageKey = keyof typeof en | keyof typeof th;

export type Language = {
    key: string;
    name: string;
    localName: string;
    flag: string;
    data: CombiledLanguageKey;
}

export const availableLanguages: (typeof en)[] = [en, th];

export const languages: Language[] = availableLanguages.map((lang, i) => {
    return {
        key: i.toString(),
        name: lang.name,
        localName: lang.local_name,
        flag: lang.flag,
        data: fillMissingKeys(en, lang),
    }
})

export const defaultLanguage = languages[0];

export function getLanguageByKey(key: string): Language {
    return languages.find(lang => lang.key === key) || defaultLanguage;
}

export function fillMissingKeys(base: any, target: any): CombiledLanguageKey {
    for (const key in base) {
        if (typeof base[key] === 'object' && base[key] !== null) {
            if (!target[key]) {
                target[key] = {};
            }
            fillMissingKeys(base[key], target[key]);
        } else if (target[key] === undefined) {
            target[key] = base[key];
        }
    }
    return target as CombiledLanguageKey;
}