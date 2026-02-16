// database/projects.ts
"use server";

import prisma from "@/lib/prisma";
import { Project, Milestone } from "@/generated/prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import { ProjectWithMilestones } from "@/types/types";

/* ============================================================================
 * Types
 * ========================================================================== */

type CreateMilestoneInput = Omit<Milestone, "id" | "projectId">;

type CreateProjectInput = Omit<Project, "id"> & {
  milestones?: CreateMilestoneInput[];
};

type UpdateProjectInput = Partial<Omit<Project, "id">> & {
  id: string;
  /**
   * If provided => REPLACE all milestones with this list.
   * If omitted => milestones won't be touched.
   */
  milestones?: CreateMilestoneInput[];
};

function normalizeMilestones(milestones?: CreateMilestoneInput[]) {
  if (!milestones?.length) return [];
  return milestones.map((m) => ({
    title: m.title ?? undefined,
    description: m.description ?? undefined,
    date: m.date ?? undefined,
    completed: typeof m.completed === "boolean" ? m.completed : undefined,
  }));
}

/* ============================================================================
 * CRUD
 * ========================================================================== */

const createProject = async (payload: CreateProjectInput) => {
  try {
    const milestones = normalizeMilestones(payload.milestones);

    const project = await prisma.project.create({
      data: {
        title: payload.title,
        description: payload.description ?? undefined,
        location: payload.location ?? undefined,
        poster: payload.poster,
        category: payload.category,
        startDate: payload.startDate ?? undefined,
        endDate: payload.endDate ?? undefined,
        client: payload.client ?? undefined,
        images: payload.images ?? [],
        milestones: milestones.length ? { create: milestones } : undefined,
      },
    });

    if (!project) return { message: "فشل انشاء المشروع" };

    revalidateTag("projects", { expire: 0 });
    return { message: "تم انشاء المشروع بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل انشاء المشروع" };
  }
};

const updateProject = async (payload: UpdateProjectInput) => {
  try {
    const { id, milestones, ...rest } = payload;

    const data: any = {
      ...("title" in rest ? { title: rest.title } : {}),
      ...("description" in rest
        ? { description: rest.description ?? undefined }
        : {}),
      ...("location" in rest ? { location: rest.location ?? undefined } : {}),
      ...("poster" in rest ? { poster: rest.poster } : {}),
      ...("category" in rest ? { category: rest.category } : {}),
      ...("startDate" in rest
        ? { startDate: rest.startDate ?? undefined }
        : {}),
      ...("endDate" in rest ? { endDate: rest.endDate ?? undefined } : {}),
      ...("client" in rest ? { client: rest.client ?? undefined } : {}),
      ...("images" in rest ? { images: rest.images ?? [] } : {}),
    };

    // Replace milestones only if provided
    if (milestones) {
      const normalized = normalizeMilestones(milestones);
      data.milestones = {
        deleteMany: {}, // delete existing milestones for this project
        ...(normalized.length ? { create: normalized } : {}),
      };
    }

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    if (!project) return { message: "فشل تحديث المشروع" };

    revalidateTag("projects", { expire: 0 });
    return { message: "تم تحديث المشروع بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل تحديث المشروع" };
  }
};

const deleteProject = async ({ id }: { id: string }) => {
  try {
    // Ensure milestones are removed (Mongo + relations: safest to clean explicitly)
    await prisma.milestone.deleteMany({ where: { projectId: id } });

    const project = await prisma.project.delete({
      where: { id },
    });

    if (!project) return { message: "فشل حذف المشروع" };

    revalidateTag("projects", { expire: 0 });
    return { message: "تم حذف المشروع بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل حذف المشروع" };
  }
};

/* ============================================================================
 * Queries (cached)
 * ========================================================================== */

/**
 * Search by name only: title.ar OR title.en
 */
export const getProjects = unstable_cache(
  async ({ name, limit }: { name?: string; limit?: number }) => {
    try {
      const q = (name ?? "").trim();

      const where: any =
        q.length > 0
          ? {
              OR: [
                { title: { is: { ar: { contains: q } } } },
                { title: { is: { en: { contains: q } } } },
              ],
            }
          : {};

      const projects = await prisma.project.findMany({
        where,
        orderBy: { id: "desc" as any }, // keeps latest first (ObjectId)
        take: limit,
      });

      return projects ?? [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  ["projects"],
  { tags: ["projects"], revalidate: 60 * 60 * 24 * 30 },
);

export const getProjectById = async ({
  id,
}: {
  id: string;
}): Promise<ProjectWithMilestones | null> => {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        milestones: { orderBy: { date: "desc" } },
      },
    });
    return project ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { createProject, updateProject, deleteProject };
