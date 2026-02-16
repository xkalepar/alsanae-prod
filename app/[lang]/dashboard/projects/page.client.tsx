"use client";
// app/[lang]/dashboard/projects/page.client.tsx

import ProjectsTable from "@/components/reusable-table";
import { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { Project } from "@/generated/prisma";

import { projectsTable } from "./components/projects-column";
import {
  CreateProjectForm,
  DeleteProjectForm,
  UpdateProjectForm,
} from "./components/forms";
import { CustomLink } from "@/components/custom-link";

const ClientPage = ({
  projects,
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
}: {
  projects: Project[];
  createProjectAction: Action;
  updateProjectAction: Action;
  deleteProjectAction: Action;
}) => {
  const { lang } = useParams() as { lang: Locale };

  return (
    <main className="max-md:px-4">
      <div className="flex md:justify-between justify-start flex-col md:flex-row md:items-center md:mx-2 my-2">
        <Breadcrumb className="my-2" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}`}>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/dashboard`}>لوحة التحكم</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ادارة المشاريع</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <CustomLink
          variant={"default"}
          href={`/${lang}/dashboard/projects/new`}
        >
          إضافة مشروع جديد
        </CustomLink>
      </div>

      <div className="my-4  container">
        <Suspense fallback={"جاري التحميل"}>
          <ProjectsTable
            searchPlaceholder="البحث بالاسم"
            data={projects}
            columns={[
              ...projectsTable,
              {
                id: "actions",
                header: "الأحداث",
                enableHiding: false,
                cell: ({ row }) => {
                  const project = row.original;

                  return (
                    <DropdownMenu dir="rtl">
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">افتح الأحداث</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>الأحداث</DropdownMenuLabel>

                        <DropdownMenuItem
                          onClick={() => {
                            navigator.clipboard.writeText(project.id);
                            toast("تم نسخ المعرف بنجاح");
                          }}
                        >
                          نسخ معرف المشروع
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          asChild
                          onSelect={(e) => e.preventDefault()}
                        >
                          {/* <UpdateProjectForm
                            action={updateProjectAction}
                            project={project}
                          /> */}
                          <Link
                            href={`/${lang}/dashboard/projects/${project.id}/`}
                          >
                            تعديل المشروع
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <DeleteProjectForm
                            action={deleteProjectAction}
                            id={project.id}
                          />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                },
              },
            ]}
            searchQuery="title"
          />
        </Suspense>
      </div>
    </main>
  );
};

export default ClientPage;
