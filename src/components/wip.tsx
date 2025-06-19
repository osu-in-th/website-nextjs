"use client";
import { useLanguage } from '@/contexts/languageContext'
import { Button, Link } from '@heroui/react'
import { CraneTowerIcon, GitPullRequestIcon } from '@phosphor-icons/react/dist/ssr'
import React from 'react'

function WIP() {
    const {language} = useLanguage();
    return (
        <div className='w-full p-24 flex flex-col items-center justify-center gap-6'>
            <CraneTowerIcon weight='fill' size={96} />
            <h1 className='text-3xl font-bold -mb-2'>{language.data.wip.title}</h1>
            <p>{language.data.wip.description}</p>
            <div className='flex items-center gap-4'>
                <span className='text-sm'>{language.data.wip.other_ways}</span>
                <Link target='_blank' href="https://github.com/osu-in-th/website-nextjs/compare" tabIndex={-1}>
                    <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
                        style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-secondary)"} as React.CSSProperties}>
                        <div className="animation-container">
                        <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
                        </div>
                        <GitPullRequestIcon weight="fill" />
                        {language.data.wip.create_pr}
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default WIP