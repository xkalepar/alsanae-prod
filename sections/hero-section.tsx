"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/settings";

interface HeroSectionProps {
  lang: Locale;
  dictionary: {
    title: string;
    subtitle: string;
    cta: string;
  };
}

export function HeroSection({ lang, dictionary }: HeroSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isRtl = lang === "ar";

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Construction site"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative z-10 flex h-full flex-col justify-center">
        <div ref={ref} className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            {dictionary.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`mt-6 text-xl text-white/90 ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            {dictionary.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`mt-10 ${isRtl ? "text-right" : "text-left"}`}
          >
            <Link href={`/${lang}/projects`}>
              <Button size="lg" className="text-lg">
                {dictionary.cta}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
