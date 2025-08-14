import { SectionTitle } from "@/components/shared";
import { FeaturesGrid, type FeaturesItem } from "@/components/ui/features-grid";
import { CheckCircle, Globe, Brain, Search } from "lucide-react";

const itemsSample: FeaturesItem[] = [
  {
    title: "مساعد ذكاء اصطناعي",
    meta: "اقتراحات فورية",
    description:
      "خوارزميات ذكية تقترح قطع الغيار الأنسب حسب مواصفات سيارتك واحتياجاتك",
    icon: <Brain className="w-4 h-4 text-purple-500" />,
    status: "متاح الآن",
    tags: ["ذكاء اصطناعي", "توصيات"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "بحث ذكي عن القطع",
    meta: "دقة عالية",
    description:
      "ابحث عن قطع الغيار بسهولة باستخدام ذكاء اصطناعي يطابق المواصفات والفلاتر مع سيارتك",
    icon: <Search className="w-4 h-4 text-blue-500" />,
    tags: ["بحث", "قطع غيار"],
  },
  {
    title: "إدارة الطلبات",
    meta: "84 طلب مكتمل",
    description: "نظام إدارة تلقائي لتنظيم طلبات القطع حسب الأولوية والاحتياج",
    icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    status: "محدث",
    tags: ["إنتاجية", "أتمتة"],
    colSpan: 2,
  },
  {
    title: "شبكة توزيع عالمية",
    meta: "6 مناطق",
    description: "توزيع متعدد المناطق لتوصيل أسرع ودعم شحن دولي",
    icon: <Globe className="w-4 h-4 text-sky-500" />,
    status: "تجريبي",
    tags: ["بنية تحتية", "شحن سريع"],
  },
];

export const Features = () => {
  return (
    <section className="container gapBetweenSections">
      <SectionTitle>لماذا نحن ؟</SectionTitle>
      <FeaturesGrid items={itemsSample} />
    </section>
  );
};
