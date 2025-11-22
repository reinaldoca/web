"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ChevronRight } from "lucide-react";
import { Locale } from "@/dictionaries/i18n-config";

export interface MegaMenuLink {
  title: string;
  href: string;
}

export interface MegaMenuCategory {
  title: string;
  links: MegaMenuLink[];
}

interface MegaMenuProps {
  triggerText: string;
  categories: MegaMenuCategory[];
  locale: Locale;
}

export function MegaMenu({ triggerText, categories, locale }: MegaMenuProps) {

  const getLocalizedHref = (href: string) => `/${locale}${href}`.replace(/\/+/g, '/');

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium text-white bg-transparent hover:bg-white/10 focus:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10 hover:text-white focus:text-white">
            {triggerText}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-6 p-6 w-[400px] md:w-[500px] lg:w-[600px] md:grid-cols-2">
              {categories.map((category) => (
                <div key={category.title} className="flex flex-col space-y-3">
                  <h3 className="font-bold text-sm text-foreground/80">
                    {category.title}
                  </h3>
                  <ul className="flex flex-col space-y-1">
                    {category.links.map((link) => (
                      <ListItem key={link.title} href={getLocalizedHref(link.href)} title={link.title} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <Link
        href={props.href || "#"}
        ref={ref}
        className={cn(
          "group flex items-center justify-between select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <span className="text-sm font-medium leading-snug">{title}</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
