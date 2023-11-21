import { polygonMumbai, polygon } from "wagmi/chains";

export const defaultChain =
  process.env.NEXT_PUBLIC_NODE_ENV === "production" ? polygon : polygonMumbai;
