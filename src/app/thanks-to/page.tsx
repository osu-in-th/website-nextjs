"use client"

import React, { Fragment } from 'react'
import Link from "next/link"
import { Avatar, Button, Chip, CircularProgress, Image, Tooltip } from '@heroui/react'
import communityArts from "@/data/community-arts.json"
import { useLanguage } from '@/contexts/languageContext'
import { ArrowUpRightIcon, CaretLeftIcon, CaretRightIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr"
import { usePrevNextButtons } from "@/components/carousel/emblaArrowButtons"
import { DotButton, useDotButton } from "@/components/carousel/emblaDotButton"
import useEmblaCarousel from "embla-carousel-react"
import { Contributor } from '@/types/contributor'
import { languages } from '@/utils/i18n'
import FallingText from '@/components/ui/FallingText'
import TextType from '@/components/ui/TextType'

function ThanksToCommunity() {
    const {language} = useLanguage();
    const [hero_bg_image, setHeroBgImage] = React.useState(communityArts[0]);
    const [loadingContributors, setLoadingContributors] = React.useState(true);
    const [contributors, setContributors] = React.useState<Contributor[]>([]);

    React.useEffect(()=>{
        const fetchContributors = async () => {
            const response = await fetch("https://api.github.com/repos/osu-in-th/website-nextjs/contributors");
            const data = await response.json();
            setContributors(data);
            setLoadingContributors(false);
        }
        fetchContributors();
    }, []);

    const [emblaRef, emblaApi] = useEmblaCarousel({loop:true,skipSnaps:true});
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    React.useEffect(()=>{
        const random_int = Math.floor(Math.random() * communityArts.length);
        setHeroBgImage(communityArts[random_int]);
    }, [])
    
    return (
        <>
            <div className="absolute -top-24 left-0 h-80 w-full">
                <Image src={"https://static.osu.in.th/images/"+hero_bg_image.filename} className="w-full h-full object-cover rounded-none" classNames={{
                    wrapper: "h-full w-full !max-w-none overflow-hidden rounded-none rounded-b-4xl"
                }} />
                <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-[--background]/80" />
                <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background" />
            </div>
            <div className="mt-12" />
            <section className='w-full max-w-4xl relative z-10 p-6 flex flex-col gap-2'>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <HeartIcon weight="fill" size={48} className="text-primary" />
                        <HeartIcon weight="fill" size={48} className="text-primary absolute animate-ping duration-1000 top-0 left-0" />
                    </div>
                    <h1 className="text-5xl font-bold">{language.data.pages.thanks_for_everyone.title}</h1>
                </div>
                <span className="font-bold opacity-40 select-none text-shadow-lg">{language.data.pages.home.imageby} <Link href={hero_bg_image.author.url} target="_blank">{hero_bg_image.author.name}</Link></span>
            </section>
            <section className='w-full max-w-4xl relative z-10 p-6 flex flex-col gap-2 -mb-6'>
                <h1 className='text-4xl font-bold'>{language.data.pages.thanks_for_everyone.sections.translators}</h1>
                <div className='flex flex-col gap-6 my-2'>
                    {
                        languages.map((lang, index) => (
                            <Fragment key={`lang-${index}`}>
                                <h1 className='flex items-center gap-2 text-lg font-semibold'>
                                    <Avatar alt={language.name} className="w-5 h-5" src={`https://flagcdn.com/${lang.flag}.svg`} />
                                    {lang.localName}
                                </h1>
                                <div className='flex flex-wrap gap-3 -mt-4'>
                                {
                                    lang.data.translators.map((translator, index) => (
                                        <span className='text-sm opacity-40' key={`translator-${lang.key}-${index}`}>{translator}</span>
                                    ))
                                }
                                </div>
                            </Fragment>
                        ))
                    }
                </div>
            </section>
            <section className='w-full max-w-4xl relative z-10 p-6 flex flex-col gap-2'>
                <h1 className='text-4xl font-bold'>{language.data.pages.thanks_for_everyone.sections.contributors}</h1>
                <div className='flex flex-wrap gap-2 my-2'>
                    {
                        loadingContributors ? <CircularProgress isIndeterminate className='m-4' /> :
                        contributors.map((contributor, index) => (
                            <Link key={`contributor-${index}`} target='_blank' href={contributor?.html_url}>
                                <Tooltip content={contributor?.login}>
                                    <Avatar size='md' src={contributor?.avatar_url} />
                                </Tooltip>
                            </Link>
                        ))
                    }
                </div>
            </section>
            <section className='w-full max-w-4xl relative z-10 p-6 flex flex-col gap-2'>
                <h1 className='text-4xl font-bold'>{language.data.pages.thanks_for_everyone.sections.artworks}</h1>
                <section className="embla w-full mt-4">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {communityArts.map((image, index) => (
                                <div className="embla__slide" key={"arts-"+index}>
                                    <Image src={"https://static.osu.in.th/images/"+image.filename} className='rounded-4xl' />
                                    <div className="embla__slide__number absolute w-[calc(100%_-_1rem)] !h-full top-0 left-4 z-10">
                                        <Link className='text-shadow-md opacity-60 max-sm:text-4xl' href={image.author.url} target='_blank'>{image.author.name}</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            
                    <div className="embla__controls !mt-4">
                        <div className="embla__buttons">
                            <Button isIconOnly size='sm' radius='full' onPress={onPrevButtonClick} disabled={prevBtnDisabled}
                                className="osu-style active-border-effect hover-effect animation-wrapper group !p-4"
                                style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-default)"} as React.CSSProperties}>
                                <div className="animation-container">
                                    <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
                                </div>
                                <CaretLeftIcon weight="bold" size={16} className='min-w-max min-h-max' />
                            </Button>
                            <Button isIconOnly size='sm' radius='full' onPress={onNextButtonClick} disabled={nextBtnDisabled}
                                className="osu-style active-border-effect hover-effect animation-wrapper group !p-4"
                                style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-default)"} as React.CSSProperties}>
                                <div className="animation-container">
                                    <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
                                </div>
                                <CaretRightIcon weight="bold" size={16} className='min-w-max min-h-max' />
                            </Button>
                        </div>
                
                        <div className="embla__dots">
                            {scrollSnaps.map((_, index) => (
                                <DotButton
                                    key={index}
                                    onClick={() => onDotButtonClick(index)}
                                    className={'embla__dot'.concat(
                                        index === selectedIndex ? ' embla__dot--selected' : ''
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </section>
                <section className='w-full flex max-[32rem]:flex-col max-[32rem]:items-center max-[32rem]:gap-8 justify-around gap-4 mt-12'>
                    <div className='flex flex-col max-[32rem]:w-full gap-2 sm:p-8'>
                        <h1 className='text-4xl font-bold'>Default User Avatar</h1>
                        <div>by <Link href="https://www.reddit.com/user/Kiraise_Mangi/" target='_blank'>Kiraise_Mangi <Chip size='sm' className='text-xs bg-amber-700' endContent={<ArrowUpRightIcon weight='bold' />}>Reddit</Chip></Link></div>
                    </div>
                    <div>
                        <Image className='max-[32rem]:max-h-52' src="https://static.osu.in.th/images/default-userprofile.png" />
                        <div className='text-xs text-foreground/70 mt-2'>
                            <Link href="https://www.reddit.com/r/osugame/comments/1camq31/osu_default_profile_picture_fanart/" target='_blank'>Ref: <Chip size='sm' className='text-xs bg-amber-700' endContent={<ArrowUpRightIcon weight='bold' />}>Reddit</Chip></Link>
                        </div>
                    </div>
                </section>
            </section>
            <section className='w-full max-w-4xl relative z-10 p-6 flex flex-col gap-2 mt-32 -mb-12'>
                {
                    <TextType
                        text={[language.data.pages.thanks_for_everyone.thankforallcontributors]}
                        typingSpeed={35}
                        pauseDuration={2000}
                        deletingSpeed={40}
                        loop={false}
                        showCursor={true}
                        cursorBlinkDuration={0.1}
                        cursorCharacter="█"
                        variableSpeed={{min: 10, max: 110}}
                        className='text-4xl font-bold text-center'
                    />
                }
                <div className='w-full h-64'>
                    {
                        loadingContributors ? <CircularProgress isIndeterminate className='m-4' /> :
                        <FallingText
                            text={contributors.map((contributor) => contributor.login).join(" ")}
                            highlightWords={["ponlponl123"]}
                            trigger="auto"
                            backgroundColor="transparent"
                            wireframes={false}
                            gravity={0.32}
                            fontSize="1.24rem"
                            mouseConstraintStiffness={1.2}
                        />
                    }
                </div>
            </section>
        </>
    )
}

export default ThanksToCommunity