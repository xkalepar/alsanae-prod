import type { Locale } from "@/lib/i18n/settings";
import { getDictionary } from "@/lib/i18n";
import { getProjects, getProjectById } from "@/database/projects";
import { ProjectDetails } from "@/components/project-details";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectTimeline } from "@/components/project-timeline";
import { notFound } from "next/navigation";

export async function generateStaticParams({
  params,
}: {
  params: { lang: Locale };
}) {
  // lang isn't needed for DB fetch, but kept to match Next signature
  const projects = await getProjects({});

  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage(props: {
  params: Promise<{ lang: Locale; id: string }>;
}) {
  const params = await props.params;
  const dict = await getDictionary(params.lang);

  const project = await getProjectById({ id: params.id });

  if (!project) notFound();

  return (
    <div className="container py-10">
      <ProjectDetails project={project} lang={params.lang} />

      {/* <ProjectGallery images={project.images} /> */}

      <ProjectTimeline
        startDate={project.startDate}
        endDate={project.endDate}
        milestones={project.milestones}
        lang={params.lang}
      />
    </div>
  );
}
