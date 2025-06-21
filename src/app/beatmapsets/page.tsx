"use client";
import clsx from 'clsx'
import React, { Key } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useLanguage } from '@/contexts/languageContext'
import { ArrowsInSimpleIcon, ArrowsOutSimpleIcon, FunnelIcon, MagnifyingGlassIcon, MusicNoteIcon, RowsIcon, SquaresFourIcon, WaveformIcon } from '@phosphor-icons/react/dist/ssr'
import { Button, Checkbox, CheckboxGroup, Image, Input, Progress, Radio, RadioGroup, Select, SelectItem, SelectSection, SlotsToClasses, Spinner, Tab, Tabs, Tooltip } from '@heroui/react'
import { Cursor, SearchFilter, SearchResult } from '@/types/beatmap'
import BeatmapSet from '@/components/osu/beatmapset';
import { useRouter } from 'next/navigation';

function Beatmapsets() {
  const {language} = useLanguage();
  const router = useRouter();
  const [data, setData] = React.useState<SearchResult | null>(null);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [fullscreenMode, setFullscreenMode] = React.useState<boolean>(false);
  const [isAuthorized, _setIsAuthorized] = React.useState<boolean>(false);
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
    base: "data-[selected=true]:font-semibold data-[selected=true]:opacity-100 data-[focus-visible=true]:bg-background/40 rounded-full opacity-25 cursor-default ",
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
    setIsSearching(true);
    const handler = setTimeout(async () => {
      const result = await fetchOsuSearch(filter);
      if ( result )
      {
        setData(result);
        setCursor({
          ...result.cursor,
          string: result.cursor_string
        });
      }
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [filter]);

  React.useEffect(()=>{
    const fetchData = async () => {
      const result = await fetchOsuSearch(filter);
      if ( result )
      {
        setData(result);
        setCursor({
          ...result.cursor,
          string: result.cursor_string
        });
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='absolute top-0 left-0 w-full h-max rounded-xl rounded-b-4xl' id='head-of-main-content'>
        <AnimatePresence>
        {
          data && data.beatmapsets[0] &&
          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            layoutId='backdrop-banner'
            className='w-full brightness-105 contrast-125 pointer-events-none select-none'
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
      <motion.section
        initial={{opacity:0, y: 20}}
        animate={{opacity:1, y: 0}}
        exit={{opacity:0, y: 20}}
        layoutId='search-filter'
        className={clsx(
          'w-full flex flex-col bg-content2 rounded-4xl z-10 -mb-6',
          fullscreenMode ? '' : 'max-w-4xl mt-8'
        )}
      >
        <div className='flex items-center justify-between w-full'>
          <h1 className='flex font-bold text-xl gap-3 items-center px-6 py-4'><MusicNoteIcon weight='fill' size={24} /> {language.data.pages.beatmap.list}</h1>
          <div className='flex items-center gap-2 pr-3'>
            <Tooltip content={fullscreenMode?language.data.pages.beatmap.filter.fullscreen.inactive:language.data.pages.beatmap.filter.fullscreen.active} classNames={{content:"text-xs"}} placement='bottom'>
              <Button radius='full' variant='light' isIconOnly onPress={() => setFullscreenMode(!fullscreenMode)}
                className={clsx(
                  fullscreenMode ? "bg-content3/20" : "bg-transparent"
                )}
              >
                {
                  fullscreenMode ? <ArrowsInSimpleIcon weight='bold' />
                  : <ArrowsOutSimpleIcon weight='bold' />
                }
              </Button>
            </Tooltip>
          </div>
        </div>
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
          <AnimatePresence>
          {
            (loading || isSearching) &&
            <motion.div
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              layoutId='search-loading-indicator'
              className='absolute top-0 left-0 w-full h-full z-20 rounded-xl rounded-b-4xl pointer-events-none overflow-hidden'>
              <Progress className='absolute top-0 left-0' size='sm' isIndeterminate/>
            </motion.div>
          }
          </AnimatePresence>
          <div>
            <Input placeholder={isAuthorized?language.data.pages.beatmap.filter.search.placeholder:language.data.pages.beatmap.filter.search.unauthorized} isDisabled={!isAuthorized} type="text" classNames={{
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
            <h1 className='px-2 -m-2 font-bold rounded-full text-xs text-background/60 bg-content4 absolute top-0 left-0 flex items-center gap-1 z-20'><FunnelIcon weight='fill' size={12} /> {language.data.pages.beatmap.filter.title}</h1>
            <div className={clsx(
              'osu-filter-grid',
              isAuthorized ? '' : 'pointer-events-none opacity-10'
            )}>
              <section className='osu-filter-grid-section'>
                <h1 className='osu-filter-grid-section-title'>{language.data.pages.beatmap.filter.only.title}</h1>
                <div className='osu-filter-grid-section-content'>
                  <CheckboxGroup isDisabled={!isAuthorized} size='sm' classNames={{wrapper: "gap-x-3"}} orientation='horizontal' onChange={(values) => {setFilter(prev_value => ({...prev_value, c: values.join(".")})),setCursor(null)}} defaultValue={[]}>
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
                  <RadioGroup isDisabled={!isAuthorized} size='sm' classNames={{wrapper: "gap-x-3"}} defaultValue={""} orientation='horizontal' onValueChange={(value) => (setFilter(prev_value => ({...prev_value, m: value})),setCursor(null))} isRequired>
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
                  <RadioGroup isDisabled={!isAuthorized} size='sm' classNames={{wrapper: "gap-x-3"}} defaultValue={""} orientation='horizontal' onValueChange={(value) => (setFilter(prev_value => ({...prev_value, s: value})),setCursor(null))} isRequired>
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
                  <RadioGroup isDisabled={!isAuthorized} size='sm' classNames={{wrapper: "gap-x-3"}} defaultValue={"false"} orientation='horizontal' onValueChange={(value) => {setFilter(prev_value => ({...prev_value, nsfw: value})),setCursor(null)}} isRequired>
                    <Radio classNames={filter_radio_classnames} value="false">{language.data.pages.beatmap.filter.hide}</Radio>
                    <Radio classNames={filter_radio_classnames} value="">{language.data.pages.beatmap.filter.show}</Radio>
                  </RadioGroup>
                </div>
              </section>
            </div>
            {
              !isAuthorized &&
              <div className='absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center bg-content3/50 rounded-2xl pointer-events-none'>
                <h1 className='font-semibold'>{language.data.pages.beatmap.filter.search.unauthorized}</h1>
              </div>
            }
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{opacity:0, y: 20}}
        animate={{opacity:1, y: 0}}
        exit={{opacity:0, y: 20}}
        transition={{delay:.1}}
        layoutId='beatmapsets-sort'
        className={clsx(
          'w-full flex items-center justify-between md:px-4 mt-3 -mb-2 z-10',
          fullscreenMode ? '' : 'max-w-4xl',
        )}
      >
        <div className='flex flex-1 items-center gap-2'>
          <h1 className='text-sm font-bold text-foreground/20'>{language.data.pages.beatmap.sort.title}</h1>
          <Select
            size='sm'
            isDisabled={!isAuthorized}
            classNames={{
              base: "w-full max-w-max text-xs",
              innerWrapper: "w-max",
              value: "text-xs mr-5 font-semibold",
              popoverContent: "w-max",
              listbox: "text-xs",
            }}
            defaultSelectedKeys={["rating_desc"]}
            disallowEmptySelection
            radius="full"
            onSelectionChange={(value) => {
              setIsSearching(true);
              setFilter(prev_value => ({
                ...prev_value,
                sort: value.currentKey
              }));
              setCursor(null);
            }}
          >
            <SelectSection showDivider title={language.data.pages.beatmap.sort.by.desc}>
              <SelectItem key="title_desc">{language.data.pages.beatmap.sort.options.title}</SelectItem>
              <SelectItem key="artist_desc">{language.data.pages.beatmap.sort.options.artist}</SelectItem>
              <SelectItem key="rating_desc">{language.data.pages.beatmap.sort.options.rated}</SelectItem>
              <SelectItem key="ranked_desc">{language.data.pages.beatmap.sort.options.ranked}</SelectItem>
              <SelectItem key="plays_desc">{language.data.pages.beatmap.sort.options.played}</SelectItem>
              <SelectItem key="favourites_desc">{language.data.pages.beatmap.sort.options.favorited}</SelectItem>
            </SelectSection>
            <SelectSection title={language.data.pages.beatmap.sort.by.asc}>
              <SelectItem key="title_asc">{language.data.pages.beatmap.sort.options.title}</SelectItem>
              <SelectItem key="artist_asc">{language.data.pages.beatmap.sort.options.artist}</SelectItem>
              <SelectItem key="rating_asc">{language.data.pages.beatmap.sort.options.rated}</SelectItem>
              <SelectItem key="ranked_asc">{language.data.pages.beatmap.sort.options.ranked}</SelectItem>
              <SelectItem key="plays_asc">{language.data.pages.beatmap.sort.options.played}</SelectItem>
              <SelectItem key="favourites_asc">{language.data.pages.beatmap.sort.options.favorited}</SelectItem>
            </SelectSection>
          </Select>
        </div>
        <div>
          <Tabs
            aria-label="ViewModeOptions" selectedKey={viewMode}
            onSelectionChange={(key: Key) => setViewMode(key.toString() as "list" | "grid")}
            className="w-max" size='sm'
            classNames={{
              base: "w-max",
              tab: "p-2",
              tabList: "flex items-center gap-1",
            }}
            variant='light'
          >
            <Tab key="list" title={<RowsIcon weight='fill' />} />
            <Tab key="grid" title={<SquaresFourIcon weight='fill' />} />
          </Tabs>
        </div>
      </motion.section>
      <AnimatePresence>
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: 20}}
          transition={{duration: 0.3}}
          layoutId='beatmapsets-list'
          className={clsx(
            'overflow-hidden w-full py-1',
            fullscreenMode ? 'mx-auto' : 'mx-auto max-w-4xl',
          )}
        >
          <section
            className={
              clsx('w-full flex flex-col md:px-8 z-10 apply-transition',
                isSearching ? 'pointer-events-none opacity-50' : '',
                fullscreenMode ? '' : 'max-w-4xl',
              )
            }
            data-view-mode={viewMode}
          >
          {
            data && data.beatmapsets.length > 0 ? (
              <div className='flex flex-wrap w-full gap-2'>
                {data.beatmapsets.map((beatmapset, index) => (
                  <BeatmapSet
                    key={`beatmapset-${index}-${beatmapset.id}`}
                    beatmapset={beatmapset}
                    classNames={{
                      layout: clsx(
                        viewMode === 'grid' ? fullscreenMode ? 'sm:max-w-[calc(25%_-_0.5rem)]' : 'sm:max-w-[calc(33.333%_-_0.333rem)]' : 'max-w-full',
                        viewMode === 'list' && fullscreenMode ? 'lg:max-w-[calc(33.333%_-_0.333rem)] xl:max-w-[calc(25%_-_0.5rem)]' : '',
                      )
                    }}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center h-64'>
                <p className='text-foreground/70 text-lg'>{language.data.pages.beatmap.no_results}</p>
              </div>
            )
          }
          </section>
        </motion.div>
      </AnimatePresence>
      <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
          onPress={async (e)=>{
            e.continuePropagation();
            if (cursor) {
              setIsSearching(true);
              const result = await fetchOsuSearch({
                ...filter,
                cursor_string: cursor.string
              });
              if (result && result.beatmapsets.length > 0) {
                const parsed_data: SearchResult = result;
                setData(prev => ({
                  ...parsed_data,
                  beatmapsets: [...(prev?.beatmapsets || []), ...parsed_data.beatmapsets],
                }));
                setCursor({
                  ...result.cursor,
                  string: result.cursor_string
                });
              } else {
                setError(new Error(language.data.pages.beatmap.load_more_error));
              }
            } else {
              setError(new Error(language.data.pages.beatmap.load_more_error));
            }
          }}
          isDisabled={loading || isSearching}
          style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-default)"} as React.CSSProperties}>
          <div className="animation-container">
            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
          </div>
          {
            loading ? <Spinner size='sm'/> : <WaveformIcon weight="bold" size={20} />
          }
          {language.data.pages.beatmap.load_more}
      </Button>
    </>
  )
}

export default Beatmapsets