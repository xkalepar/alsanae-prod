"use client";
import { logout } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import AccessibleDialogForm from "./accible-dialog-form";

const Logout = ({
  children = (
    <button
      className={cn(
        "text-foreground/80 transition-all w-fit mx-auto px-2 py-1 rounded-md hover:bg-primary/30",
      )}
    >
      تسجيل الخروج
    </button>
  ),
}: {
  children?: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <AccessibleDialogForm
      action={logout}
      trigger={children}
      title="تسجيل الخروج"
      description="هل أنت متاكد من تسجيل الخروج"
      setOpen={setOpen}
      open={open}
      submit={"تسجيل الخروج"}
    >
      <></>
    </AccessibleDialogForm>
  );
};

export default Logout;
