"use client";
import { useRouter, usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import ArrowRight from "public/svg/arrow-right.svg";

const NavItem = ({
  href,
  title,
  children,
}: PropsWithChildren & { href?: string; title: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className={`flex flex-col`}>
      <div
        className={`p-2 flex justify-between items-center text-secondary ${
          children ? "font-bold" : ""
        } ${pathname === href ? "font-bold bg-slate-100" : ""} ${
          href ? "cursor-pointer  hover:bg-slate-100/50" : ""
        }`}
        onClick={() => {
          if (href) router.push(href);
        }}
      >
        <span className={``}>{title}</span>
        {href && <ArrowRight className="w-5 h-5" />}
      </div>
      {children && (
        <div className="flex flex-col gap-1 pl-5 pb-2 border-b border-b-slate-100">
          {children}
        </div>
      )}
    </div>
  );
};

type NavItemType = {
  title: string;
  href?: string;
  children?: NavItemType[];
};

export const AdminNav = () => {
  const navItems: NavItemType[] = [
    {
      title: "Admin",
      href: "/admin",
      children: [],
    },
    {
      title: "Minutes",
      href: "/admin/minute",
      children: [],
    },
    {
      title: "Members and Roles",
      children: [
        { href: "/admin/member", title: "Manage Members" },
        { href: "/admin/member/role", title: "Manage Roles" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full px-1 py-5">
      {navItems.map(({ title, href, children }, index) => (
        <NavItem key={index} title={title} href={href}>
          {children &&
            children.map(({ title, href }, i) => (
              <NavItem key={i} title={title} href={href} />
            ))}
        </NavItem>
      ))}
    </div>
  );
};
