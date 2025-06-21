"use client";
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { type BeatmapSet } from '@/types/beatmap'
import { Button, Chip, Image, SlotsToClasses, Tooltip } from '@heroui/react'
import { OsuModeIcon } from '@/components/icons/mode'
import { useLanguage } from '@/contexts/languageContext'
import { getColorFromDiffucultyFloat } from '@/utils/osu/color'
import clsx from 'clsx'

export interface BeatmapSetClassNames {
    layout?: string;
    wrapper?: string;
    content?: string;
    base?: string;
    image?: {
        classNames?: SlotsToClasses<"img" | "wrapper" | "zoomedWrapper" | "blurredImg">;
        image?: string;
    },
    backdrop?: {
        wrapper?: string;
        image?: {
            image?: string;
            classNames?: SlotsToClasses<"img" | "wrapper" | "zoomedWrapper" | "blurredImg">;
        };
        overlay?: string;
    },
    title?: {
        tooltip?: SlotsToClasses<"base" | "content" | "arrow">;
        content?: string;
    },
    author?: string;
    creator?: string;
    status?: SlotsToClasses<"base" | "content" | "avatar" | "dot" | "closeButton">;
    sets?: {
        wrapper?: string;
        icon?: string;
        stick?: string;
    }
}

function BeatmapSet({ beatmapset, viewMode, classNames, classname = 'list' }: { beatmapset: BeatmapSet, classname?: string, classNames?: BeatmapSetClassNames, viewMode: 'grid' | 'list' }) {
    const randomId = React.useId();
    const {language} = useLanguage();
    const difficulty_stick_style = 'flex items-center gap-[2px] h-4 flex-1 overflow-hidden';
    const beatmapHref = `/beatmapsets/${beatmapset.id}`;
    const creatorHref = `/users/${beatmapset.user_id}`;
    return (
        <motion.div
            key={beatmapset.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            layoutId={`beatmapset-${randomId}-${beatmapset.id}`}
            className={clsx(
                "w-full h-max sm:w-[calc(50%_-_0.25rem)] relative",
                classNames?.layout
            )}
        >
            <Button className={clsx(
                '!block !p-0 w-full h-full',
                classNames?.wrapper
            )}>
                <motion.div
                    layoutId={`beatmapset-base-${randomId}-${beatmapset.id}`}
                    className={clsx(
                        'flex gap-2 bg-content3 rounded-2xl hover:bg-content3/80 transition-colors overflow-hidden relative',
                        viewMode === 'grid' ? 'flex-col items-center justify-center p-4 h-64' : '',
                        classNames,
                        classNames?.base
                    )}
                >
                    <Link href={beatmapHref} className='disable-active-animation'>
                        <Image src={beatmapset.covers.list} alt={beatmapset.title} className={clsx(
                            'object-cover rounded-2xl',
                            viewMode === 'grid' ? 'w-36 h-36 min-w-36 min-h-36' : 'w-24 h-24 min-w-24 min-h-24',
                            classNames?.image?.image
                        )} classNames={{
                            wrapper: "z-10",
                            ...classNames?.image?.classNames
                        }} />
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        layoutId={`beatmapset-${randomId}-${beatmapset.id}-background`}
                        transition={{ duration: 1 }}
                        className={clsx(
                            'absolute top-0 h-full z-0 pointer-events-none',
                            viewMode === 'grid' ? 'left-0 w-full' : 'left-16 w-[calc(100%_-_4rem)]',
                            classNames?.backdrop?.wrapper
                        )}
                    >
                        <Image src={beatmapset.covers.card} alt={beatmapset.title} className={clsx(
                            'object-cover rounded-none blur-lg scale-150 saturate-200',
                            classNames?.backdrop?.image?.image
                        )} classNames={{
                            wrapper: "z-10 opacity-40",
                            ...classNames?.backdrop?.image?.classNames
                        }} />
                        {
                            viewMode === 'list' &&
                            <div className={
                                clsx(
                                    'absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent to-content3 z-20',
                                    classNames?.backdrop?.overlay
                                )
                            } />
                        }
                    </motion.div>
                    <div className={clsx(
                        'flex flex-col flex-1 min-w-0 py-2 px-1 z-10 relative',
                        viewMode === 'grid' ? 'items-center justify-center text-center w-full' : 'items-start justify-start',
                        classNames?.content
                    )}>
                        <Link href={beatmapHref}
                            className='absolute left-0 top-0 w-full h-full z-10' />
                        <Tooltip size='sm' showArrow offset={0} classNames={{
                            content: "text-xs",
                            ...classNames?.title?.tooltip
                        }} tabIndex={-1} content={beatmapset.title} className='max-w-full'>
                            <Link href={beatmapHref} className='z-10 w-max max-w-full disable-active-animation'>
                                <h1 tabIndex={-1} className={clsx(
                                    'w-max max-w-full text-sm font-bold line-clamp-1',
                                    classNames?.title?.content
                                )}>{beatmapset.title}</h1>
                            </Link>
                        </Tooltip>
                        <p className={clsx(
                            'text-[10px] text-foreground/70 max-w-full line-clamp-1',
                            classNames?.author
                        )}>{language.data.pages.beatmap.details.by} {beatmapset.artist}</p>
                        <div className={clsx(
                            'text-[10px] my-1 font-semibold text-foreground/70 max-w-full line-clamp-1 z-10 select-none flex items-center gap-1',
                            classNames?.creator
                        )}>
                            <Link href={beatmapHref} className='z-10 w-max max-w-full disable-active-animation'>
                                <span className='pointer-events-none'>{language.data.pages.beatmap.details.mapped_by}</span>
                            </Link>
                            <Link href={creatorHref}>{beatmapset.creator}</Link>
                        </div>
                        <div className={clsx(
                            'flex items-center gap-1 mt-auto',
                            classNames?.sets?.wrapper
                        )}>
                            <Chip size='sm' classNames={{
                                content: "text-[10px] font-bold",
                                base: "bg-content4/20 text-foreground/70 p-1 min-h-0",
                                ...classNames?.status
                            }} className={clsx(
                                'text-xs',
                                beatmapset.status === "ranked" ? "bg-green-700 text-white"
                                : beatmapset.status === "loved" ? "bg-pink-700 text-white"
                                : beatmapset.status === "qualified" ? "bg-yellow-700 text-white"
                                : beatmapset.status === "pending" ? "bg-blue-700 text-white"
                                : beatmapset.status === "wip" ? "bg-purple-700 text-yellow-300"
                                : beatmapset.status === "graveyard" ? "bg-gray-700 text-white"
                                : beatmapset.status === "favourite" ? "bg-orange-700 text-white"
                                : beatmapset.status === "my_maps" ? "bg-teal-700 text-white"
                                : "bg-content4/20"
                            )}>{
                                language.data.pages.beatmap.filter.category[beatmapset.status as keyof typeof language.data.pages.beatmap.filter.category] ?
                                language.data.pages.beatmap.filter.category[beatmapset.status as keyof typeof language.data.pages.beatmap.filter.category] :
                                beatmapset.status
                            }</Chip>
                            {(() => {
                                let osu_standard = beatmapset.beatmaps.filter(b => b.mode === "osu");
                                let osu_taiko = beatmapset.beatmaps.filter(b => b.mode === "taiko");
                                let osu_catch = beatmapset.beatmaps.filter(b => b.mode === "fruits");
                                let osu_mania = beatmapset.beatmaps.filter(b => b.mode === "mania");
                                osu_standard = osu_standard.sort((a, b) => a.difficulty_rating - b.difficulty_rating);
                                osu_taiko = osu_taiko.sort((a, b) => a.difficulty_rating - b.difficulty_rating);
                                osu_catch = osu_catch.sort((a, b) => a.difficulty_rating - b.difficulty_rating);
                                osu_mania = osu_mania.sort((a, b) => a.difficulty_rating - b.difficulty_rating);
                                let total_difficulty = osu_standard.length + osu_taiko.length + osu_catch.length + osu_mania.length;
                                if (total_difficulty > 13) {
                                    return <>
                                        {osu_standard.length > 0 && <OsuModeIcon mode='osu' className={classNames?.sets?.icon} />}
                                        {osu_taiko.length > 0 && <OsuModeIcon mode='taiko' className={classNames?.sets?.icon} />}
                                        {osu_catch.length > 0 && <OsuModeIcon mode='fruits' className={classNames?.sets?.icon} />}
                                        {osu_mania.length > 0 && <OsuModeIcon mode='mania' className={classNames?.sets?.icon} />}
                                        ({total_difficulty})
                                    </>
                                }
                                return <>
                                    {osu_standard.length > 0 && <>
                                        <OsuModeIcon mode='osu' size={16} className={classNames?.sets?.icon} />
                                        <div className={clsx(
                                            difficulty_stick_style,
                                            classNames?.sets?.stick
                                        )}>
                                            {
                                                osu_standard.map((beatmap, index) => (
                                                    <div className='h-full w-[6px] rounded-full bg-(--difficulty-color)' style={{ "--difficulty-color": getColorFromDiffucultyFloat(beatmap.difficulty_rating) } as React.CSSProperties} key={`beatmap-${beatmap.id}-difficulty-osu-${index}`} />
                                                ))
                                            }
                                        </div>
                                    </>}
                                    {osu_taiko.length > 0 && <>
                                        <OsuModeIcon mode='taiko' size={16} className={classNames?.sets?.icon} />
                                        <div className={clsx(
                                            difficulty_stick_style,
                                            classNames?.sets?.stick
                                        )}>
                                            {
                                                osu_taiko.map((beatmap, index) => (
                                                    <div className='h-full w-[6px] rounded-full bg-(--difficulty-color)' style={{ "--difficulty-color": getColorFromDiffucultyFloat(beatmap.difficulty_rating) } as React.CSSProperties} key={`beatmap-${beatmap.id}-difficulty-taiko-${index}`} />
                                                ))
                                            }
                                        </div>
                                    </>}
                                    {osu_catch.length > 0 && <>
                                        <OsuModeIcon mode='fruits' size={16} className={classNames?.sets?.icon} />
                                        <div className={clsx(
                                            difficulty_stick_style,
                                            classNames?.sets?.stick
                                        )}>
                                            {
                                                osu_catch.map((beatmap, index) => (
                                                    <div className='h-full w-[6px] rounded-full bg-(--difficulty-color)' style={{ "--difficulty-color": getColorFromDiffucultyFloat(beatmap.difficulty_rating) } as React.CSSProperties} key={`beatmap-${beatmap.id}-difficulty-fruits-${index}`} />
                                                ))
                                            }
                                        </div>
                                    </>}
                                    {osu_mania.length > 0 && <>
                                        <OsuModeIcon mode='mania' size={16} className={classNames?.sets?.icon} />
                                        <div className={clsx(
                                            difficulty_stick_style,
                                            classNames?.sets?.stick
                                        )}>
                                            {
                                                osu_mania.map((beatmap, index) => (
                                                    <div className='h-full w-[6px] rounded-full bg-(--difficulty-color)' style={{ "--difficulty-color": getColorFromDiffucultyFloat(beatmap.difficulty_rating) } as React.CSSProperties} key={`beatmap-${beatmap.id}-difficulty-mania-${index}`} />
                                                ))
                                            }
                                        </div>
                                    </>}
                                </>
                            })()}
                        </div>
                    </div>
                </motion.div>
            </Button>
        </motion.div>
    )
}

export default BeatmapSet