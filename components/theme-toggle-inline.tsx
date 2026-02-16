"use client";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function ThemeToggleInline() {
  const { setTheme, theme } = useTheme();

  const themes = [
    { name: "light", icon: Sun },
    { name: "dark", icon: Moon },
    { name: "system", icon: Monitor },
  ];

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <div className="flex items-center rounded-lg border p-1 bg-background">
      {themes.map(({ name, icon: Icon }) => (
        <Button
          key={name}
          variant={name === theme ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setTheme(name)}
        >
          <Icon className="h-2 w-2" />
        </Button>
      ))}
    </div>
  );
}
