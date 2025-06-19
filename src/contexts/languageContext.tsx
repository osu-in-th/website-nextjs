"use client";
import { defaultLanguage, getLanguageByKey, Language } from "@/utils/i18n";
import React from "react";

const LanguageContext = React.createContext<{
    language: Language;
    setLanguage: (lang: Language) => void;
    setLanguageByKey: (lang: string) => void;
}>({
    language: defaultLanguage,
    setLanguage: () => {},
    setLanguageByKey: () => {}
});

export const LanguageProvider = ({children}: {children: React.ReactNode}) => {
    const [language, setLanguage] = React.useState<Language>(defaultLanguage);

    const setLanguageFunc = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("lang", lang.key);
    }

    const setLanguageByKey = (key: string): boolean => {
        const parsedLanguage = getLanguageByKey(key);
        if (parsedLanguage) {
            setLanguageFunc(parsedLanguage);
            return true;
        }
        return false;
    }

    React.useEffect(() => {
        if ( window.location.hostname === "xn--73cf8ayb.xn--o3cw4h" )
        {
            setLanguageByKey("th");
            return;
        }
        const savedLanguage = localStorage.getItem("lang");
        const clientLanguage = navigator.language.split("-")[0];

        if ( savedLanguage && setLanguageByKey(savedLanguage) ) return;
        else if ( clientLanguage && setLanguageByKey(clientLanguage) ) return;
    }, []);

    return (
        <LanguageContext.Provider value={{ language, setLanguage: setLanguageFunc, setLanguageByKey }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => React.useContext(LanguageContext);