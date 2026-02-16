import Link from "next/link";
import { Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n/settings";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

interface FooterProps {
  lang: Locale;
  dictionary: {
    company: string;
    rights: string;
    links: {
      privacy: string;
      terms: string;
      careers: string;
    };
    social: {
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
    };
  };
}

{
  /*
  phones: 
  0912154284



WhatsApp 00218917339276
  
  */
}

export function Footer({ lang, dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isRtl = lang === "ar";

  return (
    <footer className="border-t bg-background">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link href={`/${lang}`} className="flex items-center gap-2">
              <Image src={"/logo.png"} alt="Logo" width={72} height={72} />
            </Link>
            <p className="text-sm text-muted-foreground">
              {dictionary.company} © {currentYear} {dictionary.rights}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">
              {lang === "en" ? "Quick Links" : "روابط سريعة"}
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href={`/${lang}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {lang === "en" ? "Home" : "الرئيسية"}
              </Link>
              <Link
                href={`/${lang}/projects`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {lang === "en" ? "Projects" : "المشاريع"}
              </Link>
              <Link
                href={`/${lang}/services`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {lang === "en" ? "Services" : "الخدمات"}
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {lang === "en" ? "Contact" : "اتصل بنا"}
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">
              {lang === "en" ? "Legal" : "قانوني"}
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href={`/${lang}/privacy`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {dictionary.links.privacy}
              </Link>
              <Link
                href={`/${lang}/terms`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {dictionary.links.terms}
              </Link>
              {/* <Link
                href={`/${lang}/careers`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {dictionary.links.careers}
              </Link> */}
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">
              {lang === "en" ? "Phone Numbers" : "ارقام التواصل"}
            </h3>
            <div className="flex items-start flex-col space-x-4">
              <Link
                href="tel:0912154284"
                className="text-muted-foreground flex gap-2 items-end justify-start flex-row-reverse hover:text-foreground"
              >
                <span className="">0912154284</span>
                <Phone className="h-5 w-5" />
              </Link>
              <Link
                href="tel:0925376902"
                className="text-muted-foreground flex gap-2 items-end justify-start flex-row-reverse hover:text-foreground"
              >
                <span className="">0925376902</span>
                <Phone className="h-5 w-5" />
              </Link>{" "}
              <Link
                href="tel:0915376902"
                className="text-muted-foreground flex gap-2 items-end justify-start flex-row-reverse hover:text-foreground"
              >
                <span className="">0915376902</span>
                <Phone className="h-5 w-5" />
              </Link>
              <Link
                href="tel:0924301040"
                className="text-muted-foreground flex gap-2 items-end justify-start flex-row-reverse hover:text-foreground"
              >
                <span className="">0924301040</span>
                <Phone className="h-5 w-5" />
              </Link>
              <Link
                href="https://wa.me/00218917339276"
                className="text-muted-foreground flex gap-2 items-end justify-start flex-row-reverse hover:text-foreground"
              >
                <span className="">00218917339276</span>
                <FaWhatsapp className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        {/* Built by section */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            {lang === "en" ? "Built by" : "تم التطوير بواسطة"}{" "}
            <a
              href="https://www.mnfd.ly"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              منفذ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
