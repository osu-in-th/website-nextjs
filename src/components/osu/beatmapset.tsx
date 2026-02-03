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
import { useRouter } from 'next/navigation';
import { useBeatmapset } from '@/contexts/beatmapsetContext';

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
        stickWrapper?: string;
    }
}

function BeatmapSet({ beatmapset, viewMode, classNames, focusCallback }: { beatmapset: BeatmapSet, classNames?: BeatmapSetClassNames, viewMode: 'grid' | 'list', focusCallback: (state: boolean)=>void }) {
    const randomId = React.useId();
    const router = useRouter();
    const {language} = useLanguage();
    const { setSetFocused } = useBeatmapset();
    const [isHover, setIsHover] = React.useState<boolean>(false);
    const difficulty_stick_wrapper_style = 'flex items-center gap-[2px] h-4 w-max overflow-hidden';
    const difficulty_stick_style = 'h-full w-[6px] min-w-[6px] max-w-[6px] rounded-full bg-(--difficulty-color)';
    const beatmapHref = `/beatmapsets/${beatmapset.id}`;
    const creatorHref = `/users/${beatmapset.user_id}`;
    const onBeatmapsetFocused = () => {
        setIsHover(true);
        // if (setSetFocused) setSetFocused(true);
        if (focusCallback) focusCallback(true);
    }
    const onBeatmapsetBlured = () => {
        setIsHover(false);
        // if (setSetFocused) setSetFocused(false);
        if (focusCallback) focusCallback(false);
    }
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
                '!block !p-0 w-full h-max rounded-2xl overflow-hidden',
                viewMode === 'grid' ? 'rounded-3xl' : '',
                isHover && 'scale-110 !opacity-100 bg-content3 z-40',
                classNames?.wrapper
            )}  onPress={()=>router.push(beatmapHref)}
                onMouseEnter={onBeatmapsetFocused}
                onFocus={onBeatmapsetFocused}
                onMouseLeave={onBeatmapsetBlured}
                onBlur={onBeatmapsetBlured}
            >
                <motion.div
                    layoutId={`beatmapset-base-${randomId}-${beatmapset.id}`}
                    className={clsx(
                        'flex gap-2 bg-content3 rounded-2xl hover:bg-content3/80 transition-colors overflow-hidden relative',
                        viewMode === 'grid' ? 'flex-col items-center justify-center p-4 rounded-3xl' : '',
                        classNames,
                        classNames?.base
                    )}
                >
                    <Link tabIndex={-1} href={beatmapHref} className='disable-active-animation contents'>
                        <Image src={
                            viewMode === 'grid' ? beatmapset.covers['list@2x'] : beatmapset.covers.list
                        } alt={beatmapset.title} className={clsx(
                            'object-cover rounded-2xl aspect-square pointer-events-none',
                            viewMode === 'grid' ? 'w-full min-w-full' : 'h-28 min-h-28',
                            classNames?.image?.image
                        )} classNames={{
                            wrapper: clsx(
                                "z-10",
                                viewMode === 'grid' ? 'w-full min-w-full' : 'h-max min-h-max',
                            ),
                            ...classNames?.image?.classNames
                        }} />
                    </Link>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layoutId={`beatmapset-${randomId}-${beatmapset.id}-background`}
                        transition={{ duration: 1 }}
                        className={clsx(
                            'absolute top-0 h-full z-0 pointer-events-none w-full',
                            classNames?.backdrop?.wrapper
                        )}
                    >
                        <Image src={beatmapset.covers.card} alt={beatmapset.title} className={clsx(
                            'object-cover rounded-none blur-lg h-full scale-150 saturate-200',
                            classNames?.backdrop?.image?.image
                        )} classNames={{
                            wrapper: "z-10 opacity-40 h-full",
                            ...classNames?.backdrop?.image?.classNames
                        }} />
                        <div className={
                            clsx(
                                'absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent to-content3 z-20',
                                viewMode === 'grid' ? 'bg-gradient-to-b' : '',
                                classNames?.backdrop?.overlay
                            )
                        } />
                    </motion.div>
                    <div className={clsx(
                        'flex flex-col flex-1 min-w-0 py-2 px-1 z-10 relative',
                        viewMode === 'grid' ? 'items-center justify-center text-center w-full' : 'items-start justify-start',
                        classNames?.content
                    )}>
                        <Link href={beatmapHref} tabIndex={-1}
                            className='absolute left-0 top-0 w-full h-full z-10' />
                        <Tooltip size='sm' showArrow offset={0} tabIndex={-1} classNames={{
                            content: "text-xs",
                            ...classNames?.title?.tooltip
                        }} content={beatmapset.title} className='max-w-full'>
                            <Link tabIndex={-1} href={beatmapHref} className='z-10 w-max max-w-full disable-active-animation'>
                                <h1 tabIndex={-1} className={clsx(
                                    'w-max max-w-full text-sm font-bold line-clamp-1 text-ellipsis',
                                    classNames?.title?.content
                                )}>{beatmapset.title}</h1>
                            </Link>
                        </Tooltip>
                        <p className={clsx(
                            'text-[10px] text-foreground/70 max-w-full line-clamp-1 text-ellipsis',
                            classNames?.author
                        )}>{language.data.pages.beatmap.details.by} {beatmapset.artist}</p>
                        <div className={clsx(
                            'text-[10px] py-1 pr-1 font-semibold text-foreground/70 max-w-full line-clamp-1 text-ellipsis z-10 select-none flex items-center gap-1',
                            classNames?.creator
                        )}>
                            <Link tabIndex={-1} href={beatmapHref} className='z-10 w-max max-w-full disable-active-animation'>
                                <span className='pointer-events-none'>{language.data.pages.beatmap.details.mapped_by}</span>
                            </Link>
                            <Link className='rounded-sm !outline-offset-1' href={creatorHref}>{beatmapset.creator}</Link>
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
                                if (total_difficulty > 8) {
                                    return <>
                                        {osu_standard.length > 0 && <OsuModeIcon mode='osu' size={16} className={classNames?.sets?.icon} />}
                                        {osu_taiko.length > 0 && <OsuModeIcon mode='taiko' size={16} className={classNames?.sets?.icon} />}
                                        {osu_catch.length > 0 && <OsuModeIcon mode='fruits' size={16} className={classNames?.sets?.icon} />}
                                        {osu_mania.length > 0 && <OsuModeIcon mode='mania' size={16} className={classNames?.sets?.icon} />}
                                        <span className='font-semibold text-xs'>({total_difficulty})</span>
                                    </>
                                }
                                return <>
                                    {osu_standard.length > 0 && <>
                                        <OsuModeIcon mode='osu' size={16} className={classNames?.sets?.icon} />
                                        <div className={clsx(
                                            difficulty_stick_wrapper_style,
                                            classNames?.sets?.stickWrapper
                                        )}>
                                            {
                                                osu_standard.map((beatmap, index) => (
                                                    <div className={clsx(
                                                        difficulty_stick_style,
                                                        classNames?.sets?.stick
                                                    )} style={{ "--difficulty-color": getColorFromDiffucultyFloat(beatmap.difficulty_rating) } as React.CSSProperties} key={`beatmap-${beatmap.id}-difficulty-osu-${index}`} />
                                                ))
                                            }
                                        </div>
                                    </>}
                                    {osu_taiko.length > 0 && <>
                                        <OsuModeIcon mode='taiko' size={16} className={classNames?.sets?.icon} />
                                        <div className={clsx(
                                            difficulty_stick_wrapper_style,
                                            classNames?.sets?.stickWrapper
                                        )}>
                                            {
                                                osu_taiko.map((beatmap, index) => (
                                                    <div className={clsx(
                                                        difficulty_stick_style,
                                                        classNames?.sets?.stick
                                                    )} style={{ "--difficulty-color": getColorFromDiffucultyFloat(beatmap.difficulty_rating) } as React.CSSProperties} key={`beatmap-${beatmap.id}-difficulty-taiko-${index}`} />
                                                ))
                                            }
                                        </div>
                                    </>}
                                    {osu_catch.length > 0 && <>
                                        <OsuModeIcon mode='fruits' size={16} className={classNames?.sets?.icon} />
                                        <div className={clsx(
                                            difficulty_stick_wrapper_style,
                                            classNames?.sets?.stickWrapper
                                        )}>
                                            {
                                                osu_catch.map((beatmap, index) => (
                                                    <div className={clsx(
                                                        difficulty_stick_style,
                                                        classNames?.sets?.stick
                                                    )} style={{ "--difficulty-color": getColorFromDiffucultyFloat(beatmap.difficulty_rating) } as React.CSSProperties} key={`beatmap-${beatmap.id}-difficulty-fruits-${index}`} />
                                                ))
                                            }
                                        </div>
                                    </>}
                                    {osu_mania.length > 0 && <>
                                        <OsuModeIcon mode='mania' size={16} className={classNames?.sets?.icon} />
                                        <div className={clsx(
                                            difficulty_stick_wrapper_style,
                                            classNames?.sets?.stickWrapper
                                        )}>
                                            {
                                                osu_mania.map((beatmap, index) => (
                                                    <div className={clsx(
                                                        difficulty_stick_style,
                                                        classNames?.sets?.stick
                                                    )} style={{ "--difficulty-color": getColorFromDiffucultyFloat(beatmap.difficulty_rating) } as React.CSSProperties} key={`beatmap-${beatmap.id}-difficulty-mania-${index}`} />
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