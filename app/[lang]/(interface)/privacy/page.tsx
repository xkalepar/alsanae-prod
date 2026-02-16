import type { Locale } from "@/lib/i18n/settings"
import { getDictionary } from "@/lib/i18n"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function PrivacyPage(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;
  const dict = await getDictionary(params.lang)
  const isRtl = params.lang === "ar"

  const privacyContent = {
    en: {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information",
      lastUpdated: "Last updated: January 2024",
      sections: [
        {
          title: "Information We Collect",
          content: [
            "Personal information you provide when requesting quotes or contacting us, including name, email, phone number, and project details.",
            "Technical information such as IP address, browser type, and device information when you visit our website.",
            "Communication records when you interact with our customer service team.",
            "Project-related documents and files you upload through our quote request forms.",
          ],
        },
        {
          title: "How We Use Your Information",
          content: [
            "To provide construction services and respond to your inquiries.",
            "To prepare and deliver project quotes and proposals.",
            "To communicate with you about your projects and our services.",
            "To improve our website and services based on user feedback.",
            "To comply with legal obligations and protect our business interests.",
          ],
        },
        {
          title: "Information Sharing",
          content: [
            "We do not sell, trade, or rent your personal information to third parties.",
            "We may share information with trusted contractors and suppliers involved in your project.",
            "We may disclose information when required by law or to protect our rights.",
            "Anonymous, aggregated data may be used for business analysis and improvement.",
          ],
        },
        {
          title: "Data Security",
          content: [
            "We implement appropriate security measures to protect your personal information.",
            "All data transmission is encrypted using industry-standard SSL technology.",
            "Access to personal information is restricted to authorized personnel only.",
            "We regularly review and update our security practices.",
          ],
        },
        {
          title: "Your Rights",
          content: [
            "You have the right to access, update, or delete your personal information.",
            "You can opt-out of marketing communications at any time.",
            "You can request a copy of the personal information we hold about you.",
            "You can file a complaint with relevant data protection authorities.",
          ],
        },
        {
          title: "Cookies and Tracking",
          content: [
            "We use cookies to improve your browsing experience and analyze website traffic.",
            "You can control cookie settings through your browser preferences.",
            "Third-party analytics tools may be used to understand website usage patterns.",
            "We do not use cookies for targeted advertising purposes.",
          ],
        },
        {
          title: "Contact Information",
          content: [
            "If you have questions about this privacy policy, please contact us:",
            "Email: contact@ebtkar.tech",
            "Phone: +218 92 8666 458",
            "Address: Libya, Tripoli",
          ],
        },
      ],
    },
    ar: {
      title: "سياسة الخصوصية",
      description: "كيف نجمع ونستخدم ونحمي معلوماتك الشخصية",
      lastUpdated: "آخر تحديث: يناير 2024",
      sections: [
        {
          title: "المعلومات التي نجمعها",
          content: [
            "المعلومات الشخصية التي تقدمها عند طلب عروض الأسعار أو الاتصال بنا، بما في ذلك الاسم والبريد الإلكتروني ورقم الهاتف وتفاصيل المشروع.",
            "المعلومات التقنية مثل عنوان IP ونوع المتصفح ومعلومات الجهاز عند زيارة موقعنا الإلكتروني.",
            "سجلات الاتصال عند تفاعلك مع فريق خدمة العملاء لدينا.",
            "المستندات والملفات المتعلقة بالمشروع التي تحملها من خلال نماذج طلب عرض الأسعار.",
          ],
        },
        {
          title: "كيف نستخدم معلوماتك",
          content: [
            "لتقديم خدمات البناء والرد على استفساراتك.",
            "لإعداد وتقديم عروض أسعار ومقترحات المشاريع.",
            "للتواصل معك حول مشاريعك وخدماتنا.",
            "لتحسين موقعنا الإلكتروني وخدماتنا بناءً على ملاحظات المستخدمين.",
            "للامتثال للالتزامات القانونية وحماية مصالح أعمالنا.",
          ],
        },
        {
          title: "مشاركة المعلومات",
          content: [
            "نحن لا نبيع أو نتاجر أو نؤجر معلوماتك الشخصية لأطراف ثالثة.",
            "قد نشارك المعلومات مع المقاولين والموردين الموثوقين المشاركين في مشروعك.",
            "قد نكشف عن المعلومات عندما يتطلب القانون ذلك أو لحماية حقوقنا.",
            "قد تُستخدم البيانات المجمعة المجهولة لتحليل الأعمال والتحسين.",
          ],
        },
        {
          title: "أمان البيانات",
          content: [
            "نطبق تدابير أمنية مناسبة لحماية معلوماتك الشخصية.",
            "جميع عمليات نقل البيانات مشفرة باستخدام تقنية SSL المعيارية في الصناعة.",
            "الوصول إلى المعلومات الشخصية مقصور على الموظفين المخولين فقط.",
            "نراجع ونحدث ممارساتنا الأمنية بانتظام.",
          ],
        },
        {
          title: "حقوقك",
          content: [
            "لديك الحق في الوصول إلى معلوماتك الشخصية أو تحديثها أو حذفها.",
            "يمكنك إلغاء الاشتراك في الاتصالات التسويقية في أي وقت.",
            "يمكنك طلب نسخة من المعلومات الشخصية التي نحتفظ بها عنك.",
            "يمكنك تقديم شكوى لدى سلطات حماية البيانات ذات الصلة.",
          ],
        },
        {
          title: "ملفات تعريف الارتباط والتتبع",
          content: [
            "نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل حركة المرور على الموقع.",
            "يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال تفضيلات المتصفح.",
            "قد تُستخدم أدوات التحليل من طرف ثالث لفهم أنماط استخدام الموقع.",
            "نحن لا نستخدم ملفات تعريف الارتباط لأغراض الإعلان المستهدف.",
          ],
        },
        {
          title: "معلومات الاتصال",
          content: [
            "إذا كان لديك أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا:",
            "البريد الإلكتروني: contact@ebtkar.tech",
            "الهاتف: +218 92 8666 458",
            "العنوان: ليبيا، طرابلس",
          ],
        },
      ],
    },
  }

  const content = privacyContent[params.lang]

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
                <CardTitle className={isRtl ? "text-right" : "text-left"}>{section.title}</CardTitle>
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
