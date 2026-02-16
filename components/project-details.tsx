"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/settings";
import { Calendar, MapPin, User, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

// Use Prisma types
import type { Project } from "@/generated/prisma/client";

interface ProjectDetailsProps {
  project: Project;
  lang: Locale;
}

export function ProjectDetails({ project, lang }: ProjectDetailsProps) {
  const isRtl = lang === "ar";

  const title =
    lang === "ar" ? project.title.ar : project.title.en || project.title.ar;

  const description =
    lang === "ar"
      ? project.description?.ar
      : project.description?.en || project.description?.ar;

  const now = new Date();
  const isOngoing = project.endDate ? project.endDate > now : true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Back button */}
      <div className="mb-6">
        <Link href={`/${lang}/projects`}>
          <Button variant="ghost" className="gap-2" type="button">
            {isRtl ? (
              <ArrowRight className="h-4 w-4" />
            ) : (
              <ArrowLeft className="h-4 w-4" />
            )}
            {lang === "en" ? "Back to Projects" : "العودة إلى المشاريع"}
          </Button>
        </Link>
      </div>

      {/* Project header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={isOngoing ? "default" : "secondary"}>
                  {isOngoing
                    ? lang === "en"
                      ? "Ongoing"
                      : "جاري"
                    : lang === "en"
                      ? "Completed"
                      : "مكتمل"}
                </Badge>
                <Badge variant="outline">{project.category}</Badge>
              </div>

              <h1
                className={`text-3xl font-bold mb-4 ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {title}
              </h1>

              {description ? (
                <p
                  className={`text-lg text-muted-foreground mb-6 ${
                    isRtl ? "text-right" : "text-left"
                  }`}
                >
                  {description}
                </p>
              ) : null}

              {/* Project metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetaItem
                  icon={<User className="h-5 w-5 text-primary" />}
                  label={lang === "en" ? "Client" : "العميل"}
                  value={project.client ?? (lang === "en" ? "—" : "—")}
                />

                <MetaItem
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  label={lang === "en" ? "Location" : "الموقع"}
                  value={project.location ?? (lang === "en" ? "—" : "—")}
                />

                <MetaItem
                  icon={<Calendar className="h-5 w-5 text-primary" />}
                  label={lang === "en" ? "Start Date" : "تاريخ البداية"}
                  value={
                    project.startDate
                      ? project.startDate.toLocaleDateString()
                      : "—"
                  }
                />

                <MetaItem
                  icon={<Calendar className="h-5 w-5 text-primary" />}
                  label={
                    isOngoing
                      ? lang === "en"
                        ? "Expected Completion"
                        : "الإنجاز المتوقع"
                      : lang === "en"
                        ? "Completion Date"
                        : "تاريخ الإنجاز"
                  }
                  value={
                    project.endDate ? project.endDate.toLocaleDateString() : "—"
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10">{icon}</div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
