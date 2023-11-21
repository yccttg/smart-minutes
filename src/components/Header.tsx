"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import BouddhaImageBg from "public/images/bouddha.png";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavItem = ({ href, children }: PropsWithChildren & { href: string }) => {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Link
      className={`bg-primary hover:bg-primary-600 p-2 block rounded-t-lg text-xl h-10 ${
        isActive ? "bg-primary-600 font-bold" : "bg-primary"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};

export const Header = () => {
  const pathName = usePathname();
  return (
    <div
      className={`bg-primary transition-all ${
        pathName == "/" ? "relative h-96" : "h-16 sticky top-0"
      }`}
    >
      <Image
        src={BouddhaImageBg.src}
        alt=""
        width={"100"}
        height={"100"}
        className="w-full h-full absolute -z-0 object-cover"
        unoptimized
      />
      <ul className={`flex gap-4 p-3 items-end absolute w-full`}>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/minutes">Minutes</NavItem>
        <div className="flex grow" />
        <ConnectButton />
      </ul>
    </div>
  );
};
