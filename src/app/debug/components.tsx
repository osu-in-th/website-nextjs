"use client";
import { createNotification } from "@/components/notify";
import { useLanguage } from "@/contexts/languageContext";
import { Button } from "@heroui/react";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr";

export default function Components() {
  const { language } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-items-center px-4 gap-4">
      <title>{language.data.site.title.debug} - {language.data.site.osu}</title>
      <h1>Buttons</h1>
      <div className="flex items-center gap-6">
        <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
          style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-default)"} as React.CSSProperties}>
          <div className="animation-container">
            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
          </div>
          Button
        </Button>
        <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
          style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-primary)"} as React.CSSProperties}>
          <div className="animation-container">
            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
          </div>
          Button
        </Button>
        <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
          style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-secondary)"} as React.CSSProperties}>
          <div className="animation-container">
            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
          </div>
          Button
        </Button>
        <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
          style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-success)"} as React.CSSProperties}>
          <div className="animation-container">
            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
          </div>
          Button
        </Button>
        <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
          style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-warning)"} as React.CSSProperties}>
          <div className="animation-container">
            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
          </div>
          Button
        </Button>
        <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
          style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-danger)"} as React.CSSProperties}>
          <div className="animation-container">
            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
          </div>
          Button
        </Button>
      </div>
      <h1>Notify</h1>
      <div className="flex items-center gap-6">
        <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
          style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-primary)"} as React.CSSProperties}
          onPress={()=>{
            createNotification("left", InfoIcon, "Test Notify!")
          }}>
          <div className="animation-container">
            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
          </div>
          Create Minimal Left Notify
        </Button>
        <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
          style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-primary)"} as React.CSSProperties}
          onPress={()=>{
            createNotification("right", InfoIcon, "Test Notify!")
          }}>
          <div className="animation-container">
            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
          </div>
          Create Minimal Right Notify
        </Button>
      </div>
      <div className="flex items-center gap-6">
        <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
          style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-primary)"} as React.CSSProperties}
          onPress={()=>{
            createNotification("left", InfoIcon, "Test Notify!", "This is a test notify")
          }}>
          <div className="animation-container">
            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
          </div>
          Create Left Notify
        </Button>
        <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
          style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-primary)"} as React.CSSProperties}
          onPress={()=>{
            createNotification("right", InfoIcon, "Test Notify!", "This is a test notify")
          }}>
          <div className="animation-container">
            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
          </div>
          Create Right Notify
        </Button>
      </div>
      <div className="flex items-center gap-6">
        <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
          style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-primary)"} as React.CSSProperties}
          onPress={()=>{
            createNotification("left", InfoIcon, "Test Notify!", "This is a test notify", 10000)
          }}>
          <div className="animation-container">
            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
          </div>
          Create Left Notify with Timeout Interval
        </Button>
        <Button className="osu-style active-border-effect hover-effect animation-wrapper group" radius="full"
          style={{"--osu-theme-button-background-color-hsl": "var(--osu-theme-primary)"} as React.CSSProperties}
          onPress={()=>{
            createNotification("right", InfoIcon, "Test Notify!", "This is a test notify", 10000)
          }}>
          <div className="animation-container">
            <div className="osu-animate-background opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 group-hover:opacity-100"></div>
          </div>
          Create Right Notify with Timeout Interval
        </Button>
      </div>
    </div>
  );
}
