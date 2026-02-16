import type { Locale } from "@/lib/i18n/settings";
import { getDictionary } from "@/lib/i18n";
import { ProjectGrid } from "@/components/project-grid";
import { PageHeader } from "@/components/page-header";
import { getProjects } from "@/database/projects";

export default async function ProjectsPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const dict = await getDictionary(params.lang);
  const projects = await getProjects({});
  return (
    <div className="container py-10">
      <PageHeader
        title={dict.projects.title}
        description={dict.projects.description}
      />
      <ProjectGrid projects={projects} lang={params.lang} />
    </div>
  );
}
