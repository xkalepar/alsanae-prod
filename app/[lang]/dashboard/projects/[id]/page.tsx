import { UpdateProjectFormPage } from "../components/forms";
import { updateProjectAction } from "../actions";
import { getProjectById } from "@/database/projects";
import { notFound } from "next/navigation";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}) => {
  const { id } = await params;
  const project = await getProjectById({ id });
  if (!project) {
    return notFound();
  }
  return (
    <div className="container py-10" dir="rtl">
      <UpdateProjectFormPage action={updateProjectAction} project={project} />
    </div>
  );
};

export default page;
