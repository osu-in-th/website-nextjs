"use client";
import { defaultLanguage, getLanguageByKey, Language } from "@/utils/i18n";
import React from "react";

const LanguageContext = React.createContext<{
    language: Language;
    setLanguage: (lang: Language) => void;
}>({
    language: defaultLanguage,
    setLanguage: () => {},
});

export const LanguageProvider = ({children}: {children: React.ReactNode}) => {
    const [language, setLanguage] = React.useState<Language>(defaultLanguage);

    const setLanguageFunc = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("lang", lang.key);
    }

    React.useEffect(() => {
        const setLanguageByKey = (key: string): boolean => {
            if (savedLanguage) {
                const parsedLanguage = getLanguageByKey(savedLanguage);
                if (parsedLanguage) {
                    setLanguageFunc(parsedLanguage);
                    return true;
                }
            }
            return false;
        }
        
        const savedLanguage = localStorage.getItem("lang");
        const clientLanguage = navigator.language.split("-")[0];

        if ( savedLanguage && setLanguageByKey(savedLanguage) ) return;
        else if ( clientLanguage && setLanguageByKey(clientLanguage) ) return;
    }, []);

    return (
        <LanguageContext.Provider value={{ language, setLanguage: setLanguageFunc }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => React.useContext(LanguageContext);