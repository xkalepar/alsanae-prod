declare interface UserSession {
  id: string;
  fullName: string;
  role: "admin" | "superAdmin";
  email: string;
}

declare type nullable = null | undefined;

declare type Locale = "ar" | "en";

declare type Action = (
  prevState: { message: string },
  formData: FormData,
) => Promise<{ message: string }>;
