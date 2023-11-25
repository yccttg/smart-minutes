import { isAddress } from "ethers";
import { z } from "zod";

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
});

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const errors: ErrorBody = {};
export const POST = async (request: Request) => {
  try {
    let { address, file, metadata } = schema.parse(await request.json());
    // change date string to timestamp
    metadata.date = `${(new Date(metadata.date).getTime() / 1000).toFixed()}`;
    if (!isAddress(address))
      errors.nftCreator = ["The wallet address is invalid"];

    if (Object.keys(errors).length > 0)
      return Response.json(errors, {
        status: 400,
      });
    return Response.json({ url: request.url, address, file, metadata });
  } catch (e: unknown) {
    errors.date = ["Could not parse date"];
  }
};
