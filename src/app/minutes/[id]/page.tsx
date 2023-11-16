"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Minutes() {
  const router = useRouter();

  return (
    <main className="p-4 lg:p-8">
      <h1 className="text-2xl font-bold">Minutes Detail Page</h1>
      <Link href={"/minutes"} className="text-xl font-bold text-secondary">
        Go Back to minutes
      </Link>
    </main>
  );
}
