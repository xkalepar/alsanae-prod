import type { Locale } from "@/lib/i18n/settings"
import { getDictionary } from "@/lib/i18n"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function TermsPage(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;
  const dict = await getDictionary(params.lang)
  const isRtl = params.lang === "ar"

  const termsContent = {
    en: {
      title: "Terms of Service",
      description: "Terms and conditions for using our construction services",
      lastUpdated: "Last updated: January 2024",
      sections: [
        {
          title: "Acceptance of Terms",
          content: [
            "By accessing and using BuildMaster Construction services, you accept and agree to be bound by these terms.",
            "If you do not agree to these terms, please do not use our services.",
            "We reserve the right to modify these terms at any time with notice.",
            "Continued use of our services after changes constitutes acceptance of new terms.",
          ],
        },
        {
          title: "Services Description",
          content: [
            "BuildMaster Construction provides residential, commercial, and industrial construction services.",
            "Services include but are not limited to: construction, renovation, architectural design, and consultation.",
            "All services are subject to availability and our capacity to deliver.",
            "Service specifications will be detailed in individual project contracts.",
          ],
        },
        {
          title: "Project Contracts",
          content: [
            "All construction projects require a signed contract before work begins.",
            "Contracts will specify scope of work, timeline, materials, and payment terms.",
            "Changes to project scope must be agreed upon in writing.",
            "Contract terms supersede these general terms of service for specific projects.",
          ],
        },
        {
          title: "Payment Terms",
          content: [
            "Payment schedules will be outlined in individual project contracts.",
            "Deposits may be required before project commencement.",
            "Late payments may incur additional charges as specified in contracts.",
            "All prices are subject to change based on material costs and project modifications.",
          ],
        },
        {
          title: "Warranties and Guarantees",
          content: [
            "We provide warranties on our workmanship as specified in project contracts.",
            "Material warranties are provided by manufacturers and suppliers.",
            "Warranty claims must be reported within the specified warranty period.",
            "Normal wear and tear, misuse, or damage from external factors are not covered.",
          ],
        },
        {
          title: "Liability and Insurance",
          content: [
            "BuildMaster Construction maintains appropriate insurance coverage for all projects.",
            "Our liability is limited to the terms specified in individual project contracts.",
            "Clients are responsible for obtaining necessary permits and approvals.",
            "We are not liable for delays caused by weather, permit issues, or client changes.",
          ],
        },
        {
          title: "Intellectual Property",
          content: [
            "All architectural designs and plans remain the property of BuildMaster Construction unless otherwise agreed.",
            "Clients receive usage rights for their specific project only.",
            "Reproduction or modification of designs requires written permission.",
            "Third-party materials and designs are subject to their respective licenses.",
          ],
        },
        {
          title: "Termination",
          content: [
            "Either party may terminate services with written notice as specified in contracts.",
            "Termination fees may apply based on work completed and materials ordered.",
            "All outstanding payments must be settled upon termination.",
            "Termination does not affect warranties on completed work.",
          ],
        },
        {
          title: "Dispute Resolution",
          content: [
            "Disputes will be resolved through negotiation and mediation when possible.",
            "Legal proceedings will be conducted under Libyan law.",
            "Jurisdiction for legal matters is Tripoli, Libya.",
            "Both parties agree to act in good faith to resolve disputes quickly.",
          ],
        },
      ],
    },
    ar: {
      title: "شروط الخدمة",
      description: "الشروط والأحكام لاستخدام خدمات البناء الخاصة بنا",
      lastUpdated: "آخر تحديث: يناير 2024",
      sections: [
        {
          title: "قبول الشروط",
          content: [
            "من خلال الوصول إلى خدمات بيلد ماستر للإنشاءات واستخدامها، فإنك تقبل وتوافق على الالتزام بهذه الشروط.",
            "إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدماتنا.",
            "نحتفظ بالحق في تعديل هذه الشروط في أي وقت مع الإشعار.",
            "الاستمرار في استخدام خدماتنا بعد التغييرات يشكل قبولاً للشروط الجديدة.",
          ],
        },
        {
          title: "وصف الخدمات",
          content: [
            "تقدم بيلد ماستر للإنشاءات خدمات البناء السكنية والتجارية والصناعية.",
            "تشمل الخدمات على سبيل المثال لا الحصر: البناء والتجديد والتصميم المعماري والاستشارة.",
            "جميع الخدمات تخضع للتوفر وقدرتنا على التسليم.",
            "سيتم تفصيل مواصفات الخدمة في عقود المشاريع الفردية.",
          ],
        },
        {
          title: "عقود المشاريع",
          content: [
            "جميع مشاريع البناء تتطلب عقداً موقعاً قبل بدء العمل.",
            "ستحدد العقود نطاق العمل والجدول الزمني والمواد وشروط الدفع.",
            "يجب الاتفاق على التغييرات في نطاق المشروع كتابياً.",
            "شروط العقد تحل محل شروط الخدمة العامة هذه للمشاريع المحددة.",
          ],
        },
        {
          title: "شروط الدفع",
          content: [
            "سيتم تحديد جداول الدفع في عقود المشاريع الفردية.",
            "قد تكون هناك حاجة لدفعات مقدمة قبل بدء المشروع.",
            "المدفوعات المتأخرة قد تتحمل رسوماً إضافية كما هو محدد في العقود.",
            "جميع الأسعار قابلة للتغيير بناءً على تكاليف المواد وتعديلات المشروع.",
          ],
        },
        {
          title: "الضمانات والكفالات",
          content: [
            "نقدم ضمانات على صنعتنا كما هو محدد في عقود المشاريع.",
            "ضمانات المواد مقدمة من الشركات المصنعة والموردين.",
            "يجب الإبلاغ عن مطالبات الضمان خلال فترة الضمان المحددة.",
            "البلى الطبيعي أو سوء الاستخدام أو الأضرار من عوامل خارجية غير مشمولة.",
          ],
        },
        {
          title: "المسؤولية والتأمين",
          content: [
            "تحتفظ بيلد ماستر للإنشاءات بتغطية تأمينية مناسبة لجميع المشاريع.",
            "مسؤوليتنا محدودة بالشروط المحددة في عقود المشاريع الفردية.",
            "العملاء مسؤولون عن الحصول على التصاريح والموافقات اللازمة.",
            "نحن غير مسؤولين عن التأخير الناجم عن الطقس أو مشاكل التصاريح أو تغييرات العميل.",
          ],
        },
        {
          title: "الملكية الفكرية",
          content: [
            "جميع التصاميم المعمارية والمخططات تبقى ملكاً لبيلد ماستر للإنشاءات ما لم يتم الاتفاق على خلاف ذلك.",
            "يحصل العملاء على حقوق الاستخدام لمشروعهم المحدد فقط.",
            "إعادة إنتاج أو تعديل التصاميم يتطلب إذناً كتابياً.",
            "المواد والتصاميم من طرف ثالث تخضع لتراخيصها المعنية.",
          ],
        },
        {
          title: "الإنهاء",
          content: [
            "يجوز لأي من الطرفين إنهاء الخدمات بإشعار كتابي كما هو محدد في العقود.",
            "قد تطبق رسوم الإنهاء بناءً على العمل المكتمل والمواد المطلوبة.",
            "يجب تسوية جميع المدفوعات المستحقة عند الإنهاء.",
            "الإنهاء لا يؤثر على ضمانات العمل المكتمل.",
          ],
        },
        {
          title: "حل النزاعات",
          content: [
            "سيتم حل النزاعات من خلال التفاوض والوساطة عند الإمكان.",
            "ستتم الإجراءات القانونية تحت القانون الليبي.",
            "الاختصاص القضائي للمسائل القانونية هو طرابلس، ليبيا.",
            "يوافق كلا الطرفين على التصرف بحسن نية لحل النزاعات بسرعة.",
          ],
        },
      ],
    },
  }

  const content = termsContent[params.lang]

  return (
    <div className="container py-10">
      <PageHeader title={content.title} description={content.description} />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className={`text-sm text-muted-foreground ${isRtl ? "text-right" : "text-left"}`}>{content.lastUpdated}</p>
        </div>

        <div className="space-y-8">
          {content.sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className={isRtl ? "text-right" : "text-left"}>
                  {index + 1}. {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className={`space-y-3 ${isRtl ? "text-right" : "text-left"}`}>
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
