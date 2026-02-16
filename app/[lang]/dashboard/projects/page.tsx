// app/[lang]/dashboard/projects/page.tsx

import { getProjects } from "@/database/projects";
import ClientPage from "./page.client";
import {
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
} from "./actions";

const page = async (props: {
  searchParams: Promise<{ name?: string }>;
  params: Promise<{ lang: string }>;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;

  // your route already has [lang], so just reading it is enough
  const { lang } = params;

  const projects = await getProjects({ name: searchParams?.name });

  return (
    <ClientPage
      projects={projects}
      createProjectAction={createProjectAction}
      updateProjectAction={updateProjectAction}
      deleteProjectAction={deleteProjectAction}
    />
  );
};

export default page;
