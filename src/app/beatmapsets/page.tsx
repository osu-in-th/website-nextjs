"use client";
import clsx from 'clsx'
import React from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useLanguage } from '@/contexts/languageContext'
import { MagnifyingGlassIcon, MusicNoteIcon } from '@phosphor-icons/react/dist/ssr'
import { Image, Input, Progress } from '@heroui/react'
import { Cursor, SearchFilter, SearchResult } from '@/types/beatmap'

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
    nsfw: false,
    played: false,
    q: "",
    r: "",
    sort: "",
    s: "",
  });
  const [loading, setLoading] = React.useState(true);
  const [isSearching, setIsSearching] = React.useState(false);
  const [error, setError] = React.useState<unknown>(undefined);
  const filter_classname = "";

  const createPayload = (payload: SearchFilter): URL => {
    const endpoint = new URL(window.location.origin + "/api/proxy/osu/search");
    if (payload.e) endpoint.searchParams.set("e", payload.e);
    if (payload.c) endpoint.searchParams.set("c", payload.c);
    if (payload.g) endpoint.searchParams.set("g", payload.g);
    if (payload.l) endpoint.searchParams.set("l", payload.l);
    if (payload.m) endpoint.searchParams.set("m", payload.m);
    if (typeof payload.nsfw === 'boolean') endpoint.searchParams.set("nsfw", payload.nsfw.toString());
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
            className='w-full'
          >
            <Image src={data.beatmapsets[0].covers.cover} alt={data.beatmapsets[0].title}
              className={clsx("w-full max-h-96 object-cover blur-[128px] scale-125 -translate-y-24")}
              classNames={{
                wrapper: "w-full !max-w-none"
              }}
            />
          </motion.div>
        }
        </AnimatePresence>
      </div>
      <section className='w-full max-w-2xl flex flex-col bg-content2 rounded-4xl mt-8 z-10'>
        <h1 className='flex font-bold text-xl gap-3 items-center px-6 py-4'><MusicNoteIcon weight='fill' size={24} /> {language.data.pages.beatmap.list}</h1>
        <div className='flex flex-col gap-2 p-6 rounded-xl rounded-b-4xl bg-content3/20 relative'>
          {
            (loading || isSearching) && <Progress className='absolute top-0 left-0' size='sm' isIndeterminate/>
          }
          <div>
            <Input placeholder="Please sign in to search" isDisabled={true} type="text" classNames={{
              input: "text-sm"
            }}
            variant={filter.q ? "bordered" : "flat"}
            endContent={<MagnifyingGlassIcon className='text-foreground/40' weight='bold' size={16} />}
              onChange={(e) => {
                setIsSearching(true);
                setFilter(value=>{
                  return {
                    ...value,
                    q: e.target.value,
                    cursor_string: ""
                  }
                })
              }}
            />
          </div>
          <div className={clsx(filter_classname)}>

          </div>
        </div>
      </section>
      <section className='w-full max-w-2xl flex flex-col px-8 z-10'>
      </section>
    </>
  )
}

export default Beatmapsets