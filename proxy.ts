// middleware.ts (or whatever file exports `config` + your middleware entry)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "@/lib/i18n/settings";
import { getSession, updateSession } from "./lib/session";

/**
 * Any request that ends with a file extension (e.g. .svg, .png, .css, .js, .map)
 * should bypass middleware to avoid breaking static assets.
 */
const PUBLIC_FILE = /\.[^/]+$/;

/** Public folders served from /public */
const PUBLIC_FOLDERS = ["/images", "/logos", "/content"];

/** Exact public files served from /public root */
const PUBLIC_FILES = [
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.json",
  "/manifest.en.json",
  "/manifest.ar.json",
  "/logo.png",
  "/white-logo.png",
  "/web-app-manifest-512x512.png",
  "/web-app-manifest-192x192.png",
];

const protectedRoutes = {
  adminsRoutes: ["/dashboard"],
  superAdminsRoutes: ["/dashboard/users"],
};

function getLocale(request: NextRequest): string {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // @ts-expect-error locales may be readonly
  const locales: string[] = i18n.locales;

  const languages = new Negotiator({ headers }).languages(locales);
  return matchLocale(languages, locales, i18n.defaultLocale);
}

function isPublicAssetPath(pathname: string): boolean {
  // Next internals + API
  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/"))
    return true;

  // exact public files (with or without locale prefix)
  if (PUBLIC_FILES.includes(pathname)) return true;
  if (i18n.locales.some((loc) => PUBLIC_FILES.includes(`/${loc}${pathname}`)))
    return true;

  // any file with extension (svg/png/css/js/etc), with or without locale prefix
  if (PUBLIC_FILE.test(pathname)) return true;
  if (
    i18n.locales.some((loc) =>
      PUBLIC_FILE.test(pathname.replace(`/${loc}`, "")),
    )
  )
    return true;

  // public folders (/images, /logos, /content), with or without locale prefix
  if (
    PUBLIC_FOLDERS.some((p) => pathname === p || pathname.startsWith(p + "/"))
  )
    return true;

  if (
    i18n.locales.some((loc) =>
      PUBLIC_FOLDERS.some(
        (p) =>
          pathname === `/${loc}${p}` || pathname.startsWith(`/${loc}${p}/`),
      ),
    )
  ) {
    return true;
  }

  return false;
}

function stripLocalePrefix(pathname: string): {
  locale?: string;
  path: string;
} {
  for (const loc of i18n.locales) {
    if (pathname === `/${loc}`) return { locale: loc, path: "/" };
    if (pathname.startsWith(`/${loc}/`))
      return { locale: loc, path: pathname.slice(loc.length + 1) };
  }
  return { path: pathname };
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1) Never run auth/locale/session logic for assets
  if (isPublicAssetPath(pathname)) {
    return NextResponse.next();
  }

  // 2) Auth checks only for locale-prefixed protected routes
  const { locale, path } = stripLocalePrefix(pathname);

  if (locale) {
    // super admin routes
    if (
      protectedRoutes.superAdminsRoutes.some(
        (route) => path === route || path.startsWith(route + "/"),
      )
    ) {
      const session = await getSession();

      if (!session) {
        return NextResponse.redirect(
          new URL(
            `/${locale}/sign-in?redirect=${encodeURIComponent(pathname)}`,
            request.url,
          ),
        );
      }

      if (session.role !== "superAdmin") {
        return NextResponse.redirect(
          new URL(`/${locale}/dashboard`, request.url),
        );
      }
    }

    // admin routes
    if (
      protectedRoutes.adminsRoutes.some(
        (route) => path === route || path.startsWith(route + "/"),
      )
    ) {
      const session = await getSession();

      if (!session) {
        return NextResponse.redirect(
          new URL(
            `/${locale}/sign-in?redirect=${encodeURIComponent(pathname)}`,
            request.url,
          ),
        );
      }
    }
  }

  // 3) Locale redirect if missing
  const missingLocale = i18n.locales.every(
    (loc) => !pathname.startsWith(`/${loc}/`) && pathname !== `/${loc}`,
  );

  if (missingLocale) {
    const locale = getLocale(request);
    const target = `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
    return NextResponse.redirect(new URL(target, request.url));
  }

  // 4) Session update for normal page requests
  return await updateSession();
}

export const config = {
  matcher: ["/((?!api|_next).*)"],
};
