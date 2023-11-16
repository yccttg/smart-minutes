"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Minutes() {
  const minutes = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  const router = useRouter();
  return (
    <main className="p-4 lg:p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold">Minutes Page</h1>
      <div className="flex flex-wrap w-full max-w-screen-xl">
        {minutes.map(({ id }) => (
          <div
            key={id}
            className="w-full md:w-1/2 lg:w-1/3 h-[300px] p-1"
            onClick={() => {
              router.push(`/minutes/${id}`);
            }}
          >
            <div className=" bg-primary/10 p-2 rounded-lg w-full h-full hover:bg-primary/20">
              {id}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
