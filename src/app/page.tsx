"use client";

import communityArts from "@/data/community-arts.json";
import WIP from "@/components/wip";
import { useLanguage } from "@/contexts/languageContext";
import { Button, Chip, Image } from "@heroui/react";
import {
  ArrowUpRightIcon,
  DownloadSimpleIcon,
  InfoIcon,
  MusicNoteIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import SplitText from "@/components/ui/SplitText";
import { AnimatePresence, motion } from "framer-motion";
import hero from "@/styles/hero";

export default function Home() {
  const { language } = useLanguage();
  const router = useRouter();
  const [hero_bg_image, setHeroBgImage] = React.useState(communityArts[0]);
  const [hero_text_finished, setHeroTextFinished] = React.useState(false);
  const [hero_text_p_finished, setHeroTextPFinished] = React.useState(false);

  React.useEffect(() => {
    const random_int = Math.floor(Math.random() * communityArts.length);
    setHeroBgImage(communityArts[random_int]);
  }, []);

  return (
    <>
      <section
        id="head-of-main-content"
        className="flex flex-col items-center justify-items-center w-screen min-h-96 h-[64vh] max-h-[640px] -mt-[6.4rem] p-8 pb-20 gap-6 sm:p-20 relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          key="index-landingpage-hero-bg"
          className="absolute top-0 left-0 h-full w-full"
        >
          <Image
            src={"https://static.osu.in.th/images/" + hero_bg_image.filename}
            className="w-full h-full object-cover rounded-none"
            classNames={{
              wrapper:
                "h-full w-full !max-w-none overflow-hidden rounded-none rounded-b-4xl",
            }}
          />
          <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-black/80" />
          <span className="absolute text-xs font-bold opacity-20 bottom-4 left-4 z-40 select-none text-shadow-lg">
            {language.data.pages.home.imageby}{" "}
            <Link href={hero_bg_image.author.url} target="_blank">
              {hero_bg_image.author.name}
            </Link>
          </span>
        </motion.div>
        <div className="z-10 w-full max-w-3xl h-full flex flex-col gap-4 items-center justify-center mt-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 3 }}
            exit={{ opacity: 0 }}
            key="index-landingpage-hero-disclaimer"
            className="w-full flex gap-2"
          >
            <Chip
              startContent={<InfoIcon weight="bold" />}
              classNames={{
                content: "font-semibold text-xs",
              }}
              color="success"
            >
              {language.data.pages.home.disclaimer}
            </Chip>
            <Link
              href="https://osu.ppy.sh"
              target="_blank"
              className="rounded-full"
            >
              <Chip
                endContent={<ArrowUpRightIcon />}
                classNames={{
                  content: "font-semibold text-xs",
                }}
                color="default"
              >
                osu.ppy.sh
              </Chip>
            </Link>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
            exit={{ opacity: 0 }}
            key="index-landingpage-hero-h1"
            id="head-of-main-content"
            className="font-extrabold text-7xl w-full"
          >
            {hero_text_finished ? (
              language.data.site.name
            ) : (
              <SplitText
                text={language.data.site.name}
                delay={20}
                duration={1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={() => setHeroTextFinished(true)}
              />
            )}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, marginTop: -24 }}
            animate={{
              opacity: 1,
              marginTop: 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1.2 }}
            exit={{ opacity: 0 }}
            key="index-landingpage-hero-p"
            id="head-of-main-content"
            className="font-semibold text-2xl w-full -mt-6"
          >
            {hero_text_finished && hero_text_p_finished ? (
              language.data.site.description
            ) : (
              <SplitText
                text={language.data.site.description}
                delay={20}
                duration={1}
                ease="elastic.out"
                splitType="chars"
                from={{ opacity: 0, y: 10 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={() => setHeroTextPFinished(true)}
              />
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1.7 }}
            exit={{ opacity: 0 }}
            key="index-landingpage-hero-cta"
            id="head-of-main-content"
            className="w-full flex flex-wrap items-center gap-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.24,
                delay: 2.0,
                type: "spring",
                stiffness: 100,
              }}
              exit={{ opacity: 0 }}
              key="index-landingpage-hero-cta-download"
            >
              <Link href="/download" tabIndex={-1}>
                <Button
                  className="osu-style active-border-effect hover-effect animation-wrapper group"
                  radius="full"
                  tabIndex={0}
                  onPress={(e) => (
                    e.continuePropagation(),
                    router.push("/download")
                  )}
                  style={
                    {
                      "--osu-theme-button-background-color-hsl":
                        "var(--osu-theme-primary)",
                    } as React.CSSProperties
                  }
                >
                  <div className="animation-container">
                    <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
                  </div>
                  <DownloadSimpleIcon weight="fill" />
                  {language.data.words.download} {language.data.site.osu}
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.24,
                delay: 2.1,
                type: "spring",
                stiffness: 100,
              }}
              exit={{ opacity: 0 }}
              key="index-landingpage-hero-cta-beatmapsets"
            >
              <Link href="/beatmapsets" tabIndex={-1}>
                <Button
                  className="osu-style active-border-effect hover-effect animation-wrapper group"
                  radius="full"
                  tabIndex={0}
                  onPress={(e) => (
                    e.continuePropagation(),
                    router.push("/beatmapsets")
                  )}
                  style={
                    {
                      "--osu-theme-button-background-color-hsl":
                        "var(--osu-theme-secondary)",
                    } as React.CSSProperties
                  }
                >
                  <div className="animation-container">
                    <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
                  </div>
                  <MusicNoteIcon weight="fill" />
                  {language.data.pages.home.links.beatmap}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section>
        <WIP />
      </section>
    </>
  );
}
