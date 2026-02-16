"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { type Locale } from "@/lib/i18n/settings";

interface LanguageSwitcherProps {
  lang: Locale;
  englishLabel?: string;
  arabicLabel?: string;
  size?: "default" | "sm" | "lg" | "icon" | null;
}

export function LanguageSwitcher({
  lang,
  arabicLabel = "عربي",
  englishLabel = "english",
  size = "sm",
}: LanguageSwitcherProps) {
  const pathName = usePathname();
  const router = useRouter();

  const switchLanguage = (newLocale: Locale) => {
    if (lang === newLocale) return;

    const newPath = pathName.replace(`/${lang}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {/* <Languages className="h-4 w-4" /> */}
      <div className="flex gap-1">
        {/* {i18n.locales.map((locale) => (
         
        ))} */}
        <Button
          // variant={locale === lang ? "default" : "ghost"}
          size={size}
          onClick={() => switchLanguage(lang === "en" ? "ar" : "en")}
          className="h-8 px-3"
        >
          {lang !== "en" ? englishLabel : arabicLabel}
        </Button>
      </div>
    </div>
  );
}
