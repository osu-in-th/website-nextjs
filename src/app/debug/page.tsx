"use client";
import { useLanguage } from "@/contexts/languageContext";
import { Button, Card, CardBody, Tab, Tabs } from "@heroui/react";
import { BugIcon, InfoIcon } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import Components from "./components";

export default function Home() {
  const { language } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-6 sm:p-20">
        <h1 className="flex items-center font-bold text-3xl gap-4 w-full max-w-4xl" id="head-of-main-content"><BugIcon weight="bold" size={48} /> {language.data.site.title.debug}</h1>
        <div className="w-full max-w-4xl">
            <Tabs aria-label="Debug" variant="light" color="primary" size="lg" isVertical
                classNames={{
                    cursor: "osu-animate-background osu-style rounded-full",
                    tab: "font-bold text-sm p-6",
                    panel: "px-12"
                }}
            >
                <Tab key="components" title="Components">
                    <Components />
                </Tab>
                <Tab key="info" title="Info">
                    <Card>
                        <CardBody>
                            <h1 className="font-bold flex items-center gap-2"><InfoIcon weight="bold" size={24} /> App Information</h1>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    </div>
  );
}
