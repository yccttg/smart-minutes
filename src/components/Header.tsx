"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import BouddhaImageBg from "public/images/bouddha.png";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import MenuIcon from "public/svg/menu.svg";
import ConnectIcon from "public/svg/connect.svg";
import { useNetwork, useAccount } from "wagmi";

const NavItem = ({
  href,
  children,
  onClick,
}: PropsWithChildren & { href: string; onClick?: () => void }) => {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Link
      className={`hover:bg-primary-600 p-2 block rounded-lg text-xl h-10 ${
        isActive ? "bg-primary-600 font-bold" : ""
      }`}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export const Header = () => {
  const pathName = usePathname();
  const [isMenuShowing, setMenuShowing] = useState(false);
  const { isConnected, address } = useAccount();
  const Utility = () => {};
  return (
    <div
      className={`bg-primary transition-all sticky ${
        pathName == "/" ? "h-96 -top-[320px]" : "h-16 top-0"
      } text-white`}
    >
      <Image
        src={BouddhaImageBg.src}
        alt=""
        width={"100"}
        height={"100"}
        className="w-full h-full absolute -z-0 object-cover"
        unoptimized
      />
      <div
        className={`flex flex-col md:flex-row items-start gap-4 md:p-3 md:items-end w-full bg-secondary sticky top-0`}
      >
        <div className="flex justify-between w-full md:w-auto min-w-[250px] items-center p-3 md:p-0">
          <Link
            className="text-xl font-bold p-2 h-10"
            href={"/"}
            onClick={() => {
              setMenuShowing(false);
            }}
          >
            SMART MINUTES
          </Link>
          <ConnectIcon
            className={`w-8 h-8 ${
              isConnected ? " fill-success-700" : "fill-error-800 animate-pulse"
            }`}
            onClick={() => setMenuShowing(!isMenuShowing)}
          />
          <MenuIcon
            className="w-8 h-8 block md:hidden"
            onClick={() => setMenuShowing(!isMenuShowing)}
          />
        </div>
        <div
          className={`flex flex-col md:flex-row w-full gap-2 md:gap-5 ${
            isMenuShowing ? "" : "hidden md:flex"
          }`}
        >
          <NavItem href="/minutes" onClick={() => setMenuShowing(false)}>
            Minutes
          </NavItem>
          <NavItem href="/contact" onClick={() => setMenuShowing(false)}>
            Contact
          </NavItem>
          <div className="flex grow" />
          <NavItem href="/admin" onClick={() => setMenuShowing(false)}>
            Admin
          </NavItem>
          <hr className="my-2 md:hidden" />
          <div className="flex w-full md:w-auto justify-center pb-3 md:pb-0">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};
