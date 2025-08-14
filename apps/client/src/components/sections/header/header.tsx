import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Logo } from "../../shared/logo";
import { Link } from "react-router";
import { navigationLinks } from "@/constant/nav-links";
import { useSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared";
import { UserButton } from "@daveyplate/better-auth-ui";
import { arabicLocalization } from "@/localization/arabic-localization";
import { Settings, User } from "lucide-react";
import { useState } from "react";
import { ThemeToggle, UserOrdersSidebar } from "./components";

export const Header = () => {
  const { data: session, isPending } = useSession();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <header className="border-b container">
      <div className="flex gap-4 justify-between items-center h-16">
        {/* Left side */}
        <div className="flex gap-2 items-center">
          {/* Mobile menu trigger */}
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none size-6"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-1 w-36 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col-reverse gap-0 items-start md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem
                      key={index}
                      className="w-full text-right"
                    >
                      <NavigationMenuLink
                        asChild
                        className="py-1.5"
                        active={link.active}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setIsPopoverOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex gap-6 items-center">
            <Link to="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      active={link.active}
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          {isPending ? (
            <Spinner />
          ) : !session ? (
            <div className="flex items-center">
              <Button asChild variant="ghost" size="sm" className="text-sm">
                <Link to="/auth/sign-in">تسجيل دخول</Link>
              </Button>
              <Button asChild size="sm" className="text-sm">
                <Link to="/auth/sign-up">ابدأ الآن</Link>
              </Button>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <UserOrdersSidebar />
              <div className="flex" dir="rtl">
                <UserButton
                  localization={arabicLocalization}
                  size="sm"
                  className="hidden flex-row gap-2 justify-between items-center px-3 py-2 w-full bg-transparent rounded-md border md:flex text-primary hover:bg-secondary"
                  align="start"
                  disableDefaultLinks
                  additionalLinks={[
                    {
                      href: "/profile/settings",
                      icon: <User className="w-4 h-4 text-right" />,
                      label: "الملف الشخصي",
                      signedIn: true,
                      separator: true,
                    },
                    {
                      href: "/profile/security",
                      icon: <Settings className="w-4 h-4 text-right" />,
                      label: "الاعدادات",
                      signedIn: true,
                      separator: true,
                    },
                  ]}
                  classNames={{
                    trigger: {
                      avatar: {
                        base: "hidden",
                      },
                      user: {
                        base: "flex-1 text-center",
                      },
                    },
                  }}
                />

                <UserButton
                  localization={arabicLocalization}
                  size="icon"
                  className="flex md:hidden border cursor-pointer p-4.5 text-base"
                  align="start"
                  disableDefaultLinks
                  additionalLinks={[
                    {
                      href: "/profile/settings",
                      icon: <User className="w-4 h-4 text-right" />,
                      label: "الملف الشخصي",
                      signedIn: true,
                      separator: true,
                    },
                    {
                      href: "/profile/security",
                      icon: <Settings className="w-4 h-4 text-right" />,
                      label: "الاعدادات",
                      signedIn: true,
                      separator: true,
                    },
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
