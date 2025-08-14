import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative text-center z-[1] pt-52 container">
      <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-primary sm:text-7xl">
        الصفحة التي طلبتها غير موجودة
      </h1>
      <p className="mt-6 text-pretty text-lg font-medium text-muted-foreground sm:text-xl/8">
        عذراً، الصفحة التي تحاول الوصول إليها غير متوفرة أو ربما تم حذفها. يرجى
        التحقق من الرابط أو العودة إلى الصفحة الرئيسية.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-y-3 gap-x-6">
        <Button className="-order-1 sm:order-none" asChild>
          <Link to="/">العودة إلى الصفحة الرئيسية</Link>
        </Button>
        <Button variant="secondary" asChild className="group">
          <Button onClick={() => navigate(-1)}>
            الرجوع للخلف
            <ArrowLeft
              className="me-2 ms-0 opacity-60 transition-transform group-hover:-translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
