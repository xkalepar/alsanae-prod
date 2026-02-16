import type { Locale } from "@/lib/i18n/settings"
import { getDictionary } from "@/lib/i18n"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign } from "lucide-react"

export default async function CareersPage(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;
  const dict = await getDictionary(params.lang)
  const isRtl = params.lang === "ar"

  const careersContent = {
    en: {
      title: "Careers",
      description: "Join our team and build your future with BuildMaster Construction",
      intro: {
        title: "Why Work With Us?",
        benefits: [
          "Competitive salary and benefits package",
          "Professional development and training opportunities",
          "Work on exciting and challenging construction projects",
          "Collaborative and supportive work environment",
          "Career advancement opportunities",
          "Health insurance and retirement plans",
        ],
      },
      positions: [
        {
          id: "1",
          title: "Senior Project Manager",
          department: "Project Management",
          location: "Tripoli, Libya",
          type: "Full-time",
          salary: "Competitive",
          description:
            "Lead and manage large-scale construction projects from planning to completion. Coordinate with clients, contractors, and internal teams.",
          requirements: [
            "Bachelor's degree in Civil Engineering or Construction Management",
            "5+ years of project management experience in construction",
            "PMP certification preferred",
            "Strong leadership and communication skills",
            "Fluency in Arabic and English",
          ],
          responsibilities: [
            "Oversee project planning, scheduling, and execution",
            "Manage project budgets and resources",
            "Coordinate with clients and stakeholders",
            "Ensure quality standards and safety compliance",
            "Lead project teams and subcontractors",
          ],
        },
        {
          id: "2",
          title: "Civil Engineer",
          department: "Engineering",
          location: "Tripoli, Libya",
          type: "Full-time",
          salary: "Competitive",
          description:
            "Design and oversee construction projects, ensuring structural integrity and compliance with building codes and regulations.",
          requirements: [
            "Bachelor's degree in Civil Engineering",
            "2+ years of experience in construction or engineering",
            "Knowledge of AutoCAD and engineering software",
            "Understanding of building codes and regulations",
            "Strong analytical and problem-solving skills",
          ],
          responsibilities: [
            "Prepare engineering designs and technical drawings",
            "Conduct site inspections and quality assessments",
            "Collaborate with architects and project managers",
            "Ensure compliance with safety and building standards",
            "Review and approve construction plans",
          ],
        },
        {
          id: "3",
          title: "Construction Supervisor",
          department: "Operations",
          location: "Tripoli, Libya",
          type: "Full-time",
          salary: "Competitive",
          description:
            "Supervise daily construction activities, manage work crews, and ensure projects are completed safely and on schedule.",
          requirements: [
            "High school diploma or equivalent",
            "3+ years of construction supervision experience",
            "Knowledge of construction methods and safety procedures",
            "Strong leadership and organizational skills",
            "Ability to read blueprints and technical drawings",
          ],
          responsibilities: [
            "Supervise construction crews and subcontractors",
            "Monitor work progress and quality standards",
            "Enforce safety protocols and procedures",
            "Coordinate material deliveries and equipment",
            "Report progress to project managers",
          ],
        },
        {
          id: "4",
          title: "Architect",
          department: "Design",
          location: "Tripoli, Libya",
          type: "Full-time",
          salary: "Competitive",
          description:
            "Create innovative architectural designs for residential and commercial projects, working closely with clients and engineering teams.",
          requirements: [
            "Bachelor's degree in Architecture",
            "Licensed architect with 3+ years of experience",
            "Proficiency in AutoCAD, Revit, and 3D modeling software",
            "Strong creative and technical skills",
            "Portfolio of completed projects",
          ],
          responsibilities: [
            "Develop architectural concepts and designs",
            "Prepare detailed drawings and specifications",
            "Collaborate with clients on design requirements",
            "Coordinate with engineering and construction teams",
            "Ensure designs meet building codes and regulations",
          ],
        },
      ],
      application: {
        title: "How to Apply",
        instructions: [
          "Review the job requirements and responsibilities carefully",
          "Prepare your resume and cover letter",
          "Send your application to contact@ebtkar.tech",
          "Include the position title in your email subject line",
          "We will contact qualified candidates for interviews",
        ],
      },
    },
    ar: {
      title: "الوظائف",
      description: "انضم إلى فريقنا وابن مستقبلك مع بيلد ماستر للإنشاءات",
      intro: {
        title: "لماذا تعمل معنا؟",
        benefits: [
          "راتب تنافسي وحزمة مزايا",
          "فرص التطوير المهني والتدريب",
          "العمل على مشاريع بناء مثيرة ومتحدية",
          "بيئة عمل تعاونية وداعمة",
          "فرص التقدم الوظيفي",
          "التأمين الصحي وخطط التقاعد",
        ],
      },
      positions: [
        {
          id: "1",
          title: "مدير مشاريع أول",
          department: "إدارة المشاريع",
          location: "طرابلس، ليبيا",
          type: "دوام كامل",
          salary: "تنافسي",
          description:
            "قيادة وإدارة مشاريع البناء واسعة النطاق من التخطيط إلى الإنجاز. التنسيق مع العملاء والمقاولين والفرق الداخلية.",
          requirements: [
            "درجة البكالوريوس في الهندسة المدنية أو إدارة البناء",
            "خبرة 5+ سنوات في إدارة المشاريع في البناء",
            "شهادة PMP مفضلة",
            "مهارات قيادية وتواصل قوية",
            "إتقان اللغة العربية والإنجليزية",
          ],
          responsibilities: [
            "الإشراف على تخطيط وجدولة وتنفيذ المشاريع",
            "إدارة ميزانيات وموارد المشاريع",
            "التنسيق مع العملاء وأصحاب المصلحة",
            "ضمان معايير الجودة والامتثال للسلامة",
            "قيادة فرق المشاريع والمقاولين من الباطن",
          ],
        },
        {
          id: "2",
          title: "مهندس مدني",
          department: "الهندسة",
          location: "طرابلس، ليبيا",
          type: "دوام كامل",
          salary: "تنافسي",
          description: "تصميم والإشراف على مشاريع البناء، وضمان السلامة الهيكلية والامتثال لقوانين البناء واللوائح.",
          requirements: [
            "درجة البكالوريوس في الهندسة المدنية",
            "خبرة 2+ سنوات في البناء أو الهندسة",
            "معرفة بـ AutoCAD وبرامج الهندسة",
            "فهم قوانين البناء واللوائح",
            "مهارات تحليلية وحل المشاكل قوية",
          ],
          responsibilities: [
            "إعداد التصاميم الهندسية والرسومات التقنية",
            "إجراء تفتيشات الموقع وتقييمات الجودة",
            "التعاون مع المعماريين ومديري المشاريع",
            "ضمان الامتثال لمعايير السلامة والبناء",
            "مراجعة والموافقة على خطط البناء",
          ],
        },
        {
          id: "3",
          title: "مشرف بناء",
          department: "العمليات",
          location: "طرابلس، ليبيا",
          type: "دوام كامل",
          salary: "تنافسي",
          description:
            "الإشراف على أنشطة البناء اليومية، وإدارة طاقم العمل، وضمان إنجاز المشاريع بأمان وفي الموعد المحدد.",
          requirements: [
            "شهادة الثانوية العامة أو ما يعادلها",
            "خبرة 3+ سنوات في الإشراف على البناء",
            "معرفة بطرق البناء وإجراءات السلامة",
            "مهارات قيادية وتنظيمية قوية",
            "القدرة على قراءة المخططات والرسومات التقنية",
          ],
          responsibilities: [
            "الإشراف على طاقم البناء والمقاولين من الباطن",
            "مراقبة تقدم العمل ومعايير الجودة",
            "تطبيق بروتوكولات وإجراءات السلامة",
            "تنسيق تسليم المواد والمعدات",
            "تقديم تقارير التقدم لمديري المشاريع",
          ],
        },
        {
          id: "4",
          title: "معماري",
          department: "التصميم",
          location: "طرابلس، ليبيا",
          type: "دوام كامل",
          salary: "تنافسي",
          description:
            "إنشاء تصاميم معمارية مبتكرة للمشاريع السكنية والتجارية، والعمل بشكل وثيق مع العملاء وفرق الهندسة.",
          requirements: [
            "درجة البكالوريوس في العمارة",
            "معماري مرخص مع خبرة 3+ سنوات",
            "إتقان AutoCAD وRevit وبرامج النمذجة ثلاثية الأبعاد",
            "مهارات إبداعية وتقنية قوية",
            "محفظة أعمال من المشاريع المكتملة",
          ],
          responsibilities: [
            "تطوير المفاهيم والتصاميم المعمارية",
            "إعداد الرسومات والمواصفات التفصيلية",
            "التعاون مع العملاء حول متطلبات التصميم",
            "التنسيق مع فرق الهندسة والبناء",
            "ضمان امتثال التصاميم لقوانين البناء واللوائح",
          ],
        },
      ],
      application: {
        title: "كيفية التقديم",
        instructions: [
          "راجع متطلبات ومسؤوليات الوظيفة بعناية",
          "أعد سيرتك الذاتية وخطاب التغطية",
          "أرسل طلبك إلى contact@ebtkar.tech",
          "اذكر عنوان المنصب في موضوع البريد الإلكتروني",
          "سنتصل بالمرشحين المؤهلين للمقابلات",
        ],
      },
    },
  }

  const content = careersContent[params.lang]

  return (
    <div className="container py-10">
      <PageHeader title={content.title} description={content.description} />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Why Work With Us */}
        <Card>
          <CardHeader>
            <CardTitle className={isRtl ? "text-right" : "text-left"}>{content.intro.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.intro.benefits.map((benefit, index) => (
                <div key={index} className={`flex items-start gap-3 ${isRtl ? "text-right" : "text-left"}`}>
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Job Positions */}
        <div className="space-y-6">
          <h2 className={`text-2xl font-bold ${isRtl ? "text-right" : "text-left"}`}>
            {params.lang === "en" ? "Open Positions" : "الوظائف المتاحة"}
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {content.positions.map((position) => (
              <Card key={position.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className={`flex-1 ${isRtl ? "text-right" : "text-left"}`}>
                      <CardTitle className="text-xl mb-2">{position.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{position.department}</Badge>
                        <Badge variant="outline">{position.type}</Badge>
                      </div>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span>{position.salary}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="lg:self-start">{params.lang === "en" ? "Apply Now" : "تقدم الآن"}</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className={isRtl ? "text-right" : "text-left"}>
                    <p className="text-muted-foreground">{position.description}</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className={isRtl ? "text-right" : "text-left"}>
                      <h4 className="font-semibold mb-3">{params.lang === "en" ? "Requirements:" : "المتطلبات:"}</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            <span className="text-sm text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={isRtl ? "text-right" : "text-left"}>
                      <h4 className="font-semibold mb-3">
                        {params.lang === "en" ? "Responsibilities:" : "المسؤوليات:"}
                      </h4>
                      <ul className="space-y-2">
                        {position.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            <span className="text-sm text-muted-foreground">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Apply */}
        <Card>
          <CardHeader>
            <CardTitle className={isRtl ? "text-right" : "text-left"}>{content.application.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className={`space-y-3 ${isRtl ? "text-right" : "text-left"}`}>
              {content.application.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-muted-foreground">{instruction}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className={`text-sm text-muted-foreground ${isRtl ? "text-right" : "text-left"}`}>
                <strong>{params.lang === "en" ? "Contact:" : "الاتصال:"}</strong> contact@ebtkar.tech
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
