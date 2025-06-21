"use client";
import clsx from 'clsx'
import React from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useLanguage } from '@/contexts/languageContext'
import { FunnelIcon, MagnifyingGlassIcon, MusicNoteIcon } from '@phosphor-icons/react/dist/ssr'
import { Checkbox, CheckboxGroup, Image, Input, Progress, Radio, RadioGroup, Select, SelectItem, SlotsToClasses, Tooltip } from '@heroui/react'
import { Cursor, SearchFilter, SearchResult } from '@/types/beatmap'
import Link from 'next/link';

function Beatmapsets() {
  const {language} = useLanguage();
  const [data, setData] = React.useState<SearchResult | null>(null);
  const [cursor, setCursor] = React.useState<Cursor | null>(null);
  const [filter, setFilter] = React.useState<SearchFilter>({
    e: "",
    c: "",
    g: "",
    l: "",
    m: "",
    nsfw: "",
    played: false,
    q: "",
    r: "",
    sort: "",
    s: "",
  });
  const [loading, setLoading] = React.useState(true);
  const [isSearching, setIsSearching] = React.useState(false);
  const [error, setError] = React.useState<unknown>(undefined);
  const filter_radio_classnames: SlotsToClasses<"base" | "label" | "description" | "wrapper" | "hiddenInput" | "labelWrapper" | "control"> = {
    label: "text-xs",
    labelWrapper: "m-0",
    wrapper: "hidden",
    base: "data-[selected=true]:font-semibold data-[selected=true]:opacity-100 opacity-25 cursor-default",
    hiddenInput: "cursor-default",
  };

  const createPayload = (payload: SearchFilter): URL => {
    const endpoint = new URL(window.location.origin + "/api/osu/search");
    if (payload.e) endpoint.searchParams.set("e", payload.e);
    if (payload.c) endpoint.searchParams.set("c", payload.c);
    if (payload.g) endpoint.searchParams.set("g", payload.g);
    if (payload.l) endpoint.searchParams.set("l", payload.l);
    if (payload.m) endpoint.searchParams.set("m", payload.m);
    if (typeof payload.nsfw === 'boolean') endpoint.searchParams.set("nsfw", payload.nsfw);
    if (typeof payload.played === 'boolean') endpoint.searchParams.set("played", payload.played.toString());
    if (payload.q) endpoint.searchParams.set("q", payload.q);
    if (payload.r) endpoint.searchParams.set("r", payload.r);
    if (payload.sort) endpoint.searchParams.set("sort", payload.sort);
    if (payload.s) endpoint.searchParams.set("s", payload.s);
    if (payload.cursor_string) endpoint.searchParams.set("cursor_string", payload.cursor_string);
    return endpoint;
  }

  const fetchOsuSearch = async (payload: SearchFilter) => {
    setLoading(true);
    setError(undefined);
    try {
      const makePayload = createPayload({
        ...payload,
        cursor_string: cursor?.string
      });
      const response = await fetch(makePayload.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        const parsed_data: SearchResult = data;
        setData(parsed_data);
        setCursor({
          ...parsed_data.cursor,
          string: parsed_data.cursor_string
        });
        return parsed_data;
      }
      throw data;
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }

  React.useEffect(()=>{
    setLoading(true);
    const handler = setTimeout(() => {
      fetchOsuSearch(filter);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [filter]);

  React.useEffect(()=>{
    fetchOsuSearch(filter);
  }, []);

  return (
    <>
      <div className='absolute top-0 left-0 w-full h-max rounded-xl rounded-b-4xl'>
        <AnimatePresence>
        {
          data && data.beatmapsets[0] &&
          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            layoutId='backdrop-banner'
            className='w-full brightness-105 contrast-125'
          >
            <Image src={data.beatmapsets[0].covers.cover} alt={data.beatmapsets[0].title}
              className={clsx("w-full max-h-96 object-cover blur-[148px] saturate-200 scale-125 -translate-y-24")}
              classNames={{
                wrapper: "w-full !max-w-none"
              }}
            />
          </motion.div>
        }
        </AnimatePresence>
      </div>
      <section className='w-full max-w-4xl flex flex-col bg-content2 rounded-4xl mt-8 z-10 -mb-6'>
        <h1 className='flex font-bold text-xl gap-3 items-center px-6 py-4'><MusicNoteIcon weight='fill' size={24} /> {language.data.pages.beatmap.list}</h1>
        <div className='flex flex-col gap-2 p-6 rounded-xl rounded-b-4xl bg-content3/20 relative'>
          {
            data && data.beatmapsets[0] &&
            <motion.div
              initial={{opacity:0}}
              animate={{opacity:0.96}}
              exit={{opacity:0}}
              layoutId='search-filter-backdrop-banner'
              className='absolute top-0 left-0 h-full w-full -z-10 overflow-hidden rounded-xl rounded-b-4xl'
            >
              <Image src={data.beatmapsets[0].covers.cover} alt={data.beatmapsets[0].title}
                className={clsx("w-full h-full object-cover blur-3xl scale-110 saturate-200")}
                classNames={{
                  wrapper: "w-full h-full !max-w-none"
                }}
              />
              <div className='absolute w-full h-full top-0 left-0 z-10 bg-gradient-to-l from-transparent to-content3' />
              <div className='absolute w-full h-full top-0 left-0 z-10 bg-gradient-to-r from-transparent to-content3' />
            </motion.div>
          }
          {
            (loading || isSearching) && <Progress className='absolute top-0 left-0' size='sm' isIndeterminate/>
          }
          <div>
            <Input placeholder={language.data.pages.beatmap.filter.search.unauthorized} isDisabled={true} type="text" classNames={{
              input: "text-sm"
            }}
            variant={filter.q ? "bordered" : "flat"}
            endContent={<MagnifyingGlassIcon className='text-foreground/40' weight='bold' size={16} />}
              onChange={(e) => {
                setIsSearching(true);
                setFilter(value=>{
                  return {
                    ...value,
                    q: e.target.value
                  }
                })
                setCursor(null);
              }}
            />
          </div>
          <div className="border-2 p-1 mt-3 border-content4 rounded-2xl relative">
            <h1 className='px-2 -m-2 font-bold rounded-full text-xs text-background/60 bg-content4 absolute top-0 left-0 flex items-center gap-1'><FunnelIcon weight='fill' size={12} /> {language.data.pages.beatmap.filter.title}</h1>
            <div className='osu-filter-grid'>
              <section className='osu-filter-grid-section'>
                <h1 className='osu-filter-grid-section-title'>{language.data.pages.beatmap.filter.only.title}</h1>
                <div className='osu-filter-grid-section-content'>
                  <CheckboxGroup size='sm' classNames={{wrapper: "gap-x-3"}} orientation='horizontal' onChange={(values) => {setFilter(prev_value => ({...prev_value, c: values.join(".")})),setCursor(null)}} defaultValue={[]}>
                    <Checkbox classNames={filter_radio_classnames} value="recommended">{language.data.pages.beatmap.filter.only.recommended_dif} (4.58)</Checkbox>
                    <Checkbox classNames={filter_radio_classnames} value="converts">{language.data.pages.beatmap.filter.only.converted_map}</Checkbox>
                    <Checkbox classNames={filter_radio_classnames} value="follows">{language.data.pages.beatmap.filter.only.subscribed_mappers}</Checkbox>
                    <Checkbox classNames={filter_radio_classnames} value="spotlights">{language.data.pages.beatmap.filter.only.spotlighted_maps}</Checkbox>
                    <Checkbox classNames={filter_radio_classnames} value="featured_artists">{language.data.pages.beatmap.filter.only.featured_artists}</Checkbox>
                  </CheckboxGroup>
                </div>
              </section>
              <section className='osu-filter-grid-section'>
                <h1 className='osu-filter-grid-section-title'>{language.data.pages.beatmap.filter.mode}</h1>
                <div className='osu-filter-grid-section-content'>
                  <RadioGroup size='sm' classNames={{wrapper: "gap-x-3"}} defaultValue={""} orientation='horizontal' onValueChange={(value) => (setFilter(prev_value => ({...prev_value, m: value})),setCursor(null))} isRequired>
                    <Radio classNames={filter_radio_classnames} value="">{language.data.pages.beatmap.filter.any}</Radio>
                    <Radio classNames={filter_radio_classnames} value="0">osu!</Radio>
                    <Radio classNames={filter_radio_classnames} value="1">osu!taiko</Radio>
                    <Radio classNames={filter_radio_classnames} value="2">osu!catch</Radio>
                    <Radio classNames={filter_radio_classnames} value="3">osu!mania</Radio>
                  </RadioGroup>
                </div>
              </section>
              <section className='osu-filter-grid-section'>
                <h1 className='osu-filter-grid-section-title'>{language.data.pages.beatmap.filter.category.title}</h1>
                <div className='osu-filter-grid-section-content'>
                  <RadioGroup size='sm' classNames={{wrapper: "gap-x-3"}} defaultValue={""} orientation='horizontal' onValueChange={(value) => (setFilter(prev_value => ({...prev_value, s: value})),setCursor(null))} isRequired>
                    <Radio classNames={filter_radio_classnames} value="any">{language.data.pages.beatmap.filter.any}</Radio>
                    <Radio classNames={filter_radio_classnames} value="">{language.data.pages.beatmap.filter.category.has_leaderboard}</Radio>
                    <Radio classNames={filter_radio_classnames} value="ranked">{language.data.pages.beatmap.filter.category.ranked}</Radio>
                    <Radio classNames={filter_radio_classnames} value="qualified">{language.data.pages.beatmap.filter.category.qualified}</Radio>
                    <Radio classNames={filter_radio_classnames} value="loved">{language.data.pages.beatmap.filter.category.loved}</Radio>
                    <Radio classNames={filter_radio_classnames} value="favourite">{language.data.pages.beatmap.filter.category.favourite}</Radio>
                    <Radio classNames={filter_radio_classnames} value="pending">{language.data.pages.beatmap.filter.category.pending}</Radio>
                    <Radio classNames={filter_radio_classnames} value="wip">{language.data.pages.beatmap.filter.category.wip}</Radio>
                    <Radio classNames={filter_radio_classnames} value="graveyard">{language.data.pages.beatmap.filter.category.graveyard}</Radio>
                    <Radio classNames={filter_radio_classnames} value="my_maps">{language.data.pages.beatmap.filter.category.my_maps}</Radio>
                  </RadioGroup>
                </div>
              </section>
              <section className='osu-filter-grid-section'>
                <h1 className='osu-filter-grid-section-title'>{language.data.pages.beatmap.filter.explicit_content}</h1>
                <div className='osu-filter-grid-section-content'>
                  <RadioGroup size='sm' classNames={{wrapper: "gap-x-3"}} defaultValue={"false"} orientation='horizontal' onValueChange={(value) => {setFilter(prev_value => ({...prev_value, nsfw: value})),setCursor(null)}} isRequired>
                    <Radio classNames={filter_radio_classnames} value="false">{language.data.pages.beatmap.filter.hide}</Radio>
                    <Radio classNames={filter_radio_classnames} value="">{language.data.pages.beatmap.filter.show}</Radio>
                  </RadioGroup>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full max-w-4xl flex items-center justify-between md:px-4 mt-3 -mb-2 z-10'>
        <div className='flex flex-1 items-center gap-2'>
          <h1 className='text-sm font-bold text-foreground/20'>{language.data.pages.beatmap.sort.title}</h1>
          <Select
            size='sm'
            className=""
            classNames={{
              base: "w-full max-w-max",
              value: "text-xs font-semibold",
            }}
            defaultSelectedKeys={["ranked"]}
            disallowEmptySelection
            radius="full"
          >
            <SelectItem key="ranked">Ranked</SelectItem>
            <SelectItem key="rating_desc">Rating</SelectItem>
            <SelectItem key="rating_asc">Rating</SelectItem>
          </Select>
        </div>
        <div>

        </div>
      </section>
      <section className='w-full max-w-4xl flex flex-col md:px-8 z-10'>
      {
        data && data.beatmapsets.length > 0 ? (
          <div className='flex flex-wrap gap-2'>
            {data.beatmapsets.map((beatmapset, index) => (
              <Link href={`/beatmapsets/${beatmapset.id}`} key={`beatmapset-${beatmapset.id}`} className='w-full sm:w-[calc(50%_-_0.25rem)]'>
                <motion.div
                  key={beatmapset.id}
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 20}}
                  layoutId={`beatmapset-${index}-${beatmapset.id}`}
                  className='flex gap-2 bg-content3 rounded-2xl hover:bg-content3/80 transition-colors overflow-hidden relative'
                >
                  <Image src={beatmapset.covers.list} alt={beatmapset.title} className='w-20 h-20 object-cover rounded-2xl' classNames={{
                    wrapper: "z-10"
                  }} />
                  <motion.div
                    initial={{opacity: 0, x: 20}}
                    whileInView={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: 20}}
                    layoutId={`beatmapset-${index}-${beatmapset.id}-background`}
                    transition={{duration: 1}}
                    className='absolute top-0 left-16 w-[calc(100%_-_4rem)] h-full z-0'
                  >
                    <Image src={beatmapset.covers.card} alt={beatmapset.title} className='object-cover rounded-none blur-lg scale-150 saturate-200' classNames={{
                      wrapper: "z-10 opacity-40"
                    }} />
                    <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent to-content3 z-20' />
                  </motion.div>
                  <div className='flex flex-col flex-1 max-w-[calc(100%_-_6rem))] py-2 px-1 z-10'>
                    <Tooltip size='sm' showArrow offset={0} classNames={{
                      content: "text-xs"
                    }} content={beatmapset.title} className='max-w-full'>
                      <h2 className='w-max max-w-full text-sm font-bold line-clamp-2'>{beatmapset.title}</h2>
                    </Tooltip>
                    <p className='text-[10px] text-foreground/70 max-w-full line-clamp-1'>by {beatmapset.artist}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-64'>
            <p className='text-foreground/70 text-lg'>{language.data.pages.beatmap.no_results}</p>
          </div>
        )
      }
      </section>
    </>
  )
}

export default Beatmapsets