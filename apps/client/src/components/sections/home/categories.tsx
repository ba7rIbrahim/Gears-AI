import { SectionTitle } from "@/components/shared";
import {
  CategoriesCard,
  CategoriesGrid,
} from "@/components/ui/categories-grid";

const categoriesItems = [
  {
    name: "الإطارات",
    description: "مجموعة متنوعة من الإطارات بمقاسات وماركات مختلفة.",
    href: "/shop",
    cta: "تصفح المنتجات",
    background: (
      <div className="overflow-hidden absolute inset-0">
        <div className="absolute inset-0 z-10 bg-black opacity-55"></div>
        <img
          src="https://images.unsplash.com/photo-1621712151262-60bd142ba19f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="إطارات"
          className="w-full h-full object-cover"
        />
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-5",
  },
  {
    name: "بطاريات السيارات",
    description: "بطاريات عالية الجودة تناسب جميع أنواع السيارات.",
    href: "/shop",
    cta: "تصفح المنتجات",
    background: (
      <div className="overflow-hidden absolute inset-0 -top-10">
        <div className="absolute inset-0 z-10 bg-black opacity-55"></div>
        <img
          src="https://images.unsplash.com/photo-1676337167260-e2daf34334f2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="إطارات"
          className="w-full h-full object-cover"
        />
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-5 lg:row-end-6",
  },
  {
    name: "ملحقات السيارة",
    description: "أغطية مقاعد، فرش أرضيات، وإكسسوارات متنوعة.",
    href: "/shop",
    cta: "تصفح المنتجات",
    background: (
      <div className="overflow-hidden absolute inset-0">
        <div className="absolute inset-0 z-10 bg-black opacity-55"></div>
        <img
          src="https://as1.ftcdn.net/jpg/04/47/14/64/1000_F_447146424_LnIjEuxK7ienMpSOc1uuiMf0dFmBX5tb.webp"
          alt="إطارات"
          className="object-cover w-full h-full"
        />
      </div>
    ),
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-5 lg:row-end-6",
  },
  {
    name: "زيوت ومواد صيانة",
    description: "أفضل الزيوت ومواد الصيانة لسيارتك.",
    href: "/shop",
    cta: "تصفح المنتجات",
    background: (
      <div className="overflow-hidden absolute inset-0">
        <div className="absolute inset-0 z-10 bg-black opacity-55"></div>
        <img
          src="https://images.unsplash.com/photo-1746014994836-d3a15937e674?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="زيوت ومواد صيانة"
          className="object-cover w-full h-full"
        />
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-5 lg:row-end-6",
  },
];

export const Categories = () => {
  return (
    <section className="container gapBetweenSections">
      <SectionTitle>الفئات</SectionTitle>
      <CategoriesGrid className="lg:grid-rows-3">
        {categoriesItems.map((category) => (
          <CategoriesCard key={category.name} {...category} />
        ))}
      </CategoriesGrid>
    </section>
  );
};
