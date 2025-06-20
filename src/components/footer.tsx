"use client";
import { useLanguage } from '@/contexts/languageContext';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'

function Footer() {
  const { language } = useLanguage();
  const blockStyle = "bg-secondary/10 rounded-2xl text-foreground/25";
  
  return (
    <footer className='w-full p-4 flex flex-col gap-2'>
      <div className='flex flex-1 gap-2'>
        <span className={clsx(blockStyle, "p-3 text-center text-sm font-semibold")}>{language.data.site.name}</span>
        <div className={clsx(blockStyle, "py-2 px-3 flex flex-1 flex-wrap items-center gap-2 text-xs font-extrabold")}>
          <Link className='rounded-lg p-1' href="/thanks-to">{language.data.pages.thanks_for_everyone.title}</Link>
          <Link className='rounded-lg p-1' target='_blank' href="https://status.osu.in.th/">{language.data.footer.links.status}</Link>
        </div>
      </div>
      <strong className='text-xs opacity-20'>{language.data.footer.made_with_love_by_community}</strong>
    </footer>
  )
}

export default Footer