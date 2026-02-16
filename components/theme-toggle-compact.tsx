"use client"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggleCompact() {
  const { setTheme, theme } = useTheme()

  const themes = [
    { name: "light", icon: Sun },
    { name: "dark", icon: Moon },
    { name: "system", icon: Monitor },
  ]

  return (
    <div className="flex items-center rounded-md border bg-background p-0.5">
      {themes.map(({ name, icon: Icon }) => (
        <Button
          key={name}
          variant="ghost"
          size="icon"
          onClick={() => setTheme(name)}
          className={cn(
            "h-7 w-7 transition-all",
            theme === name
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          <span className="sr-only">Set {name} theme</span>
        </Button>
      ))}
    </div>
  )
}
