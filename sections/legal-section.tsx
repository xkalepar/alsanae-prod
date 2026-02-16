"use client";

import { motion } from "motion/react";
import { useParams } from "next/navigation";

export function LegalSection({}) {
  const { lang } = useParams();
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-8"
          dir="rtl"
        >
          {/* Title */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              {lang === "ar"
                ? "معلومات قانونية هامة"
                : "Important Legal Information"}
            </h2>

            <p className="text-primary-foreground/80 text-lg">
              {lang === "ar"
                ? "جميع البيانات التالية مسجلة رسمياً وفق الأنظمة المعمول بها"
                : "All the following data is officially registered according to the applicable regulations"}
            </p>
          </div>

          {/* Legal Info Cards */}
          <div
            className="grid gap-6 md:grid-cols-3 text-start"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <div className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm border border-primary-foreground/20">
              <p className="text-sm opacity-80 mb-2">
                {lang === "ar" ? "رقم القيد" : "Registration Number"}
              </p>
              <p className="text-xl font-semibold">05010202545823</p>
            </div>

            <div className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm border border-primary-foreground/20">
              <p className="text-sm opacity-80 mb-2">
                {lang === "ar" ? "رقم الترخيص" : "License Number"}
              </p>
              <p className="text-xl font-semibold">36205</p>
            </div>

            <div className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm border border-primary-foreground/20">
              <p className="text-sm opacity-80 mb-2">
                {lang === "ar" ? "العنوان" : "Address"}
              </p>
              <p className="text-xl font-semibold">
                {lang === "ar"
                  ? "الزاوية - الطريق الساحلي جودايم"
                  : "Al-Zawiya - Coastal Road, Joudaim"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
