"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n/settings";
import { Calendar, MapPin, Building } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  startDate: string;
  endDate: string;
  client: string;
}

interface CompanyTimelineProps {
  projects: Project[];
  lang: Locale;
}

export function CompanyTimeline({ projects, lang }: CompanyTimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isRtl = lang === "ar";

  // Sort projects by start date (newest first)
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  // Determine if project is ongoing
  const isOngoing = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    return end > now;
  };

  return (
    <section ref={ref} className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block" />

      {/* Timeline items */}
      <div className="space-y-12">
        {sortedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
            }
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative flex ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"} justify-center`}
          >
            {/* Timeline dot */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 hidden md:block"
              style={{ top: "2rem" }}
            />

            {/* Content card */}
            <div
              className={`w-full md:w-5/12 ${isRtl ? (index % 2 === 0 ? "text-right" : "text-left") : ""}`}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Date and status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(project.startDate).getFullYear()}</span>
                    </div>
                    <Badge
                      variant={
                        isOngoing(project.endDate) ? "default" : "secondary"
                      }
                    >
                      {isOngoing(project.endDate)
                        ? lang === "en"
                          ? "Ongoing"
                          : "جاري"
                        : lang === "en"
                          ? "Completed"
                          : "مكتمل"}
                    </Badge>
                  </div>

                  {/* Project title */}
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>

                  {/* Project details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Building className="h-4 w-4 mr-2" />
                      <span>{project.client}</span>
                    </div>
                  </div>

                  {/* Project description */}
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {project.description}
                  </p>

                  {/* Duration */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {lang === "en" ? "Started:" : "بدأ:"}{" "}
                        {new Date(project.startDate).toLocaleDateString()}
                      </span>
                      <span>
                        {isOngoing(project.endDate)
                          ? lang === "en"
                            ? "Expected:"
                            : "متوقع:"
                          : lang === "en"
                            ? "Completed:"
                            : "اكتمل:"}{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="mt-3">
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline end marker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 0.5, delay: sortedProjects.length * 0.2 }}
        className="flex justify-center mt-12"
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 border-4 border-primary/40 hidden md:block" />
      </motion.div>
    </section>
  );
}
