"use client";
import { BeatmapsetContextProvider } from '@/contexts/beatmapsetContext';
import { LanguageProvider } from '@/contexts/languageContext';
import React from 'react'

function Providers({children}: {children: React.ReactNode}) {
  return (
    <>
        <LanguageProvider>
            <BeatmapsetContextProvider>
              {children}
            </BeatmapsetContextProvider>
        </LanguageProvider>
    </>
  )
}

export default Providers