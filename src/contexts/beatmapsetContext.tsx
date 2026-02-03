"use client";
import { BeatmapSet } from "@/types/beatmap";
import { motion } from "framer-motion";
import React from "react";

export interface BeatmapSetContext {
    layoutId: string;
    beatmapset: BeatmapSet;
}

const BeatmapsetContext = React.createContext<{
    layoutId?: string;
    setFocused: boolean;
    beatmapset: BeatmapSetContext | null;
    setBeatmapset: React.Dispatch<React.SetStateAction<BeatmapSetContext | null>>;
    setSetFocused: React.Dispatch<React.SetStateAction<boolean>>;
    setLayoutId: React.Dispatch<React.SetStateAction<string>>;
}>({
    layoutId: "",
    setFocused: false,
    beatmapset: null,
    setBeatmapset: () => {},
    setSetFocused: () => {},
    setLayoutId: () => {},
});

export const BeatmapsetContextProvider = ({children}: {children: React.ReactNode}) => {
    const [beatmapset, setBeatmapset] = React.useState<BeatmapSetContext | null>(null);
    const [setFocused, setSetFocused] = React.useState<boolean>(false);
    const [layoutId, setLayoutId] = React.useState<string>("");

    return (
        <BeatmapsetContext.Provider value={{
            layoutId, setLayoutId,
            beatmapset, setBeatmapset,
            setFocused, setSetFocused
        }}>
            {children}
            {
                beatmapset &&
                <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    layoutId={beatmapset.layoutId}
                    className="fixed top-0 left-0 w-full h-full"
                >
                    
                </motion.div>
            }
        </BeatmapsetContext.Provider>
    )
}

export const useBeatmapset = () => React.useContext(BeatmapsetContext);