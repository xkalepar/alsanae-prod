import type { Locale } from "@/lib/i18n/settings"
import { getDictionary } from "@/lib/i18n"
import { getServices } from "@/lib/data"
import { ServiceGrid } from "@/components/service-grid"
import { PageHeader } from "@/components/page-header"

export default async function ServicesPage(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;
  const dict = await getDictionary(params.lang)
  const services = await getServices(params.lang)

  return (
    <div className="container py-10">
      <PageHeader title={dict.services.title} description={dict.services.description} />
      <ServiceGrid services={services} lang={params.lang} />
    </div>
  )
}
