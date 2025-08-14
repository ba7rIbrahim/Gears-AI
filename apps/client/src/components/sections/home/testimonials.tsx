import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "أحمد",
    username: "@ahmed",
    body: "بصراحة أفضل موقع لشراء قطع الغيار، والذكاء الاصطناعي ساعدني أجد القطعة المناسبة بسرعة.",
    img: "https://avatar.vercel.sh/ahmed",
  },
  {
    name: "سارة",
    username: "@sarah",
    body: "التجربة كانت رائعة، كل شيء واضح وسهل، وخدمة العملاء ممتازة.",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "خالد",
    username: "@khaled",
    body: "وفرت وقت وجهد كبير، الموقع يقترح لك القطع المناسبة بسيارتك بدقة عالية.",
    img: "https://avatar.vercel.sh/khaled",
  },
  {
    name: "ليلى",
    username: "@layla",
    body: "الخدمة ممتازة والشحن سريع، أنصح الجميع باستخدام الموقع.",
    img: "https://avatar.vercel.sh/layla",
  },
  {
    name: "محمد",
    username: "@mohammed",
    body: "الأسعار مناسبة جداً، وجودة القطع أكثر من رائعة.",
    img: "https://avatar.vercel.sh/mohammed",
  },
  {
    name: "نور",
    username: "@noor",
    body: "أعجبني أن الموقع باللغة العربية وسهل الاستخدام، تجربة تسوق ممتازة.",
    img: "https://avatar.vercel.sh/noor",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row gap-2 items-center">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export const Testimonials = () => {
  return (
    <section className="flex overflow-hidden relative flex-col justify-center items-center mt-16 mb-22 w-full">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r pointer-events-none from-background"></div>
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l pointer-events-none from-background"></div>
    </section>
  );
};
