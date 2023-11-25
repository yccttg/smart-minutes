import { skaleCalypso, skaleCalypsoTestnet } from "wagmi/chains";

export const defaultChain =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? skaleCalypso
    : skaleCalypsoTestnet;
