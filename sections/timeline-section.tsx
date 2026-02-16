"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/settings";

interface TimelineSectionProps {
  lang: Locale;
  dictionary: {
    title: string;
    description: string;
    cta: string;
  };
}

export function TimelineSection({ lang, dictionary }: TimelineSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isRtl = lang === "ar";

  const timelineItems = [
    {
      year: "2023",
      title: lang === "en" ? "City Center Tower" : "برج وسط المدينة",
      status: lang === "en" ? "In Progress" : "قيد التنفيذ",
    },
    {
      year: "2022",
      title: lang === "en" ? "Green Valley Residences" : "مساكن الوادي الأخضر",
      status: lang === "en" ? "Completed" : "مكتمل",
    },
    {
      year: "2021",
      title: lang === "en" ? "Tech Hub Campus" : "حرم مركز التكنولوجيا",
      status: lang === "en" ? "Completed" : "مكتمل",
    },
    {
      year: "2020",
      title: lang === "en" ? "Harbor Bridge" : "جسر الميناء",
      status: lang === "en" ? "Completed" : "مكتمل",
    },
  ];

  return (
    <section ref={ref} className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {dictionary.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {dictionary.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 text-center"
      >
        <Link href={`/${lang}/timeline`}>
          <Button size="lg">{dictionary.cta}</Button>
        </Link>
      </motion.div>
    </section>
  );
}
