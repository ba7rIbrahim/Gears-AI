import { BreadcrumbInit, ErrorMessage, Spinner } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

const contactUsSchema = z.object({
  firstName: z.string().nonempty("الأسم الاول مطلوب"),
  lastName: z.string().nonempty("الأسم الأخير مطلوب"),
  email: z.email("الايميل غير صحيح").nonempty("الايميل مطلوب"),
  subject: z.string().nonempty("عنوان الرسالة مطلوب"),
  message: z
    .string()
    .nonempty("الرسالة مطلوبة")
    .min(10, "يجب أن يكون طول الرسالة أكبر من 10 أحرف"),
});

type ContactUsType = z.infer<typeof contactUsSchema>;

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsType>({
    resolver: zodResolver(contactUsSchema),
  });

  const onSubmit: SubmitHandler<ContactUsType> = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success(
        "شكرًا لتواصلك معنا! لقد استلمنا رسالتك وسنتواصل معك قريبًا."
      );
      setIsLoading(false);
      reset();
    }, 700);
  };

  return (
    <section className="container" dir="rtl">
      <BreadcrumbInit items={[{ label: "تواصل معنا", isCurrentPage: true }]} />
      <div className="mx-auto my-12.5 flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-10 justify-between mx-auto max-w-sm">
          <div className="text-center lg:text-left">
            <h1 className="mb-2 text-5xl font-semibold text-center lg:mb-1 lg:text-6xl lg:text-right">
              تواصل معنا
            </h1>
            <p className="mt-6 text-center text-muted-foreground lg:text-right">
              يسعدنا دائماً سماع آرائكم والإجابة على استفساراتكم. لا تتردد في
              التواصل معنا
            </p>
          </div>
          <div className="mx-auto w-fit lg:mx-0">
            <h3
              className="mb-6 text-2xl font-semibold text-center lg:text-right"
              dir="rtl"
            >
              معلومات الاتصال
            </h3>
            <ul className="ml-4 space-y-4 list-none text-center lg:list-disc lg:text-right">
              <li>
                <span className="font-bold">العنوان: </span>
                العراق، بغداد، اليرموك - الأربع شوارع
              </li>
              <li>
                <span className="font-bold">رقم الهاتف: </span>
                <span dir="ltr">+964 7812345678</span>
              </li>
              <li>
                <span className="font-bold">البريد الألكتروني: </span>
                <Link to={`mailto:GearsInfo@gmail.com`} className="underline">
                  GearsInfo@gmail.com
                </Link>
              </li>
              <li>
                <span className="font-bold">ساعات العمل: </span>
                الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً
              </li>
            </ul>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-10 mx-auto max-w-screen-md rounded-lg border"
        >
          <div className="flex gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="firstname">الاسم الأول</Label>
              <Input
                type="text"
                id="firstname"
                placeholder="أدخل الاسم الاول"
                {...register("firstName")}
              />
              {errors.firstName && (
                <ErrorMessage>{errors.firstName.message}</ErrorMessage>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="lastname">الاسم الأخير</Label>
              <Input
                type="text"
                id="lastname"
                placeholder="أدخل الاسم الأخير"
                {...register("lastName")}
              />
              {errors.lastName && (
                <ErrorMessage>{errors.lastName.message}</ErrorMessage>
              )}
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">البريد الألكتروني</Label>
            <div>
              <Input
                type="email"
                id="email"
                placeholder="أدخل البريد الألكتروني"
                {...register("email")}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="subject">عنوان الرسالة</Label>
            <Input
              type="text"
              id="subject"
              placeholder="أدخل عنوان الرسالة هنا"
              {...register("subject")}
            />
            {errors.subject && (
              <ErrorMessage>{errors.subject.message}</ErrorMessage>
            )}
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">الرسالة</Label>
            <Textarea
              placeholder="اكتب رسالتك هنا."
              id="message"
              {...register("message")}
            />
            {errors.message && (
              <ErrorMessage>{errors.message.message}</ErrorMessage>
            )}
          </div>
          <Button className="w-full">
            {isLoading ? <Spinner size="sm" /> : "إرسال الرسالة"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
