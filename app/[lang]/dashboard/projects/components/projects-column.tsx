"use client";
// app/[lang]/dashboard/projects/components/projects-column.tsx

import { ColumnDef } from "@tanstack/react-table";
import { Project } from "@/generated/prisma/client";

export const projectsTable: ColumnDef<Project>[] = [
  {
    accessorKey: "العنوان",
    header: "العنوان",
    cell: ({ row }) => {
      if (row) {
        const titleAr = row.original?.title?.ar;
        const titleEn = row.original?.title?.en;
        return (
          <div className="space-y-1">
            <div>{titleAr ?? "لايوجد"}</div>
            {titleEn ? (
              <div className="text-xs text-muted-foreground">{titleEn}</div>
            ) : null}
          </div>
        );
      } else {
        return <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "التصنيف",
    header: "التصنيف",
    cell: ({ row }) => {
      if (row) {
        const category = row.original?.category;
        return <div>{category ?? "لايوجد"}</div>;
      } else {
        return <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "العميل",
    header: "العميل",
    cell: ({ row }) => {
      if (row) {
        const client = row.original?.client;
        return <div>{client ?? "لايوجد"}</div>;
      } else {
        return <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "الموقع",
    header: "الموقع",
    cell: ({ row }) => {
      if (row) {
        const location = row.original?.location;
        return <div>{location ?? "لايوجد"}</div>;
      } else {
        return <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "تاريخ البداية",
    header: "تاريخ البداية",
    cell: ({ row }) => {
      if (row) {
        const d = row.original?.startDate;
        return <div>{d ? formatDate(d) : "لايوجد"}</div>;
      } else {
        return <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "تاريخ النهاية",
    header: "تاريخ النهاية",
    cell: ({ row }) => {
      if (row) {
        const d = row.original?.endDate;
        return <div>{d ? formatDate(d) : "لايوجد"}</div>;
      } else {
        return <div>لايوجد</div>;
      }
    },
  },
];

function formatDate(value: Date) {
  // Keeps it simple and stable: YYYY-MM-DD
  const d = new Date(value);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
