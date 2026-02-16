"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/settings";
import { Building2, Factory, Home, PenTool, Ruler, Wrench } from "lucide-react";

interface ServicesSectionProps {
  lang: Locale;
  dictionary: {
    title: string;
    description: string;
    cta: string;
  };
}

export function ServicesSection({ lang, dictionary }: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isRtl = lang === "ar";

  const services = [
    {
      icon: <Home className="h-8 w-8 text-primary" />,
      title: lang === "en" ? "Residential Construction" : "البناء السكني",
      description:
        lang === "en"
          ? "Custom homes, apartments, and residential complexes built to the highest standards."
          : "منازل مخصصة وشقق ومجمعات سكنية مبنية وفقًا لأعلى المعايير.",
    },
    {
      icon: <Building2 className="h-8 w-8 text-primary" />,
      title: lang === "en" ? "Commercial Construction" : "البناء التجاري",
      description:
        lang === "en"
          ? "Office buildings, retail spaces, and commercial facilities designed for success."
          : "مباني المكاتب والمساحات التجارية والمرافق التجارية المصممة للنجاح.",
    },
    {
      icon: <Factory className="h-8 w-8 text-primary" />,
      title: lang === "en" ? "Industrial Construction" : "البناء الصناعي",
      description:
        lang === "en"
          ? "Factories, warehouses, and industrial facilities built for efficiency and durability."
          : "المصانع والمستودعات والمرافق الصناعية المبنية للكفاءة والمتانة.",
    },
    {
      icon: <Wrench className="h-8 w-8 text-primary" />,
      title:
        lang === "en" ? "Renovation & Remodeling" : "التجديد وإعادة التصميم",
      description:
        lang === "en"
          ? "Transform existing spaces with our expert renovation and remodeling services."
          : "تحويل المساحات الموجودة مع خدمات التجديد وإعادة التصميم الخبيرة لدينا.",
    },
    {
      icon: <PenTool className="h-8 w-8 text-primary" />,
      title: lang === "en" ? "Architectural Design" : "التصميم المعماري",
      description:
        lang === "en"
          ? "Creative and functional architectural designs tailored to your vision."
          : "تصاميم معمارية إبداعية وعملية مصممة خصيصًا لرؤيتك.",
    },
    {
      icon: <Ruler className="h-8 w-8 text-primary" />,
      title: lang === "en" ? "Construction Consultation" : "استشارات البناء",
      description:
        lang === "en"
          ? "Expert advice and consultation for all your construction projects."
          : "نصائح واستشارات خبيرة لجميع مشاريع البناء الخاصة بك.",
    },
  ];

  return (
    <section ref={ref} className=" py-16 bg-muted/30 rounded-xl">
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

      <div className="mt-16 container grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            className={`flex flex-col p-6 bg-background rounded-lg border shadow-2xs ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="mt-2 text-muted-foreground flex-1">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <Link href={`/${lang}/services`}>
          <Button size="lg">{dictionary.cta}</Button>
        </Link>
      </motion.div>
    </section>
  );
}
