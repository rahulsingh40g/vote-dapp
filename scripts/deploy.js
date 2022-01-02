const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(["None Of The Above (NOTA)", "Bahujan Samaj Party (BSP)", "Indian National Congress (INC)", "Bhartiya Janta Party (BJP)", "Aam Admi Party (AAP)"]);

  await voting.deployed();

  console.log("Voting deployed to:", voting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
