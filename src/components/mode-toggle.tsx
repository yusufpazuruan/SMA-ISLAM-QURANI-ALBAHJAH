"use client";

import { useId, useState } from "react";
import { RiMoonClearLine, RiSunLine } from "@remixicon/react";
import { useTheme } from "@/components/theme-provider";
import { Label } from "./ui/label";

export function ModeToggle() {
  const id = useId();
  const { theme, setTheme } = useTheme();
  const [system, setSystem] = useState(false);

  const smartToggle = () => {
    /* The smart toggle by @nrjdalal */
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (theme === "system") {
      setTheme(prefersDarkScheme ? "light" : "dark");
      setSystem(false);
    } else if (
      (theme === "light" && !prefersDarkScheme) ||
      (theme === "dark" && prefersDarkScheme)
    ) {
      setTheme(theme === "light" ? "dark" : "light");
      setSystem(false);
    } else {
      setTheme("system");
      setSystem(true);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <input
        type="checkbox"
        name="theme-toggle"
        id={id}
        className="peer sr-only"
        checked={system}
        onChange={smartToggle}
        aria-label="Toggle dark mode"
      />
      <label
        className="text-muted-foreground hover:text-foreground/80 peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 relative inline-flex size-9 cursor-pointer items-center justify-center rounded transition-[color,box-shadow] outline-none peer-focus-visible:ring-[3px]"
        htmlFor={id}
        aria-hidden="true"
      >
        <RiSunLine className="dark:hidden" size={20} aria-hidden="true" />
        <RiMoonClearLine
          className="hidden dark:block"
          size={20}
          aria-hidden="true"
        />
        <span className="sr-only">Switch to system/light/dark version</span>
      </label>
    </div>
  );
}
export function ModeToggleSvg() {
  const id = useId();
  const { theme, setTheme } = useTheme();
  const [system, setSystem] = useState(false);

  const smartToggle = () => {
    /* The smart toggle by @nrjdalal */
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (theme === "system") {
      setTheme(prefersDarkScheme ? "light" : "dark");
      setSystem(false);
    } else if (
      (theme === "light" && !prefersDarkScheme) ||
      (theme === "dark" && prefersDarkScheme)
    ) {
      setTheme(theme === "light" ? "dark" : "light");
      setSystem(false);
    } else {
      setTheme("system");
      setSystem(true);
    }
  };

  return (
    <>
      <Label htmlFor={id}>Select the theme for the dashboard.</Label>
      <div className="mt-6">
        <input
          type="checkbox"
          name="theme-toggle"
          id={id}
          className="peer sr-only"
          checked={system}
          onChange={smartToggle}
          aria-label="Toggle dark mode"
        />

        <label
          className="text-muted-foreground hover:text-foreground/80 peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 relative  size-9 cursor-pointer items-center justify-center rounded transition-[color,box-shadow] outline-none peer-focus-visible:ring-[3px]"
          htmlFor={id}
          aria-hidden="true"
        >
          <div className="flex items-center space-x-4">
            <div>
              <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Light
              </span>
            </div>
            <div>
              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Dark
              </span>
            </div>
          </div>
        </label>
      </div>
    </>
  );
}
