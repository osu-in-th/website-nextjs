"use client";
import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-6 sm:p-20">
      <title>หน้าหลัก - โอสุ.ไทย!</title>
      <h1 id="head-of-main-content">Hey app!</h1>
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
    </div>
  );
}
