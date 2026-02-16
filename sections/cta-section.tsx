"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/settings";

interface CtaSectionProps {
  lang: Locale;
  dictionary: {
    title: string;
    description: string;
    button: string;
  };
}

export function CtaSection({ lang, dictionary }: CtaSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isRtl = lang === "ar";

  return (
    <section ref={ref} className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className={` md:p-8 p-2 relative text-center ${
          isRtl ? "text-right" : "text-left"
        }`}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3356.6675133201466!2d12.813753375660356!3d32.721461673686925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzLCsDQzJzE3LjMiTiAxMsKwNDgnNTguOCJF!5e0!3m2!1sen!2sly!4v1767812841063!5m2!1sen!2sly"
          width="600"
          height="450"
          style={{
            border: "0",
            width: "100%",
            borderRadius: "0.5rem",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <Link
          href="https://maps.app.goo.gl/y9mVZiLM1A6sgumm8"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <Button className="absolute bottom-10 right-1/2 transform translate-x-1/2">
            {lang === "en" ? "Get Directions" : "احصل على الاتجاهات"}
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
