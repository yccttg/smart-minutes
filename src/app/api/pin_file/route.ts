import { isAddress } from "ethers";
import { zfd } from "zod-form-data";

type ErrorBody = {
  [k: string]: [string];
};

const schema = zfd.formData({
  nftCreator: zfd.text(),
  file: zfd.text(),
});

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const errors: ErrorBody = {};
export const POST = async (request: Request) => {
  let { nftCreator } = schema.parse(await request.json());
  if (!isAddress(nftCreator))
    errors.nftCreator = ["The wallet address is invalid"];

  if (Object.keys(errors).length > 0)
    return Response.json(errors, {
      status: 400,
    });
  return Response.json({ url: request.url, nftCreator });
};
