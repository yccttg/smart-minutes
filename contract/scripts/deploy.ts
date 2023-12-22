import { ethers } from "hardhat";
import dotenv from "dotenv";
import readline from "readline";
dotenv.config();

interface ContractConfig {
  name: string;
  ownable: boolean;
  args: string[];
  options: object;
  postDeploy?: Function;
}

const contractConfigs: ContractConfig[] = [
  {
    name: "SmartMinute",
    ownable: true,
    args: [
      process.env.OWNER_ADDRESS as `0x${string}`, // initialOwner
    ],
    options: {
      // target: process.env.OWNER_ADDRESS as `0x${string}`,
    },
    postDeploy: () => {},
  },
];

async function deploy(config: ContractConfig) {
  console.log("Deploying Contract with the following configuration:");
  console.log(config);

  const contract = await ethers.deployContract(
    config.name,
    config.args,
    config.options
  );

  await contract.waitForDeployment();
  console.log("=".repeat(70));
  console.log("  Contract Address: ", await contract.getAddress());
  console.log("=".repeat(70));

  // transfer ownership of the contract if the contract is ownable
  if (config.ownable) {
    await contract.transferOwnership(process.env.OWNER_ADDRESS as string);
  }
  await config.postDeploy?.(contract);
}

async function main() {
  if (contractConfigs.length > 1) {
    console.log(
      `Please select one of the contracts below:\n\n${contractConfigs
        .map((item, idx) => `${idx}. ${item.name}`)
        .join("\n")}`
    );

    let prompt = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    prompt.question(
      `\nSelect The Contract to deploy [Eg: 1]:\t`,
      async (index: string) => {
        console.log(index);
        // @ts-ignore
        let config: ContractConfig = contractConfigs[parseInt(index)];

        if (config === undefined) {
          console.log("No valid contracts selected !!\n");
          process.exit(1);
        }

        await deploy(config);

        prompt.close();
      }
    );
  } else {
    await deploy(contractConfigs[0]);
  }
  process.exit(0);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
