"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n/settings";
import { MapPin, Calendar } from "lucide-react";
import type { Project } from "@/generated/prisma/client";

type ProjectGridProps = {
  projects: Project[];
  lang: Locale;
};

export function ProjectGrid({ projects, lang }: ProjectGridProps) {
  const [filter, setFilter] = useState<string>("all");
  const isRtl = lang === "ar";

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set((projects ?? []).map((p) => p.category).filter(Boolean)),
    );

    return [
      { key: "all", label: lang === "en" ? "All Projects" : "جميع المشاريع" },
      ...unique.map((c) => ({ key: c, label: c })),
    ];
  }, [projects, lang]);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <Button
            key={category.key}
            variant={filter === category.key ? "default" : "outline"}
            onClick={() => setFilter(category.key)}
            className="text-sm"
            type="button"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => {
          const title =
            lang === "ar"
              ? project.title?.ar
              : project.title?.en || project.title?.ar;

          const description =
            lang === "ar"
              ? project.description?.ar
              : project.description?.en || project.description?.ar;

          const posterSrc =
            project.poster?.src || "/placeholder.svg?height=400&width=600";

          const locationText = project.location ?? "";

          const dateText = formatDateRange(project.startDate, project.endDate);

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={posterSrc}
                    alt={project.poster?.alt ?? title ?? "Project"}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 left-2">
                    {project.category}
                  </Badge>
                </div>

                <CardContent
                  className={`pt-6 flex-1 ${isRtl ? "text-right" : "text-left"}`}
                >
                  {locationText ? (
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className={isRtl ? "mr-1" : "ml-1"}>
                        {locationText}
                      </span>
                    </div>
                  ) : null}

                  <h3 className="text-xl font-bold">{title ?? "—"}</h3>

                  {description ? (
                    <p className="mt-2 text-muted-foreground line-clamp-3">
                      {description}
                    </p>
                  ) : null}

                  {dateText ? (
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className={isRtl ? "mr-1" : "ml-1"}>
                        {dateText}
                      </span>
                    </div>
                  ) : null}
                </CardContent>

                <CardFooter
                  className={`pt-0 ${isRtl ? "justify-end" : "justify-start"}`}
                >
                  <Link href={`/${lang}/projects/${project.id}`}>
                    <Button variant="outline" type="button">
                      {lang === "en" ? "View Details" : "عرض التفاصيل"}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function formatDateRange(start: Date | null, end: Date | null) {
  const s = start ? formatDate(start) : "";
  const e = end ? formatDate(end) : "";
  if (!s && !e) return "";
  if (s && !e) return s;
  if (!s && e) return e;
  return `${s} - ${e}`;
}

function formatDate(value: Date) {
  const d = new Date(value);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
