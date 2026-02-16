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
import { getUsers } from "@/database/users";
import { usersTable } from "./components/users-column";
import { CreateUserForm } from "./components/forms";

import {
  createUserAction,
  deleteUserAction,
  updateUserAction,
} from "./actions";
import ClientPage from "./page.client";
const page = async (props: {
  searchParams: Promise<{ fullName?: string }>;
  params: Promise<{ lang: string }>;
}) => {
  const params = await props.params;

  const { lang } = params;
  const searchParams = await props.searchParams;
  const users = await getUsers({ fullName: searchParams?.fullName });

  return (
    <ClientPage
      createUserAction={createUserAction}
      updateUserAction={updateUserAction}
      deleteUserAction={deleteUserAction}
      resetPasswordAction={updateUserAction}
      users={users}
    />
  );
};

export default page;
