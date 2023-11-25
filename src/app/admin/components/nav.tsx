import { PropsWithChildren } from "react";

const NavItem = ({
  href,
  title,
  children,
}: PropsWithChildren & { href: string; title: string }) => {
  return <div>{title}</div>;
};

type NavItemType = {
  level: 0 | 1;
  title: string;
  href: string;
  children?: NavItemType[];
};

export const AdminNav = () => {
  const navItems: NavItemType[] = [
    {
      level: 0,
      href: "/admin/minute",
      title: "Minute",
      children: [
        { href: "/admin/minute/list", level: 1, title: "Published Minutes" },
        { href: "/admin/minute/new", level: 1, title: "Create Minute" },
      ],
    },
    {
      level: 0,
      href: "/admin/member",
      title: "Member",
      children: [
        { href: "/admin/member/list", level: 1, title: "Published Minutes" },
        { href: "/admin/member/add", level: 1, title: "Create Minute" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {navItems.map(({ title, href }, index) => (
        <NavItem key={index} title={title} href={href} />
      ))}
    </div>
  );
};
