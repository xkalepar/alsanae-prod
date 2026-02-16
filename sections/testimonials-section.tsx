"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n/settings";
import { Quote } from "lucide-react";

interface TestimonialsSectionProps {
  lang: Locale;
  dictionary: {
    title: string;
    description: string;
  };
}

export function TestimonialsSection({
  lang,
  dictionary,
}: TestimonialsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isRtl = lang === "ar";

  const testimonials = [
    {
      quote:
        lang === "en"
          ? "BuildMaster delivered our office complex on time and within budget. Their attention to detail and quality of work exceeded our expectations."
          : "قامت بيلد ماستر بتسليم مجمع المكاتب الخاص بنا في الوقت المحدد وضمن الميزانية. لقد تجاوز اهتمامهم بالتفاصيل وجودة العمل توقعاتنا.",
      author: lang === "en" ? "Sarah Johnson" : "سارة جونسون",
      position:
        lang === "en"
          ? "CEO, Tech Innovations"
          : "الرئيس التنفيذي، تك إنوفيشنز",
    },
    {
      quote:
        lang === "en"
          ? "We've worked with BuildMaster on multiple projects, and they consistently deliver exceptional results. Their team is professional, skilled, and a pleasure to work with."
          : "لقد عملنا مع بيلد ماستر في مشاريع متعددة، وهم يقدمون باستمرار نتائج استثنائية. فريقهم محترف وماهر ومن الممتع العمل معه.",
      author: lang === "en" ? "Ahmed Al-Farsi" : "أحمد الفارسي",
      position:
        lang === "en" ? "Director, Gulf Development" : "مدير، الخليج للتطوير",
    },
    {
      quote:
        lang === "en"
          ? "The residential complex BuildMaster constructed for us has become the benchmark for quality in our region. Their innovative approach and commitment to sustainability made all the difference."
          : "أصبح المجمع السكني الذي بنته بيلد ماستر لنا معيارًا للجودة في منطقتنا. نهجهم المبتكر والتزامهم بالاستدامة أحدث فرقًا كبيرًا.",
      author: lang === "en" ? "Maria Rodriguez" : "ماريا رودريغيز",
      position: lang === "en" ? "Property Developer" : "مطور عقارات",
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

      <div className="mt-16 container grid grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent
                className={`pt-6 ${isRtl ? "text-right" : "text-left"}`}
              >
                <Quote className="h-8 w-8 text-primary/60 mb-4" />
                <p className="text-muted-foreground">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-6 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt={testimonial.author}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className={`${isRtl ? "mr-3" : "ml-3"}`}>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
