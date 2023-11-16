"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const NavItem = ({ href, children }: PropsWithChildren & { href: string }) => {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Link
      className={`bg-primary hover:bg-primary-600 p-2 block rounded-t-lg ${
        isActive ? "bg-primary-600 font-bold" : "bg-primary"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};

export const Header = () => {
  return (
    <div className="bg-primary">
      <ul className="flex gap-4 p-2 pb-0 h-[150px] items-end">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/minutes">Minutes</NavItem>
      </ul>
    </div>
  );
};
