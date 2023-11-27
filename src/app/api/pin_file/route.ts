import { isAddress } from "ethers";
import { z } from "zod";
import { recoverMessageAddress } from "viem";

type ErrorBody = {
  [k: string]: [string];
};

const schema = z.object({
  address: z.string(),
  file: z.string(),
  metadata: z.object({
    date: z.string(),
    title: z.string(),
    agenda: z.array(z.string()),
    members: z.array(z.string()),
    description: z.string().optional(),
    conclusion: z.string().optional(),
  }),
  crypto: z.object({
    message: z.string(),
    signature: z.string(),
  }),
});

export type NFTMetadata = z.infer<typeof schema>;

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const errors: ErrorBody = {};
export const POST = async (request: Request) => {
  try {
    let { address, file, metadata, crypto } = schema.parse(
      await request.json()
    );
    // check if signature and address matches
    const recoveredAddress = await recoverMessageAddress({
      message: crypto.message,
      signature: crypto.signature as `0x${string}`,
    });

    if (recoveredAddress !== address || !isAddress(recoveredAddress)) {
      return Response.json({ message: "Signature Invalid" }, { status: 401 });
    }
    // change date string to timestamp
    metadata.date = `${(new Date(metadata.date).getTime() / 1000).toFixed()}`;
    if (!isAddress(address))
      errors.nftCreator = ["The wallet address is invalid"];

    if (Object.keys(errors).length > 0)
      return Response.json(errors, {
        status: 400,
      });
    return Response.json({ address, file, metadata, crypto });
  } catch (e: unknown) {
    errors.date = ["Could not parse date"];
  }
};
