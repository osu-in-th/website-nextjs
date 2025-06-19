"use client";

import communityArts from "@/data/community-arts.json";
import WIP from "@/components/wip";
import { useLanguage } from "@/contexts/languageContext";
import { Button, Chip, Image } from "@heroui/react";
import { ArrowUpRightIcon, DownloadSimpleIcon, InfoIcon, MusicNoteIcon } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function Home() {
  const {language} = useLanguage();
  const router = useRouter();
  const [hero_bg_image, setHeroBgImage] = React.useState(communityArts[0]);

  React.useEffect(()=>{
    const random_int = Math.floor(Math.random() * communityArts.length);
    setHeroBgImage(communityArts[random_int]);
  }, [])

  return (
    <>
      <section id="head-of-main-content" className="flex flex-col items-center justify-items-center w-screen min-h-96 h-[64vh] max-h-[640px] -mt-24 p-8 pb-20 gap-6 sm:p-20 relative">
        <div className="absolute top-0 left-0 h-full w-full">
          <Image src={"https://static.osu.in.th/images/"+hero_bg_image.filename} className="w-full h-full object-cover rounded-none" classNames={{
            wrapper: "h-full w-full !max-w-none overflow-hidden rounded-none rounded-b-4xl"
          }} />
          <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-black/80" />
          <span className="absolute font-bold opacity-60 bottom-4 left-4 z-40 select-none text-shadow-lg">{language.data.pages.home.imageby} <Link href={hero_bg_image.author.url} target="_blank">{hero_bg_image.author.name}</Link></span>
        </div>
        <div className="z-10 w-full max-w-3xl h-full flex flex-col gap-4 items-center justify-center mt-24">
          <div className="w-full flex gap-2">
            <Chip startContent={<InfoIcon weight="bold" />} classNames={{
              content: "font-semibold text-xs"
            }} color="success">{language.data.pages.home.disclaimer}</Chip>
            <Link href="https://osu.ppy.sh" target="_blank" className="rounded-full">
              <Chip endContent={<ArrowUpRightIcon />} classNames={{
                content: "font-semibold text-xs"
              }} color="default">osu.ppy.sh</Chip>
            </Link>
          </div>
          <h1 id="head-of-main-content" className="font-extrabold text-7xl w-full">{language.data.site.name}</h1>
          <p id="head-of-main-content" className="font-semibold text-2xl w-full">{language.data.site.description}</p>
          <div className="w-full flex flex-wrap items-center gap-4">
            <Link href="/download" tabIndex={-1}>
              <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full" tabIndex={0}
                onPress={(e)=>(e.continuePropagation(),router.push("/download"))}
                style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-primary)"} as React.CSSProperties}>
                <div className="animation-container">
                  <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
                </div>
                <DownloadSimpleIcon weight="fill" />
                {language.data.words.download} {language.data.site.osu}
              </Button>
            </Link>
            <Link href="/beatmapsets" tabIndex={-1}>
              <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full" tabIndex={0}
                onPress={(e)=>(e.continuePropagation(),router.push("/beatmapsets"))}
                style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-secondary)"} as React.CSSProperties}>
                <div className="animation-container">
                  <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
                </div>
                <MusicNoteIcon weight="fill" />
                {language.data.pages.home.links.beatmap}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section>
        <WIP />
      </section>
    </>
  );
}
