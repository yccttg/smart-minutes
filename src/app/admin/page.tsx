import { getTargetAddress } from "@/utils/contract";

export default function AdminPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Admin</h1>
      <div className="flex flex-col">
        <div className="flex">
          <span className="text-primary font-bold w-[200px]">
            Contract Address
          </span>
          <pre className="text-secondary">{getTargetAddress("minute")}</pre>
        </div>
        <div className="flex">
          <span className="text-primary font-bold w-[200px]">
            Owner Address
          </span>
          <pre className="text-secondary">{getTargetAddress("owner")}</pre>
        </div>
        <div className="flex">
          <span className="text-primary font-bold w-[200px]">
            Worker Address
          </span>
          <pre className="text-secondary">{getTargetAddress("worker")}</pre>
        </div>
      </div>
    </main>
  );
}
