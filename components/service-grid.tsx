"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/settings";
import { Building2, Factory, Home, PenTool, Ruler, Wrench } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface ServiceGridProps {
  services: Service[];
  lang: Locale;
}

export function ServiceGrid({ services, lang }: ServiceGridProps) {
  const isRtl = lang === "ar";

  const getIcon = (iconName: string) => {
    const icons = {
      home: <Home className="h-8 w-8 text-primary" />,
      building: <Building2 className="h-8 w-8 text-primary" />,
      factory: <Factory className="h-8 w-8 text-primary" />,
      wrench: <Wrench className="h-8 w-8 text-primary" />,
      pen: <PenTool className="h-8 w-8 text-primary" />,
      ruler: <Ruler className="h-8 w-8 text-primary" />,
    };
    return (
      icons[iconName as keyof typeof icons] || (
        <Building2 className="h-8 w-8 text-primary" />
      )
    );
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full flex flex-col">
            <CardContent
              className={`pt-6 flex-1 ${isRtl ? "text-right" : "text-left"}`}
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="mt-2 text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-4 space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter
              className={`pt-0 ${isRtl ? "justify-end" : "justify-start"}`}
            >
              <Button variant="outline">
                {lang === "en" ? "Learn More" : "اعرف المزيد"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
