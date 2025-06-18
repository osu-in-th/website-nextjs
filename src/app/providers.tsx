"use client";
import { LanguageProvider } from '@/contexts/languageContext';
import React from 'react'

function Providers({children}: {children: React.ReactNode}) {
  return (
    <>
        <LanguageProvider>
            {children}
        </LanguageProvider>
    </>
  )
}

export default Providers