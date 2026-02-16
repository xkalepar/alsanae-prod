"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Building, Menu } from "lucide-react";
import type { Locale } from "@/lib/i18n/settings";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";

interface NavbarProps {
  lang: Locale;
  dictionary: {
    home: string;
    projects: string;
    services: string;
    // timeline: string;
    quote: string;
    contact: string;
  };
}

export function Navbar({ lang, dictionary }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isRtl = lang === "ar";

  const routes = [
    { href: `/${lang}`, label: dictionary.home },
    { href: `/${lang}/projects`, label: dictionary.projects },
    { href: `/${lang}/services`, label: dictionary.services },
    // { href: `/${lang}/timeline`, label: dictionary.timeline },
    // { href: `/${lang}/quote`, label: dictionary.quote },
    { href: `/${lang}/contact`, label: dictionary.contact },
    // { href: `/${lang}/projects`, label: dictionary.projects },
  ];

  return (
    <div className="flex h-20 container items-center justify-between w-full">
      <Link href={`/${lang}`} className="flex items-center gap-2">
        <Image src={"/logo.png"} alt="Logo" width={72} height={72} />
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === route.href
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>

      <div className="md:flex hidden  items-center gap-2">
        <LanguageSwitcher lang={lang} />
        <ThemeToggle />
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent dir={lang === "ar" ? "rtl" : "ltr"} side={"top"}>
          <SheetHeader>
            <SheetTitle>
              <Link href={`/${lang}`} className="flex items-center gap-2 mb-10">
                <Building className="h-6 w-6" />
                <span className="font-bold text-lg">BuildMaster</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  pathname === route.href
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
          <SheetFooter>
            <div className="flex flex-col items-center gap-4 w-full justify-between mt-4">
              <LanguageSwitcher
                size={"default"}
                arabicLabel="العربية"
                englishLabel="English"
                lang={lang}
              />
              <ThemeToggle />
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
