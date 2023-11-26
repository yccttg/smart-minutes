"use client";
import { PropsWithChildren } from "react";
import { useAccount } from "wagmi";

export const AdminPage = ({ children }: PropsWithChildren) => {
  const { isConnected } = useAccount();
  return (
    <div className="max-w-screen-lg">
      {children}
      {/* {isConnected && children} */}
      {/* {!isConnected && (
        <div>
          <p className="text-xl text-center">
            Please connect your wallet with admin account to continue !!
          </p>
        </div>
      )} */}
    </div>
  );
};
