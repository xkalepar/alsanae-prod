"use client";
import UsersTable from "@/components/reusable-table";
import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usersTable } from "./components/users-column";
import {
  CreateUserForm,
  DeleteUserForm,
  ResetPasswordForm,
  UpdateUserForm,
} from "./components/forms";

import { useParams } from "next/navigation";
import { User } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
const ClientPage = ({
  users,
  createUserAction,
  updateUserAction,
  deleteUserAction,
  resetPasswordAction,
}: {
  users: User[];
  createUserAction: Action;
  updateUserAction: Action;
  deleteUserAction: Action;
  resetPasswordAction: Action;
}) => {
  const { lang } = useParams();

  return (
    <main className="max-md:px-4">
      <div className=" flex md:justify-between  justify-start flex-col  md:flex-row md:items-center md:mx-2 my-2">
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
              <BreadcrumbPage>ادارة المستخدمين</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CreateUserForm action={createUserAction} />
        {/* <CustomLink href={`/${lang}/dashboard/users/new`}>حساب جديد</CustomLink> */}
      </div>
      <div className=" my-4 container">
        <Suspense fallback={"جاري التحميل"}>
          <UsersTable
            searchPlaceholder="البحث بالاسم"
            data={users}
            columns={[
              ...usersTable,
              {
                id: "actions",
                header: "الأحداث",
                enableHiding: false,
                cell: ({ row }) => {
                  const user = row.original;
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
                            navigator.clipboard.writeText(
                              String(user.phoneNumber),
                            );
                            toast("تم نسخ رقم الهاتف بنجاح");
                          }}
                        >
                          نسح رقم الهاتف
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <UpdateUserForm
                            action={updateUserAction}
                            user={user}
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <DeleteUserForm
                            action={deleteUserAction}
                            id={user.id}
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <ResetPasswordForm
                            action={resetPasswordAction}
                            user={user}
                          />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                },
              },
            ]}
            searchQuery="fullName"
          />
        </Suspense>
      </div>
    </main>
  );
};

export default ClientPage;
