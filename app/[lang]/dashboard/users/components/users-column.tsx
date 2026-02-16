"use client";
import { ColumnDef } from "@tanstack/react-table";

import { User } from "@/generated/prisma/client";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";

export const usersTable: ColumnDef<User>[] = [
  {
    accessorKey: "الاسم",
    header: "الاسم",
    cell: ({ row }) => {
      if (row) {
        const fullName = row.original?.fullName;
        return <div>{fullName ?? "لايوجد"}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "رقم الهاتف",
    header: "رقم الهاتف",
    cell: ({ row }) => {
      if (row) {
        const phone = row.original?.phoneNumber;
        return <div>{phone}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },

  {
    accessorKey: "البريد",
    header: "البريد",
    cell: ({ row }) => {
      if (row) {
        const email = row.original?.email;
        return <div>{email}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },

  {
    accessorKey: "الدور",
    header: "الدور",
    cell: ({ row }) => {
      if (row) {
        const role = row.original?.role;
        return <div className="  rounded ">{role}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "موثق",
    header: "موثق",
    cell: ({ row }) => {
      if (row) {
        const verified = row.original?.verified;
        return (
          <div className="mx-auto w-fit">
            {verified ? (
              <IoMdCheckmark size={22} className="text-green-500" />
            ) : (
              <FaXmark size={22} className="text-red-500" />
            )}
          </div>
        );
      } else {
        <div>لايوجد</div>;
      }
    },
  },
];
