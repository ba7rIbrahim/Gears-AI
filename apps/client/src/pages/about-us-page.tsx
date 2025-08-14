import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRightIcon,
  Car,
  DollarSign,
  Headphones,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router";
import { BreadcrumbInit } from "@/components/shared";


const AboutUsPage = () => {
  const [activeValue, setActiveValue] = useState<string>(
    carPartsValues[carPartsValues?.length - 1]?.id as string
  );

  const currentValue =
    carPartsValues.find((value) => value.id === activeValue) ||
    carPartsValues[0]!;

  return (
    <section className="container" dir="rtl">
      <BreadcrumbInit items={[{ label: "عن المتجر", isCurrentPage: true }]} />
      <div className="py-4 px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mx-auto mb-16 space-y-4 max-w-3xl text-center">
          <div className="inline-block px-3 py-1 text-sm rounded-lg bg-primary/10 text-primary">
            لماذا نحن الأفضل
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            ما يميزنا في عالم قطع غيار السيارات
          </h2>
          <p className="text-muted-foreground">
            نحن لسنا مجرد متجر لقطع غيار السيارات، بل شريكك الموثوق في الحفاظ
            على سيارتك وضمان أدائها المثالي على الطرق.
          </p>
        </div>

        <Tabs
          value={activeValue}
          onValueChange={setActiveValue}
          className="space-y-8"
        >
          {/* Value selection - Tabs for md+ screens, Dropdown for smaller screens */}
          <div className="flex justify-center mb-8">
            <div className="w-full md:hidden">
              <Select
                value={activeValue}
                onValueChange={setActiveValue}
                dir="rtl"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر ميزة" />
                </SelectTrigger>
                <SelectContent>
                  {carPartsValues.map((value) => (
                    <SelectItem key={value.id} value={value.id} dir="rtl">
                      <div
                        className="flex gap-2 items-center text-right"
                        dir="rtl"
                      >
                        <value.icon className={cn("h-4 w-4", value.color)} />
                        <span>{value.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tabs for medium screens and above */}
            <TabsList className="hidden p-1 h-auto bg-transparent md:flex">
              {carPartsValues.map((value) => (
                <TabsTrigger
                  key={value.id}
                  value={value.id}
                  className={cn(
                    "data-[state=active]:bg-muted gap-2",
                    "data-[state=active]:border-border border border-transparent"
                  )}
                >
                  <value.icon className={cn("h-4 w-4", value.color)} />
                  <span>{value.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="grid gap-8 items-center md:grid-cols-12">
            <div className="space-y-6 md:col-span-6 md:order-2" dir="rtl">
              <div className="flex gap-4 items-center mb-4">
                <div className={cn("rounded-xl p-2.5", "bg-muted")}>
                  <currentValue.icon
                    className={cn("h-7 w-7", currentValue?.color)}
                  />
                </div>
                <h3 className="text-2xl font-bold">{currentValue?.name}</h3>
              </div>

              <p className="text-muted-foreground">
                {currentValue?.description}
              </p>

              <div className="pt-2 space-y-3">
                <h4 className="font-semibold">المميزات الرئيسية:</h4>
                <ul className="space-y-2">
                  {currentValue?.principles.map((principle, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <ArrowUpRightIcon
                        className={cn(
                          "mt-0.5 h-5 w-5 rotate-180",
                          currentValue?.color
                        )}
                      />
                      <span>{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-6 md:order-1">
              {currentValue?.image ? (
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={currentValue?.image}
                    alt={`صورة توضيحية لميزة ${currentValue?.name}`}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/50" />
                  <div className="absolute right-0 bottom-0 left-0 p-6">
                    <div
                      className={cn(
                        "inline-block px-3 py-1 text-sm text-white rounded-lg",
                        "backdrop-blur-sm bg-black/30"
                      )}
                    >
                      {currentValue?.name}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-muted flex aspect-[4/3] items-center justify-center rounded-xl">
                  <currentValue.icon
                    className={cn(
                      "h-24 w-24",
                      currentValue?.color,
                      "opacity-25"
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </Tabs>

        <div className="mt-16 text-center">
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            هذه المبادئ توجه كل جانب من جوانب عملنا. هل تريد أن تكون جزءاً من
            عائلة عملائنا الراضين؟
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link to="/shop">تسوق الآن</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact-us">تواصل معنا</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;



type CarPartsValue = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  principles: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    image: string;
  };
  image?: string;
};

const carPartsValues: CarPartsValue[] = [
  {
    id: "quality-parts",
    name: "قطع غيار أصلية",
    description:
      "نحن نقدم فقط قطع الغيار الأصلية وعالية الجودة من أفضل الشركات المصنعة العالمية. جودة منتجاتنا مضمونة لتدوم طويلاً وتحافظ على أداء سيارتك المثالي.",
    icon: Star,
    color: "text-amber-500",
    principles: [
      "قطع غيار أصلية من الشركات المصنعة المعتمدة",
      "فحص جودة صارم لجميع المنتجات",
      "شهادات الجودة العالمية ISO",
      "ضمان الأداء والمتانة طويلة المدى",
    ],
    testimonial: {
      quote:
        "اشتريت بطارية سيارة من هنا منذ سنتين وما زالت تعمل بكفاءة عالية. الجودة ممتازة والأسعار معقولة جداً مقارنة بالمحلات الأخرى.",
      author: "أحمد محمد",
      role: "عميل دائم",
      image: "/middle-eastern-man-smiling.png",
    },
    image: "https://avatar.vercel.sh/wwsafr",
  },
  {
    id: "fast-delivery",
    name: "توصيل سريع",
    description:
      "نوفر خدمة توصيل سريعة وموثوقة في جميع أنحاء المملكة. فريق التوصيل المتخصص لدينا يضمن وصول طلبك في الوقت المحدد وبحالة ممتازة.",
    icon: Truck,
    color: "text-blue-500",
    principles: [
      "توصيل في نفس اليوم داخل المدن الرئيسية",
      "تتبع الطلب في الوقت الفعلي",
      "تغليف آمن ومحكم لحماية القطع",
      "فريق توصيل مدرب ومحترف",
    ],
    testimonial: {
      quote:
        "طلبت إطارات جديدة صباحاً ووصلت في نفس اليوم مساءً. الخدمة سريعة جداً والتغليف ممتاز. أنصح الجميع بالتعامل معهم.",
      author: "فاطمة العلي",
      role: "عميلة راضية",
      image: "/middle-eastern-professional-woman.png",
    },
    image: "https://avatar.vercel.sh/ww",
  },
  {
    id: "expert-support",
    name: "دعم الخبراء",
    description:
      "فريق من الخبراء المتخصصين في قطع غيار السيارات متاح لمساعدتك في اختيار القطع المناسبة لسيارتك. نقدم استشارات فنية مجانية ودعم ما بعد البيع.",
    icon: Headphones,
    color: "text-indigo-500",
    principles: [
      "استشارات فنية مجانية من خبراء السيارات",
      "دعم عملاء متاح 24/7",
      "مساعدة في اختيار القطع المناسبة",
      "إرشادات التركيب والصيانة",
    ],
    testimonial: {
      quote:
        "كنت محتار في اختيار نوع الزيت المناسب لسيارتي. تواصلت مع خدمة العملاء وساعدوني في اختيار الأفضل. الخدمة ممتازة والموظفين محترفين.",
      author: "خالد السعد",
      role: "مالك ورشة سيارات",
      image: "/middle-eastern-mechanic-expert.png",
    },
    image: "https://avatar.vercel.sh/test",
  },
  {
    id: "competitive-prices",
    name: "أسعار تنافسية",
    description:
      "نقدم أفضل الأسعار في السوق مع الحفاظ على أعلى معايير الجودة. عروض وخصومات مستمرة للعملاء الدائمين وكميات الجملة.",
    icon: DollarSign,
    color: "text-green-500",
    principles: [
      "أسعار منافسة مع ضمان الجودة",
      "عروض وخصومات دورية",
      "أسعار خاصة للكميات الكبيرة",
      "برنامج نقاط الولاء للعملاء الدائمين",
    ],
    testimonial: {
      quote:
        "أقارن الأسعار دائماً قبل الشراء، وهنا أجد أفضل الأسعار مع جودة ممتازة. وفرت الكثير من المال خاصة مع العروض المستمرة.",
      author: "سارة أحمد",
      role: "عميلة مميزة",
      image: "/satisfied-woman-by-car.png",
    },
    image: "https://avatar.vercel.sh/hello",
  },
  {
    id: "warranty",
    name: "ضمان شامل",
    description:
      "جميع منتجاتنا تأتي مع ضمان شامل يغطي العيوب المصنعية وضمان الاستبدال. نثق في جودة منتجاتنا ونقدم لك راحة البال الكاملة.",
    icon: Shield,
    color: "text-red-500",
    principles: [
      "ضمان شامل على جميع المنتجات",
      "استبدال فوري للقطع المعيبة",
      "ضمان الأداء لفترات طويلة",
      "خدمة ما بعد البيع المتميزة",
    ],
    testimonial: {
      quote:
        "اشتريت قطع فرامل وبعد شهرين ظهرت مشكلة بسيطة. تواصلت معهم واستبدلوها فوراً بدون أي تعقيدات. هذا هو الضمان الحقيقي.",
      author: "محمد الزهراني",
      role: "سائق تاكسي",
      image: "/middle-eastern-taxi-driver.png",
    },
    image: "https://avatar.vercel.sh/no",
  },
  {
    id: "wide-selection",
    name: "تشكيلة واسعة",
    description:
      "نوفر تشكيلة واسعة من قطع غيار السيارات لجميع الماركات والموديلات. من البطاريات والإطارات إلى الزيوت والإكسسوارات، كل ما تحتاجه في مكان واحد.",
    icon: Car,
    color: "text-purple-500",
    principles: [
      "قطع غيار لجميع ماركات السيارات",
      "تشكيلة كاملة من الإكسسوارات",
      "منتجات للسيارات الحديثة والكلاسيكية",
      "تحديث مستمر للمخزون بأحدث المنتجات",
    ],
    testimonial: {
      quote:
        "سيارتي قديمة نوعاً ما وكنت أواجه صعوبة في إيجاد قطع الغيار المناسبة. هنا وجدت كل ما أحتاجه بسهولة. التشكيلة رائعة حقاً.",
      author: "عبدالله الحربي",
      role: "هاوي سيارات كلاسيكية",
      image: "/placeholder.svg?height=400&width=400",
    },
    image: "https://avatar.vercel.sh/yes",
  },
];