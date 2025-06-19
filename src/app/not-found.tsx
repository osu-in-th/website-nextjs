"use client";
import { useLanguage } from '@/contexts/languageContext'
import { Button, Link } from '@heroui/react'
import { HouseIcon, MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation';
import React from 'react'

function WIP() {
    const {language} = useLanguage();
    const router = useRouter();

    return (
        <div className='w-full p-24 max-sm:px-6 flex flex-col items-center justify-center gap-6 text-center'>
            <MagnifyingGlassIcon weight='bold' size={96} />
            <h1 className='text-3xl font-bold -mb-2'>{language.data.pages.not_found.title}</h1>
            <p>{language.data.pages.not_found.description}</p>
            <div className='flex max-sm:flex-col items-center gap-4'>
                <Link href="/" tabIndex={-1}>
                    <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
                        onPress={(e)=>(e.continuePropagation(),router.push("/"))}
                        style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-default)"} as React.CSSProperties}>
                        <div className="animation-container">
                            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
                        </div>
                        <HouseIcon weight="fill" />
                        {language.data.pages.not_found.links.back_to_home}
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default WIP