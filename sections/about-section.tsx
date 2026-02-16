"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { Locale } from "@/lib/i18n/settings";
import { Check, Shield, Zap } from "lucide-react";

interface AboutSectionProps {
  lang: Locale;
  dictionary: {
    title: string;
    description: string;
    values: {
      title: string;
      description: string;
    }[];
  };
}

export function AboutSection({ lang, dictionary }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isRtl = lang === "ar";

  const icons = [
    <Check key="check" className="h-8 w-8 text-primary" />,
    <Zap key="zap" className="h-8 w-8 text-primary" />,
    <Shield key="shield" className="h-8 w-8 text-primary" />,
  ];

  return (
    <section ref={ref} className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className={`max-w-3xl mx-auto text-center`}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {dictionary.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {dictionary.description}
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {dictionary.values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className={`flex flex-col items-center text-center p-6 rounded-lg border ${isRtl ? "text-right" : "text-left"}`}
          >
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              {icons[index]}
            </div>
            <h3 className="text-xl font-bold">{value.title}</h3>
            <p className="mt-2 text-muted-foreground">{value.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
