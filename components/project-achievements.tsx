"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n/settings";
import { Award, Target, Zap, Shield } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ProjectAchievementsProps {
  achievements: Achievement[];
  lang: Locale;
}

export function ProjectAchievements({
  achievements,
  lang,
}: ProjectAchievementsProps) {
  const isRtl = lang === "ar";

  // Default achievements if none provided
  const defaultAchievements: Achievement[] = [
    {
      id: "1",
      title: lang === "en" ? "On-Time Delivery" : "التسليم في الوقت المحدد",
      description:
        lang === "en"
          ? "Project completed within the scheduled timeline"
          : "تم إنجاز المشروع ضمن الجدول الزمني المحدد",
      icon: "target",
    },
    {
      id: "2",
      title: lang === "en" ? "Quality Excellence" : "التميز في الجودة",
      description:
        lang === "en"
          ? "Exceeded quality standards and client expectations"
          : "تجاوز معايير الجودة وتوقعات العميل",
      icon: "award",
    },
    {
      id: "3",
      title: lang === "en" ? "Safety Record" : "سجل السلامة",
      description:
        lang === "en"
          ? "Zero safety incidents throughout the project"
          : "صفر حوادث سلامة طوال المشروع",
      icon: "shield",
    },
    {
      id: "4",
      title: lang === "en" ? "Innovation" : "الابتكار",
      description:
        lang === "en"
          ? "Implemented cutting-edge construction techniques"
          : "تطبيق تقنيات البناء المتطورة",
      icon: "zap",
    },
  ];

  const projectAchievements =
    achievements.length > 0 ? achievements : defaultAchievements;

  const getIcon = (iconName: string) => {
    const icons = {
      award: <Award className="h-6 w-6 text-primary" />,
      target: <Target className="h-6 w-6 text-primary" />,
      zap: <Zap className="h-6 w-6 text-primary" />,
      shield: <Shield className="h-6 w-6 text-primary" />,
    };
    return (
      icons[iconName as keyof typeof icons] || (
        <Award className="h-6 w-6 text-primary" />
      )
    );
  };

  if (projectAchievements.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className={isRtl ? "text-right" : "text-left"}>
            {lang === "en" ? "Project Achievements" : "إنجازات المشروع"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`flex items-start gap-4 p-4 rounded-lg border bg-muted/30 ${isRtl ? "text-right" : "text-left"}`}
              >
                <div className="rounded-full bg-primary/10 p-3">
                  {getIcon(achievement.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
