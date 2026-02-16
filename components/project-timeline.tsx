"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n/settings";
import { Calendar, CheckCircle, Clock } from "lucide-react";

import type { Milestone } from "@/generated/prisma/client";

interface ProjectTimelineProps {
  startDate: Date | null;
  endDate: Date | null;
  milestones: Milestone[];
  lang: Locale;
}

export function ProjectTimeline({
  startDate,
  endDate,
  milestones,
  lang,
}: ProjectTimelineProps) {
  const isRtl = lang === "ar";
  const now = new Date();
  const isOngoing = endDate ? endDate > now : true;

  // Default milestones if none provided (Date|null safe)
  const baseStart = startDate ?? new Date();
  const baseEnd =
    endDate ?? new Date(baseStart.getTime() + 180 * 24 * 60 * 60 * 1000);

  const defaultMilestones: Milestone[] = [
    {
      id: "default-1",
      title: {
        ar: "تخطيط وتصميم المشروع",
        en: "Project Planning & Design",
      },
      date: baseStart,
      completed: true,
      description: {
        ar: "مرحلة التخطيط الأولي والتصميم المعماري",
        en: "Initial planning and architectural design phase",
      },
      projectId: null as any, // not used in UI
    },
    {
      id: "default-2",
      title: {
        ar: "الأساس والهيكل",
        en: "Foundation & Structure",
      },
      date: addDays(baseStart, 90),
      completed: true,
      description: {
        ar: "وضع الأساس والإطار الهيكلي",
        en: "Foundation laying and structural framework",
      },
      projectId: null as any,
    },
    {
      id: "default-3",
      title: {
        ar: "الداخلية واللمسات الأخيرة",
        en: "Interior & Finishing",
      },
      date: addDays(baseStart, 180),
      completed: !isOngoing,
      description: {
        ar: "الأعمال الداخلية واللمسات الأخيرة",
        en: "Interior work and finishing touches",
      },
      projectId: null as any,
    },
    {
      id: "default-4",
      title: {
        ar: "التفتيش النهائي والتسليم",
        en: "Final Inspection & Handover",
      },
      date: baseEnd,
      completed: !isOngoing,
      description: {
        ar: "التفتيش النهائي على الجودة وتسليم المشروع",
        en: "Final quality inspection and project handover",
      },
      projectId: null as any,
    },
  ];

  const timelineMilestones =
    milestones && milestones.length > 0 ? milestones : defaultMilestones;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-12"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <Card>
        <CardHeader>
          <CardTitle className={isRtl ? "text-right" : "text-left"}>
            {lang === "en" ? "Project Timeline" : "الجدول الزمني للمشروع"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-8">
              {timelineMilestones.map((milestone, index) => {
                const title =
                  lang === "ar"
                    ? milestone.title?.ar
                    : milestone.title?.en || milestone.title?.ar;

                const desc =
                  lang === "ar"
                    ? milestone.description?.ar
                    : milestone.description?.en || milestone.description?.ar;

                const dateText = milestone.date
                  ? milestone.date.toLocaleDateString()
                  : "—";

                return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="relative flex items-start gap-6"
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <div
                        className={`w-12 h-12 rounded-full border-4 border-background flex items-center justify-center ${
                          milestone.completed ? "bg-green-500" : "bg-muted"
                        }`}
                      >
                        {milestone.completed ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : (
                          <Clock className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          {title ?? "—"}
                        </h3>

                        <Badge
                          variant={
                            milestone.completed ? "default" : "secondary"
                          }
                        >
                          {milestone.completed
                            ? lang === "en"
                              ? "Completed"
                              : "مكتمل"
                            : lang === "en"
                              ? "Pending"
                              : "معلق"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{dateText}</span>
                      </div>

                      {desc ? (
                        <p className="text-muted-foreground text-sm">{desc}</p>
                      ) : null}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function addDays(d: Date, days: number) {
  return new Date(d.getTime() + days * 24 * 60 * 60 * 1000);
}
