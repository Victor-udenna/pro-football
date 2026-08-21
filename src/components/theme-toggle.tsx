"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme, type Theme } from "@/components/providers/theme-provider";

const NEXT_THEME: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const THEME_ICON: Record<Theme, typeof SunIcon> = {
  system: MonitorIcon,
  light: SunIcon,
  dark: MoonIcon,
};

const THEME_LABEL: Record<Theme, string> = {
  system: "System theme",
  light: "Light theme",
  dark: "Dark theme",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const Icon = THEME_ICON[theme];

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => setTheme(NEXT_THEME[theme])}
      aria-label={`${THEME_LABEL[theme]} — click to switch`}
    >
      <Icon className="size-4" />
    </Button>
  );
}
