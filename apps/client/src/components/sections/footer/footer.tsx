import { Logo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { navigationLinks } from "@/constant/nav-links";
import { useSession } from "@/lib/auth";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export const Footer = () => {
  const { data: session } = useSession();
  const [email, setEamil] = useState("");
  const [showSubscribe, setShowSbuscribe] = useState(true);
  const handleUserSubscription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      toast.success("يرجى تسجيل الدخول أولاً");
      return;
    } else {
      setEamil("");
      setShowSbuscribe(false);
      toast.success(
        "شكراً لإشتراكك في موقعنا، ستتلقى إشعارات فور حصول تخفيضات او إضافة منتجات جديدة"
      );
    }
  };
  return (
    <footer className="bg-background pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 rounded-full bg-primary/10 p-4">
            <Logo />
          </div>
          <nav className="mb-8 flex flex-row-reverse flex-wrap justify-center gap-6">
            {navigationLinks.map((link) => (
              <Link key={link.label} to={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mb-8 flex space-x-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
          {showSubscribe && (
            <div className="mb-8 w-full max-w-md">
              <form
                className="flex space-x-2"
                onSubmit={handleUserSubscription}
              >
                <div className="flex-grow">
                  <Label htmlFor="email" className="sr-only">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    type="email"
                    className="rounded-full"
                    required
                    value={email}
                    onChange={(e) => {
                      setEamil(e.target.value);
                    }}
                  />
                </div>
                <Button type="submit" className="rounded-full">
                  إشتراك
                </Button>
              </form>
            </div>
          )}

          <div className="text-center">
            <p className="text-sm flex items-center gap-1 text-muted-foreground">
              <span className="mt-1">©</span> جميع الحقوق محفوظة, بكر علي
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
