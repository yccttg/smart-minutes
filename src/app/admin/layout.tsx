import type { Metadata } from "next";
import { AdminNav } from "./components/nav";
import { AdminPage } from "./AdminPage";

export const metadata: Metadata = {
  title: "Smart Minutes Admin",
  description: "Admin page for smart minutes",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed top-16 bottom-0 w-full -z-0 flex">
      <h2 className="md:hidden text-2xl p-2 mt-20 text-error">
        This page can only be displayed on larger displays. please switch to
        larger display to view this page
      </h2>
      <div className="hidden absolute h-full md:flex w-[300px] bg-primary/10 shadow-lg z-0 overflow-y-auto">
        <AdminNav />
      </div>
      <div className="hidden absolute left-[300px] right-0 h-full md:flex flex-col z-0 overflow-y-auto pl-10 pt-10">
        <AdminPage>{children}</AdminPage>
      </div>
    </div>
  );
}
