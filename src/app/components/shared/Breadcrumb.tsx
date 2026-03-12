import React from "react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-xs text-[#64748B] mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
          {item.onClick || item.href ? (
            <button
              onClick={item.onClick}
              className="hover:text-[#0A2FA6] transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className={index === items.length - 1 ? "text-[#0F172A] font-medium" : ""}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
