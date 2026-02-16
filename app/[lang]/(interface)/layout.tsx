import type React from "react";
import type { Metadata } from "next/types";
import { Inter } from "next/font/google";
import { Noto_Kufi_Arabic } from "next/font/google";
import { getDictionary } from "@/lib/i18n";
import { type Locale, i18n } from "@/lib/i18n/settings";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "@/app/globals.css";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi-arabic",
});

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;

  const { children } = props;

  const dict = await getDictionary(params.lang);
  const isRtl = params.lang === "ar";

  return (
    <div lang={params.lang} dir={isRtl ? "rtl" : "ltr"}>
      <div
        className={`${inter.variable} ${notoKufiArabic.variable} font-sans min-h-screen flex flex-col`}
      >
        <header className="sticky top-0 z-40 flex items-center w-full border-b bg-background/95 backdrop-blur-sm">
          <Navbar lang={params.lang} dictionary={dict.navigation} />
        </header>
        <main className="flex-1">{children}</main>
        <Footer lang={params.lang} dictionary={dict.footer} />
      </div>
    </div>
  );
}
