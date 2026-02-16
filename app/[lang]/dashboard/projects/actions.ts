// app/[lang]/dashboard/projects/actions.ts
"use server";

import { z } from "zod";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/database/projects";

/* ============================================================================
 * Zod Schemas (FormData -> JSON)
 * ========================================================================== */

const languageSchema = z.object({
  ar: z.string().min(1, "العنوان العربي مطلوب"),
  en: z.string().nullable().optional(),
});

const imageSchema = z.object({
  src: z.string().min(1, "رابط الصورة مطلوب"),
  key: z.string().min(1, "مفتاح الصورة مطلوب"),
  alt: z.string().nullable().optional(),
});

const milestoneSchema = z.object({
  title: z
    .object({
      ar: z.string().nullable().optional(),
      en: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  description: z
    .object({
      ar: z.string().nullable().optional(),
      en: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  date: z.string().nullable().optional(), // ISO string
  completed: z.string().nullable().optional(), // "true" | "false"
});

/* ============================================================================
 * Create
 * ========================================================================== */

export async function createProjectAction(
  _: { message: string },
  formData: FormData,
) {
  try {
    const schema = z.object({
      title: languageSchema,
      category: z.string().min(1, "التصنيف مطلوب"),
      location: z.string().nullable().optional(),
      client: z.string().nullable().optional(),
      startDate: z.string().nullable().optional(),
      endDate: z.string().nullable().optional(),
      description: languageSchema.nullable().optional(),
      poster: imageSchema,
      images: z.array(imageSchema).optional().default([]),
      milestones: z.array(milestoneSchema).optional().default([]),
    });

    const parsed = schema.safeParse({
      title: safeJson(formData.get("title")),
      description: safeJson(formData.get("description")),
      poster: safeJson(formData.get("poster")),
      images: safeJson(formData.get("images")) ?? [],
      milestones: safeJson(formData.get("milestones")) ?? [],
      category: formData.get("category") || "",
      location: (formData.get("location") as string) ?? null,
      client: (formData.get("client") as string) ?? null,
      startDate: (formData.get("startDate") as string) ?? null,
      endDate: (formData.get("endDate") as string) ?? null,
    });

    if (!parsed.success) {
      return { message: parsed.error.message };
    }

    const p = parsed.data;

    const res = await createProject({
      title: {
        ar: p.title.ar,
        en: normalizeNullableString(p.title.en),
      },
      category: p.category,
      location: normalizeNullableString(p.location),
      client: normalizeNullableString(p.client),
      startDate: p.startDate ? new Date(p.startDate) : null,
      endDate: p.endDate ? new Date(p.endDate) : null,
      description: p.description
        ? {
            ar: p.description.ar,
            en: normalizeNullableString(p.description.en),
          }
        : null,
      poster: {
        src: p.poster.src,
        key: p.poster.key,
        alt: normalizeNullableString(p.poster.alt),
      },
      images: (p.images ?? []).map((img) => ({
        src: img.src,
        key: img.key,
        alt: normalizeNullableString(img.alt),
      })),
      milestones: (p.milestones ?? []).map((m) => ({
        title: m.title
          ? {
              ar: normalizeMilestoneAr(m.title.ar),
              en: normalizeNullableString(m.title.en),
            }
          : null,
        description: m.description
          ? {
              ar: normalizeMilestoneAr(m.description.ar),
              en: normalizeNullableString(m.description.en),
            }
          : null,
        date: m.date ? new Date(m.date) : null,
        completed:
          m.completed === "true"
            ? true
            : m.completed === "false"
              ? false
              : true,
      })),
    });

    return { message: res.message };
  } catch (error) {
    console.error("Error in createProjectAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}

/* ============================================================================
 * Update
 * ========================================================================== */

export async function updateProjectAction(
  _: { message: string },
  formData: FormData,
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "معرف المشروع مطلوب"),
      title: languageSchema.optional(),
      category: z.string().optional(),
      location: z.string().nullable().optional(),
      client: z.string().nullable().optional(),
      startDate: z.string().nullable().optional(),
      endDate: z.string().nullable().optional(),
      description: languageSchema.nullable().optional(),
      poster: imageSchema.optional(),
      images: z.array(imageSchema).optional(),
      milestones: z.array(milestoneSchema).optional(), // if provided => replace
    });

    const parsed = schema.safeParse({
      id: formData.get("id") || "",
      title: safeJson(formData.get("title")) ?? undefined,
      description: safeJson(formData.get("description")) ?? undefined,
      poster: safeJson(formData.get("poster")) ?? undefined,
      images: safeJson(formData.get("images")) ?? undefined,
      milestones: safeJson(formData.get("milestones")) ?? undefined,
      category: (formData.get("category") as string) || undefined,
      location:
        formData.get("location") === null
          ? undefined
          : ((formData.get("location") as string) ?? null),
      client:
        formData.get("client") === null
          ? undefined
          : ((formData.get("client") as string) ?? null),
      startDate:
        formData.get("startDate") === null
          ? undefined
          : ((formData.get("startDate") as string) ?? null),
      endDate:
        formData.get("endDate") === null
          ? undefined
          : ((formData.get("endDate") as string) ?? null),
    });

    if (!parsed.success) {
      return { message: parsed.error.message };
    }

    const p = parsed.data;

    const res = await updateProject({
      id: p.id,

      ...(p.title
        ? {
            title: {
              ar: p.title.ar,
              en: normalizeNullableString(p.title.en),
            },
          }
        : {}),

      ...(p.category ? { category: p.category } : {}),

      ...(p.location !== undefined
        ? { location: normalizeNullableString(p.location) }
        : {}),
      ...(p.client !== undefined
        ? { client: normalizeNullableString(p.client) }
        : {}),

      ...(p.startDate !== undefined
        ? { startDate: p.startDate ? new Date(p.startDate) : null }
        : {}),
      ...(p.endDate !== undefined
        ? { endDate: p.endDate ? new Date(p.endDate) : null }
        : {}),

      ...(p.description !== undefined
        ? {
            description: p.description
              ? {
                  ar: p.description.ar,
                  en: normalizeNullableString(p.description.en),
                }
              : null,
          }
        : {}),

      ...(p.poster
        ? {
            poster: {
              src: p.poster.src,
              key: p.poster.key,
              alt: normalizeNullableString(p.poster.alt),
            },
          }
        : {}),

      ...(p.images
        ? {
            images: p.images.map((img) => ({
              src: img.src,
              key: img.key,
              alt: normalizeNullableString(img.alt),
            })),
          }
        : {}),

      ...(p.milestones
        ? {
            milestones: p.milestones.map((m) => ({
              title: m.title
                ? {
                    ar: normalizeMilestoneAr(m.title.ar),
                    en: normalizeNullableString(m.title.en),
                  }
                : null,
              description: m.description
                ? {
                    ar: normalizeMilestoneAr(m.description.ar),
                    en: normalizeNullableString(m.description.en),
                  }
                : null,
              date: m.date ? new Date(m.date) : null,
              completed:
                m.completed === "true"
                  ? true
                  : m.completed === "false"
                    ? false
                    : true,
            })),
          }
        : {}),
    });

    return { message: res.message };
  } catch (error) {
    console.error("Error in updateProjectAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}

/* ============================================================================
 * Delete
 * ========================================================================== */

export async function deleteProjectAction(
  _: { message: string },
  formData: FormData,
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "معرف المشروع مطلوب"),
    });

    const parsed = schema.safeParse({
      id: formData.get("id") || "",
    });

    if (!parsed.success) {
      return { message: parsed.error.message };
    }

    const res = await deleteProject({ id: parsed.data.id });
    return { message: res.message };
  } catch (error) {
    console.error("Error in deleteProjectAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}

/* ============================================================================
 * Utils
 * ========================================================================== */

function safeJson(value: FormDataEntryValue | null) {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") return null;
  const s = value.trim();
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

function normalizeNullableString(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  return s ? s : null;
}

/**
 * Your Language.ar is required in the Prisma type (string), even inside milestones.
 * If milestone title/description is provided but ar is empty/null -> make it "" to satisfy type.
 * (You can change "" to " " if your UI relies on truthy strings.)
 */
function normalizeMilestoneAr(v: unknown): string {
  if (typeof v !== "string") return "";
  return v;
}
