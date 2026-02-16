import type React from "react";
import type { Metadata } from "next/types";
import { Inter } from "next/font/google";
import { Noto_Kufi_Arabic } from "next/font/google";
import { getDictionary } from "@/lib/i18n";
import { type Locale, i18n } from "@/lib/i18n/settings";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "@/app/globals.css";

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
  const locale = params.lang as Locale;
  const dict = await getDictionary(locale);

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
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;

  const { children } = props;
  const locale = params.lang as Locale;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar";

  return (
    <div lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <div
        className={`${inter.variable} ${notoKufiArabic.variable} font-sans min-h-screen flex flex-col`}
      >
        <header className="sticky top-0 z-40 flex items-center w-full border-b bg-background/95 backdrop-blur-sm">
          <Navbar lang={locale} dictionary={dict.navigation} />
        </header>
        <main className="flex-1">{children}</main>
        <Footer lang={locale} dictionary={dict.footer} />
      </div>
    </div>
  );
}
