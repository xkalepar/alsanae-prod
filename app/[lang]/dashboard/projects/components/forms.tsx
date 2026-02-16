// app/[lang]/dashboard/projects/components/forms.tsx
"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import AccessibleDialogForm from "@/components/accible-dialog-form";

import { Project } from "@/generated/prisma/client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Form from "@/components/form";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import Image from "next/image";
import { ProjectWithMilestones } from "@/types/types";

/**
 * Expectations (same pattern as users/forms.tsx):
 * - You pass `action` from server actions file
 * - You store complex fields as JSON strings in hidden inputs:
 *    title, description, poster, images, milestones
 *
 * Prisma embedded types:
 *  Language: { ar: string; en: string | null }
 *  Image: { src: string; alt: string | null; key: string }
 */

type LangParams = { lang: Locale };

function toJson(value: unknown) {
  return JSON.stringify(value ?? null);
}

function langValue<
  T extends { ar: string; en: string | null } | null | undefined,
>(v: T) {
  return {
    ar: v?.ar ?? "",
    en: v?.en ?? null,
  };
}

function imageValue(
  v: { src: string; alt: string | null; key: string } | null | undefined,
) {
  return {
    src: v?.src ?? "",
    key: v?.key ?? "",
    alt: v?.alt ?? null,
  };
}

/* ============================================================================
 * Create Project
 * ========================================================================== */

export const CreateProjectForm = ({ action }: { action: Action }) => {
  const { lang } = useParams() as LangParams;
  const [open, setOpen] = useState(false);

  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [category, setCategory] = useState("");

  const [location, setLocation] = useState("");
  const [client, setClient] = useState("");
  const [startDate, setStartDate] = useState(""); // yyyy-mm-dd
  const [endDate, setEndDate] = useState("");

  const [descAr, setDescAr] = useState("");
  const [descEn, setDescEn] = useState("");

  // Poster (basic inputs)
  const [posterSrc, setPosterSrc] = useState("");
  const [posterKey, setPosterKey] = useState("");
  const [posterAlt, setPosterAlt] = useState("");

  // Images (simple list editor)
  const [images, setImages] = useState<
    { src: string; key: string; alt: string }[]
  >([]);

  // Milestones (simple list editor)
  const [milestones, setMilestones] = useState<
    {
      titleAr: string;
      titleEn: string;
      descAr: string;
      descEn: string;
      date: string; // yyyy-mm-dd
      completed: boolean;
    }[]
  >([]);

  const payload = useMemo(() => {
    const title = { ar: titleAr, en: titleEn.trim() ? titleEn : null };
    const description =
      descAr.trim() || descEn.trim()
        ? { ar: descAr, en: descEn.trim() ? descEn : null }
        : null;

    const poster = {
      src: posterSrc,
      key: posterKey,
      alt: posterAlt.trim() ? posterAlt : null,
    };

    const imagesPayload = images.map((i) => ({
      src: i.src,
      key: i.key,
      alt: i.alt.trim() ? i.alt : null,
    }));

    const milestonesPayload = milestones.map((m) => ({
      title:
        m.titleAr.trim() || m.titleEn.trim()
          ? { ar: m.titleAr, en: m.titleEn.trim() ? m.titleEn : null }
          : null,
      description:
        m.descAr.trim() || m.descEn.trim()
          ? { ar: m.descAr, en: m.descEn.trim() ? m.descEn : null }
          : null,
      date: m.date ? new Date(m.date).toISOString() : null,
      completed: String(m.completed),
    }));

    return {
      title,
      description,
      poster,
      images: imagesPayload,
      milestones: milestonesPayload,
      category,
      location: location.trim() ? location : null,
      client: client.trim() ? client : null,
      startDate: startDate ? new Date(startDate).toISOString() : null,
      endDate: endDate ? new Date(endDate).toISOString() : null,
    };
  }, [
    titleAr,
    titleEn,
    category,
    location,
    client,
    startDate,
    endDate,
    descAr,
    descEn,
    posterSrc,
    posterKey,
    posterAlt,
    images,
    milestones,
  ]);

  return (
    <AccessibleDialogForm
      submit="إنشاء"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<Button>إضافة مشروع جديد</Button>}
      action={action}
      title="إضافة مشروع جديد"
    >
      {/* JSON payload fields for actions.ts */}
      <Input
        type="hidden"
        name="title"
        value={toJson(payload.title)}
        readOnly
      />
      <Input
        type="hidden"
        name="description"
        value={toJson(payload.description)}
        readOnly
      />
      <Input
        type="hidden"
        name="poster"
        value={toJson(payload.poster)}
        readOnly
      />
      <Input
        type="hidden"
        name="images"
        value={toJson(payload.images)}
        readOnly
      />
      <Input
        type="hidden"
        name="milestones"
        value={toJson(payload.milestones)}
        readOnly
      />

      {/* Scalars */}
      <div className="grid gap-4" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="grid gap-2">
          <Label htmlFor="titleAr">عنوان المشروع (عربي)</Label>
          <Input
            id="titleAr"
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
            placeholder="أدخل العنوان بالعربية"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="titleEn">عنوان المشروع (English)</Label>
          <Input
            id="titleEn"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            placeholder="Project title in English"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">التصنيف</Label>
          <Input
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="مثال: بناء، صيانة، توريد..."
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">الموقع</Label>
          <Input
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="اختياري"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="client">العميل</Label>
          <Input
            id="client"
            name="client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="اختياري"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="startDate">تاريخ البداية</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="endDate">تاريخ النهاية</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="descAr">الوصف (عربي)</Label>
          <Input
            id="descAr"
            value={descAr}
            onChange={(e) => setDescAr(e.target.value)}
            placeholder="اختياري"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="descEn">Description (English)</Label>
          <Input
            id="descEn"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            placeholder="Optional"
          />
        </div>

        <div className="rounded-md border p-3 grid gap-3">
          <div className="text-sm font-medium">صورة الغلاف (Poster)</div>
          <div className="grid gap-2">
            <Label htmlFor="posterSrc">Poster src</Label>
            <Input
              id="posterSrc"
              value={posterSrc}
              onChange={(e) => setPosterSrc(e.target.value)}
              placeholder="https://..."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="posterKey">Poster key</Label>
            <Input
              id="posterKey"
              value={posterKey}
              onChange={(e) => setPosterKey(e.target.value)}
              placeholder="upload key"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="posterAlt">Poster alt</Label>
            <Input
              id="posterAlt"
              value={posterAlt}
              onChange={(e) => setPosterAlt(e.target.value)}
              placeholder="اختياري"
            />
          </div>
        </div>

        {/* Simple Images editor */}
        <ImagesEditor images={images} setImages={setImages} />

        {/* Simple Milestones editor */}
        <MilestonesEditor
          milestones={milestones}
          setMilestones={setMilestones}
        />
      </div>
    </AccessibleDialogForm>
  );
};

/* ============================================================================
 * Update Project
 * ========================================================================== */

export const UpdateProjectForm = ({
  project,
  action,
}: {
  project: Project;
  action: Action;
}) => {
  const { lang } = useParams() as LangParams;
  const [open, setOpen] = useState(false);

  const [titleAr, setTitleAr] = useState(project.title.ar);
  const [titleEn, setTitleEn] = useState(project.title.en ?? "");
  const [category, setCategory] = useState(project.category);

  const [location, setLocation] = useState(project.location ?? "");
  const [client, setClient] = useState(project.client ?? "");
  const [startDate, setStartDate] = useState(
    project.startDate ? toDateInput(new Date(project?.startDate)) : "",
  );
  const [endDate, setEndDate] = useState(
    project.endDate ? toDateInput(new Date(project?.endDate)) : "",
  );

  const [descAr, setDescAr] = useState(project.description?.ar ?? "");
  const [descEn, setDescEn] = useState(project.description?.en ?? "");

  const [posterSrc, setPosterSrc] = useState(project.poster?.src ?? "");
  const [posterKey, setPosterKey] = useState(project.poster?.key ?? "");
  const [posterAlt, setPosterAlt] = useState(project.poster?.alt ?? "");

  const [images, setImages] = useState<
    { src: string; key: string; alt: string }[]
  >(
    (project.images ?? []).map((i) => ({
      src: i.src,
      key: i.key,
      alt: i.alt ?? "",
    })),
  );

  // NOTE: Project type (without include) doesn’t contain milestones in many queries.
  // We keep milestones empty here; you can pass milestones from getProjectById include if needed.
  const [milestones, setMilestones] = useState<
    {
      titleAr: string;
      titleEn: string;
      descAr: string;
      descEn: string;
      date: string;
      completed: boolean;
    }[]
  >([]);

  const payload = useMemo(() => {
    const title = { ar: titleAr, en: titleEn.trim() ? titleEn : null };
    const description =
      descAr.trim() || descEn.trim()
        ? { ar: descAr, en: descEn.trim() ? descEn : null }
        : null;

    const poster = {
      src: posterSrc,
      key: posterKey,
      alt: posterAlt.trim() ? posterAlt : null,
    };

    const imagesPayload = images.map((i) => ({
      src: i.src,
      key: i.key,
      alt: i.alt.trim() ? i.alt : null,
    }));

    const milestonesPayload = milestones.map((m) => ({
      title:
        m.titleAr.trim() || m.titleEn.trim()
          ? { ar: m.titleAr, en: m.titleEn.trim() ? m.titleEn : null }
          : null,
      description:
        m.descAr.trim() || m.descEn.trim()
          ? { ar: m.descAr, en: m.descEn.trim() ? m.descEn : null }
          : null,
      date: m.date ? new Date(m.date).toISOString() : null,
      completed: String(m.completed),
    }));

    return {
      title,
      description,
      poster,
      images: imagesPayload,
      milestones: milestonesPayload,
      category,
      location: location.trim() ? location : null,
      client: client.trim() ? client : null,
      startDate: startDate ? new Date(startDate).toISOString() : null,
      endDate: endDate ? new Date(endDate).toISOString() : null,
    };
  }, [
    titleAr,
    titleEn,
    category,
    location,
    client,
    startDate,
    endDate,
    descAr,
    descEn,
    posterSrc,
    posterKey,
    posterAlt,
    images,
    milestones,
  ]);

  return (
    <AccessibleDialogForm
      key={project.id}
      submit="تحديث"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>تحديث مشروع</button>}
      action={action}
      title="تحديث معلومات المشروع"
    >
      <Input type="hidden" name="id" defaultValue={project.id} readOnly />

      {/* JSON payload fields for actions.ts */}
      <Input
        type="hidden"
        name="title"
        value={toJson(payload.title)}
        readOnly
      />
      <Input
        type="hidden"
        name="description"
        value={toJson(payload.description)}
        readOnly
      />
      <Input
        type="hidden"
        name="poster"
        value={toJson(payload.poster)}
        readOnly
      />
      <Input
        type="hidden"
        name="images"
        value={toJson(payload.images)}
        readOnly
      />

      {/* milestones is optional for update; include only if you actually edit it */}
      {milestones.length > 0 ? (
        <Input
          type="hidden"
          name="milestones"
          value={toJson(payload.milestones)}
          readOnly
        />
      ) : null}

      <div className="grid gap-4" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="grid gap-2">
          <Label htmlFor="titleAr">عنوان المشروع (عربي)</Label>
          <Input
            id="titleAr"
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="titleEn">عنوان المشروع (English)</Label>
          <Input
            id="titleEn"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">التصنيف</Label>
          <Input
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">الموقع</Label>
          <Input
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="client">العميل</Label>
          <Input
            id="client"
            name="client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="startDate">تاريخ البداية</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="endDate">تاريخ النهاية</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="descAr">الوصف (عربي)</Label>
          <Input
            id="descAr"
            value={descAr}
            onChange={(e) => setDescAr(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="descEn">Description (English)</Label>
          <Input
            id="descEn"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
          />
        </div>

        <div className="rounded-md border p-3 grid gap-3">
          <div className="text-sm font-medium">صورة الغلاف (Poster)</div>
          <div className="grid gap-2">
            <Label htmlFor="posterSrc">Poster src</Label>
            <Input
              id="posterSrc"
              value={posterSrc}
              onChange={(e) => setPosterSrc(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="posterKey">Poster key</Label>
            <Input
              id="posterKey"
              value={posterKey}
              onChange={(e) => setPosterKey(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="posterAlt">Poster alt</Label>
            <Input
              id="posterAlt"
              value={posterAlt}
              onChange={(e) => setPosterAlt(e.target.value)}
            />
          </div>
        </div>

        <ImagesEditor images={images} setImages={setImages} />

        {/* Optional milestones editor (only sends when you add milestones in this form) */}
        <MilestonesEditor
          milestones={milestones}
          setMilestones={setMilestones}
        />
      </div>
    </AccessibleDialogForm>
  );
};

/* ============================================================================
 * Delete Project
 * ========================================================================== */

export const DeleteProjectForm = ({
  id,
  action,
}: {
  id: string;
  action: Action;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <AccessibleDialogForm
      key={id}
      submit="حذف"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>حذف مشروع</button>}
      action={action}
      title="حذف مشروع"
      discardVariant={"default"}
      submitVariant={"outline"}
      description="من خلال هذا النموذج، يمكنك حذف المشروع بسهولة. بمجرد الإرسال، سيتم حذف المشروع بشكل نهائي."
    >
      <Input type="hidden" name="id" readOnly value={id} required />
    </AccessibleDialogForm>
  );
};

/* ============================================================================
 * Small editors (images & milestones)
 * ========================================================================== */

function ImagesEditor({
  images,
  setImages,
}: {
  images: { src: string; key: string; alt: string }[];
  setImages: React.Dispatch<
    React.SetStateAction<{ src: string; key: string; alt: string }[]>
  >;
}) {
  const [src, setSrc] = useState("");
  const [key, setKey] = useState("");
  const [alt, setAlt] = useState("");

  return (
    <div className="rounded-md border p-3 grid gap-3">
      <div className="text-sm font-medium">صور المشروع</div>

      <div className="grid gap-2">
        <Label htmlFor="imgSrc">Image src</Label>
        <Input
          id="imgSrc"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="imgKey">Image key</Label>
        <Input
          id="imgKey"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="imgAlt">Image alt</Label>
        <Input
          id="imgAlt"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            if (!src.trim() || !key.trim()) return;
            setImages((prev) => [...prev, { src, key, alt }]);
            setSrc("");
            setKey("");
            setAlt("");
          }}
        >
          إضافة صورة
        </Button>

        {images.length > 0 ? (
          <Button type="button" variant="outline" onClick={() => setImages([])}>
            مسح الصور
          </Button>
        ) : null}
      </div>

      {images.length > 0 ? (
        <div className="grid gap-2">
          {images.map((img, idx) => (
            <div
              key={`${img.key}-${idx}`}
              className="flex items-center justify-between rounded-md border p-2 text-sm"
            >
              <div className="truncate">
                <div className="font-medium truncate">{img.src}</div>
                <div className="text-muted-foreground truncate">{img.key}</div>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setImages((prev) => prev.filter((_, i) => i !== idx))
                }
              >
                حذف
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MilestonesEditor({
  milestones,
  setMilestones,
}: {
  milestones: {
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    date: string;
    completed: boolean;
  }[];
  setMilestones: React.Dispatch<
    React.SetStateAction<
      {
        titleAr: string;
        titleEn: string;
        descAr: string;
        descEn: string;
        date: string;
        completed: boolean;
      }[]
    >
  >;
}) {
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(true);

  return (
    <div className="rounded-md border p-3 grid gap-3">
      <div className="text-sm font-medium">المراحل (Milestones)</div>

      <div className="grid gap-2">
        <Label htmlFor="msTitleAr">عنوان المرحلة (عربي)</Label>
        <Input
          id="msTitleAr"
          value={titleAr}
          onChange={(e) => setTitleAr(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="msTitleEn">Title (English)</Label>
        <Input
          id="msTitleEn"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="msDescAr">وصف المرحلة (عربي)</Label>
        <Input
          id="msDescAr"
          value={descAr}
          onChange={(e) => setDescAr(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="msDescEn">Description (English)</Label>
        <Input
          id="msDescEn"
          value={descEn}
          onChange={(e) => setDescEn(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="msDate">التاريخ</Label>
        <Input
          id="msDate"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start md:justify-between md:items-center">
        <Label htmlFor="msCompleted">الحالة</Label>
        <Select
          name="msCompleted"
          dir="rtl"
          value={completed ? "true" : "false"}
          onValueChange={(v) => setCompleted(v === "true")}
        >
          <SelectTrigger id="msCompleted" className="md:w-[180px] w-full">
            <SelectValue placeholder="حدد الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">مكتمل</SelectItem>
            <SelectItem value="false">غير مكتمل</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setMilestones((prev) => [
              ...prev,
              { titleAr, titleEn, descAr, descEn, date, completed },
            ]);
            setTitleAr("");
            setTitleEn("");
            setDescAr("");
            setDescEn("");
            setDate("");
            setCompleted(true);
          }}
        >
          إضافة مرحلة
        </Button>

        {milestones.length > 0 ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setMilestones([])}
          >
            مسح المراحل
          </Button>
        ) : null}
      </div>

      {milestones.length > 0 ? (
        <div className="grid gap-2">
          {milestones.map((m, idx) => (
            <div
              key={`${m.titleAr}-${idx}`}
              className="flex items-center justify-between rounded-md border p-2 text-sm"
            >
              <div className="truncate">
                <div className="font-medium truncate">
                  {m.titleAr || "مرحلة بدون عنوان"}
                </div>
                <div className="text-muted-foreground truncate">
                  {m.date || "-"} • {m.completed ? "مكتمل" : "غير مكتمل"}
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setMilestones((prev) => prev.filter((_, i) => i !== idx))
                }
              >
                حذف
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ============================================================================
 * Date helpers
 * ========================================================================== */

function toDateInput(d?: Date) {
  if (!d) d = new Date();
  const yyyy = d?.getFullYear() ?? new Date().getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export const CreateProjectFormPage = ({ action }: { action: Action }) => {
  const { lang } = useParams() as LangParams;

  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [category, setCategory] = useState("");

  const [location, setLocation] = useState("");
  const [client, setClient] = useState("");
  const [startDate, setStartDate] = useState(""); // yyyy-mm-dd
  const [endDate, setEndDate] = useState("");

  const [descAr, setDescAr] = useState("");
  const [descEn, setDescEn] = useState("");

  // Poster (basic inputs)
  const [posterSrc, setPosterSrc] = useState("");
  const [posterKey, setPosterKey] = useState("");
  const [posterAlt, setPosterAlt] = useState("");

  // Images (simple list editor)
  const [images, setImages] = useState<
    { src: string; key: string; alt: string }[]
  >([]);

  // Milestones (simple list editor)
  const [milestones, setMilestones] = useState<
    {
      titleAr: string;
      titleEn: string;
      descAr: string;
      descEn: string;
      date: string; // yyyy-mm-dd
      completed: boolean;
    }[]
  >([]);

  const payload = useMemo(() => {
    const title = { ar: titleAr, en: titleEn.trim() ? titleEn : null };
    const description =
      descAr.trim() || descEn.trim()
        ? { ar: descAr, en: descEn.trim() ? descEn : null }
        : null;

    const poster = {
      src: posterSrc,
      key: posterKey,
      alt: posterAlt.trim() ? posterAlt : null,
    };

    const imagesPayload = images.map((i) => ({
      src: i.src,
      key: i.key,
      alt: i.alt.trim() ? i.alt : null,
    }));

    const milestonesPayload = milestones.map((m) => ({
      title:
        m.titleAr.trim() || m.titleEn.trim()
          ? { ar: m.titleAr, en: m.titleEn.trim() ? m.titleEn : null }
          : null,
      description:
        m.descAr.trim() || m.descEn.trim()
          ? { ar: m.descAr, en: m.descEn.trim() ? m.descEn : null }
          : null,
      date: m.date ? new Date(m.date).toISOString() : null,
      completed: String(m.completed),
    }));

    return {
      title,
      description,
      poster,
      images: imagesPayload,
      milestones: milestonesPayload,
      category,
      location: location.trim() ? location : null,
      client: client.trim() ? client : null,
      startDate: startDate ? new Date(startDate).toISOString() : null,
      endDate: endDate ? new Date(endDate).toISOString() : null,
    };
  }, [
    titleAr,
    titleEn,
    category,
    location,
    client,
    startDate,
    endDate,
    descAr,
    descEn,
    posterSrc,
    posterKey,
    posterAlt,
    images,
    milestones,
  ]);

  return (
    <Form
      submit="إنشاء"
      dontReplace
      //   trigger={<Button>إضافة مشروع جديد</Button>}
      action={action}
      replaceLink="/ar/dashboard/projects/"

      //   title="إضافة مشروع جديد"
    >
      {/* JSON payload fields for actions.ts */}
      <Input
        type="hidden"
        name="title"
        value={toJson(payload.title)}
        readOnly
      />
      <Input
        type="hidden"
        name="description"
        value={toJson(payload.description)}
        readOnly
      />
      <Input
        type="hidden"
        name="poster"
        value={toJson(payload.poster)}
        readOnly
      />
      <Input
        type="hidden"
        name="images"
        value={toJson(payload.images)}
        readOnly
      />
      <Input
        type="hidden"
        name="milestones"
        value={toJson(payload.milestones)}
        readOnly
      />

      <div className="rounded-md border  grid gap-3 py-3">
        <div className="text-sm font-medium">صورة الغلاف (Poster)</div>
        {posterSrc && posterKey ? (
          <div className="">
            <div className="relative w-32 h-20">
              <Image
                fill
                src={posterSrc}
                alt={posterAlt || "Poster image"}
                className="w-32 h-20 object-cover rounded-md border"
              />
            </div>
            <Button
              variant={"destructive"}
              onClick={() => {
                setPosterSrc("");
                setPosterKey("");
                setPosterAlt("");
              }}
            >
              إزالة صورة الغلاف
            </Button>
          </div>
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const { ufsUrl, key, name } = res[0];
              if (ufsUrl && key) {
                setPosterSrc(ufsUrl);
                setPosterKey(key);
                setPosterAlt(name);
              }
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast.error(`ERROR! ${error.message}`);
            }}
          />
        )}
      </div>

      {/* Scalars */}
      <div
        className="grid md:grid-cols-2 gap-4"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="grid gap-2">
          <Label htmlFor="titleAr">عنوان المشروع (عربي)</Label>
          <Input
            id="titleAr"
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
            placeholder="أدخل العنوان بالعربية"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="titleEn">عنوان المشروع (English)</Label>
          <Input
            id="titleEn"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            placeholder="Project title in English"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">التصنيف</Label>
          <Input
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="مثال: بناء، صيانة، توريد..."
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">الموقع</Label>
          <Input
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="اختياري"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="client">العميل</Label>
          <Input
            id="client"
            name="client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="اختياري"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="startDate">تاريخ البداية</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="endDate">تاريخ النهاية</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="descAr">الوصف (عربي)</Label>
          <Input
            id="descAr"
            value={descAr}
            onChange={(e) => setDescAr(e.target.value)}
            placeholder="اختياري"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="descEn">Description (English)</Label>
          <Input
            id="descEn"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            placeholder="Optional"
          />
        </div>

        {/* Simple Images editor */}
        <ImagesEditor images={images} setImages={setImages} />

        {/* Simple Milestones editor */}
        <MilestonesEditor
          milestones={milestones}
          setMilestones={setMilestones}
        />
      </div>
    </Form>
  );
};
export const UpdateProjectFormPage = ({
  action,
  project,
}: {
  action: Action;
  project: ProjectWithMilestones;
}) => {
  const { lang } = useParams() as LangParams;

  const [titleAr, setTitleAr] = useState(project.title.ar);
  const [titleEn, setTitleEn] = useState(project.title.en || "");
  const [category, setCategory] = useState(project.category || "");

  const [location, setLocation] = useState(project.location || "");
  const [client, setClient] = useState(project.client || "");
  const [startDate, setStartDate] = useState(
    project.startDate
      ? new Date(project.startDate).toISOString().split("T")[0]
      : "",
  ); // yyyy-mm-dd
  const [endDate, setEndDate] = useState(
    project.endDate
      ? new Date(project.endDate).toISOString().split("T")[0]
      : "",
  );

  const [descAr, setDescAr] = useState(project.description?.ar || "");
  const [descEn, setDescEn] = useState(project.description?.en || "");

  // Poster (basic inputs)
  const [posterSrc, setPosterSrc] = useState(project.poster?.src || "");
  const [posterKey, setPosterKey] = useState(project.poster?.key || "");
  const [posterAlt, setPosterAlt] = useState(project.poster?.alt || "");

  // Images (simple list editor)
  const [images, setImages] = useState<
    { src: string; key: string; alt: string }[]
  >([]);

  // Milestones (simple list editor)
  const [milestones, setMilestones] = useState<
    {
      titleAr: string;
      titleEn: string;
      descAr: string;
      descEn: string;
      date: string; // yyyy-mm-dd
      completed: boolean;
    }[]
  >(
    project?.milestones.map((m) => ({
      titleAr: m.title?.ar || "",
      titleEn: m.title?.en || "",
      descAr: m.description?.ar || "",
      descEn: m.description?.en || "",
      date: m.date ? new Date(m.date).toISOString().split("T")[0] : "",
      completed: m.completed,
    })) ?? [],
  );

  const payload = useMemo(() => {
    const title = { ar: titleAr, en: titleEn.trim() ? titleEn : null };
    const description =
      descAr.trim() || descEn.trim()
        ? { ar: descAr, en: descEn.trim() ? descEn : null }
        : null;

    const poster = {
      src: posterSrc,
      key: posterKey,
      alt: posterAlt.trim() ? posterAlt : null,
    };

    const imagesPayload = images.map((i) => ({
      src: i.src,
      key: i.key,
      alt: i.alt.trim() ? i.alt : null,
    }));

    const milestonesPayload = milestones.map((m) => ({
      title:
        m.titleAr.trim() || m.titleEn.trim()
          ? { ar: m.titleAr, en: m.titleEn.trim() ? m.titleEn : null }
          : null,
      description:
        m.descAr.trim() || m.descEn.trim()
          ? { ar: m.descAr, en: m.descEn.trim() ? m.descEn : null }
          : null,
      date: m.date ? new Date(m.date).toISOString() : null,
      completed: String(m.completed),
    }));

    return {
      title,
      description,
      poster,
      images: imagesPayload,
      milestones: milestonesPayload,
      category,
      location: location.trim() ? location : null,
      client: client.trim() ? client : null,
      startDate: startDate ? new Date(startDate).toISOString() : null,
      endDate: endDate ? new Date(endDate).toISOString() : null,
    };
  }, [
    titleAr,
    titleEn,
    category,
    location,
    client,
    startDate,
    endDate,
    descAr,
    descEn,
    posterSrc,
    posterKey,
    posterAlt,
    images,
    milestones,
  ]);

  return (
    <Form
      submit="إنشاء"
      dontReplace
      //   trigger={<Button>إضافة مشروع جديد</Button>}
      action={action}
      success="تم تحديث المشروع بنجاح"
      replaceLink="/ar/dashboard/projects/"

      //   title="إضافة مشروع جديد"
    >
      <Input type="hidden" name="id" value={project.id} readOnly />
      {/* JSON payload fields for actions.ts */}
      <Input
        type="hidden"
        name="title"
        value={toJson(payload.title)}
        readOnly
      />
      <Input
        type="hidden"
        name="description"
        value={toJson(payload.description)}
        readOnly
      />
      <Input
        type="hidden"
        name="poster"
        value={toJson(payload.poster)}
        readOnly
      />
      <Input
        type="hidden"
        name="images"
        value={toJson(payload.images)}
        readOnly
      />
      <Input
        type="hidden"
        name="milestones"
        value={toJson(payload.milestones)}
        readOnly
      />

      <div className="rounded-md border  grid gap-3 py-3">
        <div className="text-sm font-medium">صورة الغلاف (Poster)</div>
        {posterSrc && posterKey ? (
          <div className="">
            <div className="relative w-32 h-20">
              <Image
                fill
                src={posterSrc}
                alt={posterAlt || "Poster image"}
                className="w-32 h-20 object-cover rounded-md border"
              />
            </div>
            <Button
              variant={"destructive"}
              onClick={() => {
                setPosterSrc("");
                setPosterKey("");
                setPosterAlt("");
              }}
            >
              إزالة صورة الغلاف
            </Button>
          </div>
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const { ufsUrl, key, name } = res[0];
              if (ufsUrl && key) {
                setPosterSrc(ufsUrl);
                setPosterKey(key);
                setPosterAlt(name);
              }
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast.error(`ERROR! ${error.message}`);
            }}
          />
        )}
      </div>

      {/* Scalars */}
      <div
        className="grid md:grid-cols-2 gap-4"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="grid gap-2">
          <Label htmlFor="titleAr">عنوان المشروع (عربي)</Label>
          <Input
            id="titleAr"
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
            placeholder="أدخل العنوان بالعربية"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="titleEn">عنوان المشروع (English)</Label>
          <Input
            id="titleEn"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            placeholder="Project title in English"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">التصنيف</Label>
          <Input
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="مثال: بناء، صيانة، توريد..."
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">الموقع</Label>
          <Input
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="اختياري"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="client">العميل</Label>
          <Input
            id="client"
            name="client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="اختياري"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="startDate">تاريخ البداية</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="endDate">تاريخ النهاية</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="descAr">الوصف (عربي)</Label>
          <Input
            id="descAr"
            value={descAr}
            onChange={(e) => setDescAr(e.target.value)}
            placeholder="اختياري"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="descEn">Description (English)</Label>
          <Input
            id="descEn"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            placeholder="Optional"
          />
        </div>

        {/* Simple Images editor */}
        <ImagesEditor images={images} setImages={setImages} />

        {/* Simple Milestones editor */}
        <MilestonesEditor
          milestones={milestones}
          setMilestones={setMilestones}
        />
      </div>
    </Form>
  );
};
