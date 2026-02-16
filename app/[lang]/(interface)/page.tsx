import type { Locale } from "@/lib/i18n/settings";
import { getDictionary } from "@/lib/i18n";
import { HeroSection } from "@/sections/hero-section";
import { AboutSection } from "@/sections/about-section";
import { ServicesSection } from "@/sections/services-section";
// import { TimelineSection } from "@/sections/timeline-section";
import { FeaturedProjectsSection } from "@/sections/featured-projects-section";
import { TestimonialsSection } from "@/sections/testimonials-section";
import { CtaSection } from "@/sections/cta-section";
import { ProjectGrid } from "@/components/project-grid";
import { getProjects } from "@/database/projects";
import { LegalSection } from "@/sections/legal-section";

export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const dict = await getDictionary(params.lang);
  const projects = await getProjects({ limit: 6 });

  return (
    <div className="flex flex-col gap-20 pb-20">
      <HeroSection lang={params.lang} dictionary={dict.home.hero} />
      <AboutSection lang={params.lang} dictionary={dict.home.about} />
      <ServicesSection lang={params.lang} dictionary={dict.home.services} />
      {/* <TimelineSection lang={params.lang} dictionary={dict.home.timeline} /> */}
      <FeaturedProjectsSection
        projects={projects}
        lang={params.lang}
        dictionary={dict.home.featuredProjects}
      />
      <TestimonialsSection
        lang={params.lang}
        dictionary={dict.home.testimonials}
      />
      <LegalSection />
      <CtaSection lang={params.lang} dictionary={dict.home.cta} />
    </div>
  );
}
