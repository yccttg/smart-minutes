interface Address {
  [name: string]: `0x${string}`;
}

const addresses: Address = {
  worker: process.env.NEXT_PUBLIC_WORKER_ADDRESS as `0x${string}`,
  owner: process.env.NEXT_PUBLIC_OWNER_ADDRESS as `0x${string}`,
  minute: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
};

export const getTargetAddress = (name: "worker" | "owner" | "minute") => {
  return addresses[name];
};
