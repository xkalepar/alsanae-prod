import type { Locale } from "@/lib/i18n/settings"
import { getDictionary } from "@/lib/i18n"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { PageHeader } from "@/components/page-header"

export default async function ContactPage(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;
  const dict = await getDictionary(params.lang)

  return (
    <div className="container py-10">
      <PageHeader title={dict.contact.title} description={dict.contact.description} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ContactInfo dictionary={dict.contact.info} />
        <ContactForm dictionary={dict.contact.form} lang={params.lang} />
      </div>
    </div>
  )
}
