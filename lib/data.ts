import type { Locale } from "@/lib/i18n/settings";

// Mock data - In a real app, this would come from your database
export async function getProjects(
  lang: Locale,
  options?: { featured?: boolean; limit?: number },
) {
  const projects = [
    {
      id: "1",
      title: lang === "en" ? "City Center Tower" : "برج وسط المدينة",
      description:
        lang === "en"
          ? "A modern 40-story mixed-use tower featuring commercial spaces, luxury apartments, and retail outlets in the heart of the city."
          : "برج حديث من 40 طابقًا متعدد الاستخدامات يضم مساحات تجارية وشقق فاخرة ومنافذ بيع بالتجزئة في قلب المدينة.",
      location: lang === "en" ? "Downtown District" : "منطقة وسط المدينة",
      image: "/placeholder.svg?height=400&width=600",
      category: "commercial",
      startDate: "2023-01-15",
      endDate: "2025-06-30",
      client: lang === "en" ? "Urban Development Corp" : "شركة التطوير الحضري",
      milestones: [],
      achievements: [],
      images: ["/placeholder.svg?height=400&width=600"],
    },
    {
      id: "2",
      title: lang === "en" ? "Green Valley Residences" : "مساكن الوادي الأخضر",
      description:
        lang === "en"
          ? "Sustainable residential complex with 200 eco-friendly homes featuring solar panels, rainwater harvesting, and green spaces."
          : "مجمع سكني مستدام يضم 200 منزل صديق للبيئة مع ألواح شمسية وحصاد مياه الأمطار والمساحات الخضراء.",
      location: lang === "en" ? "Green Valley" : "الوادي الأخضر",
      image: "/placeholder.svg?height=400&width=600",
      category: "residential",
      startDate: "2022-03-01",
      endDate: "2023-12-15",
      client: lang === "en" ? "EcoHomes Ltd" : "إيكو هومز المحدودة",
      milestones: [],
      achievements: [],
      images: ["/placeholder.svg?height=400&width=600"],
    },
    {
      id: "3",
      title: lang === "en" ? "Tech Hub Campus" : "حرم مركز التكنولوجيا",
      description:
        lang === "en"
          ? "State-of-the-art technology campus with research facilities, office spaces, and innovation labs for leading tech companies."
          : "حرم تكنولوجي حديث مع مرافق البحث ومساحات المكاتب ومختبرات الابتكار لشركات التكنولوجيا الرائدة.",
      location: lang === "en" ? "Tech District" : "منطقة التكنولوجيا",
      image: "/placeholder.svg?height=400&width=600",
      category: "commercial",
      startDate: "2021-06-01",
      endDate: "2022-11-30",
      client: lang === "en" ? "TechCorp Industries" : "تك كورب إندستريز",
      milestones: [],
      achievements: [],
      images: ["/placeholder.svg?height=400&width=600"],
    },
  ];

  let filteredProjects = projects;

  if (options?.featured) {
    filteredProjects = projects.slice(0, 3);
  }

  if (options?.limit) {
    filteredProjects = filteredProjects.slice(0, options.limit);
  }

  return filteredProjects;
}

export async function getProject(lang: Locale, id: string) {
  const projects = await getProjects(lang);
  return projects.find((project) => project.id === id);
}

export async function getServices(lang: Locale) {
  return [
    {
      id: "1",
      title: lang === "en" ? "Residential Construction" : "البناء السكني",
      description:
        lang === "en"
          ? "Custom homes, apartments, and residential complexes built to the highest standards."
          : "منازل مخصصة وشقق ومجمعات سكنية مبنية وفقًا لأعلى المعايير.",
      icon: "home",
      features: [
        lang === "en" ? "Custom home design" : "تصميم منزل مخصص",
        lang === "en" ? "Quality materials" : "مواد عالية الجودة",
        lang === "en" ? "Energy efficiency" : "كفاءة الطاقة",
      ],
    },
    {
      id: "2",
      title: lang === "en" ? "Commercial Construction" : "البناء التجاري",
      description:
        lang === "en"
          ? "Office buildings, retail spaces, and commercial facilities designed for success."
          : "مباني المكاتب والمساحات التجارية والمرافق التجارية المصممة للنجاح.",
      icon: "building",
      features: [
        lang === "en" ? "Modern design" : "تصميم حديث",
        lang === "en" ? "Flexible spaces" : "مساحات مرنة",
        lang === "en" ? "Smart building systems" : "أنظمة المباني الذكية",
      ],
    },
    {
      id: "3",
      title: lang === "en" ? "Industrial Construction" : "البناء الصناعي",
      description:
        lang === "en"
          ? "Factories, warehouses, and industrial facilities built for efficiency and durability."
          : "المصانع والمستودعات والمرافق الصناعية المبنية للكفاءة والمتانة.",
      icon: "factory",
      features: [
        lang === "en" ? "Heavy-duty construction" : "بناء شديد التحمل",
        lang === "en" ? "Safety compliance" : "الامتثال للسلامة",
        lang === "en" ? "Efficient workflows" : "سير عمل فعال",
      ],
    },
  ];
}
