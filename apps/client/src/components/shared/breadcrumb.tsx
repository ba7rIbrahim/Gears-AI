import { HomeIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbInit = ({ items }: BreadcrumbProps) => {
  return (
    <Breadcrumb className="py-4 my-4 mr-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/">
            <HomeIcon size={16} aria-hidden="true" />
            <span className="sr-only">الرئيسية</span>
          </Link>
        </BreadcrumbItem>

        {items?.map((item: BreadcrumbItem) => (
          <div key={item.label} className="flex items-center">
            <BreadcrumbSeparator className="ml-2" />
            <BreadcrumbItem>
              {item.isCurrentPage ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <Link to={item.href!}>{item.label}</Link>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
