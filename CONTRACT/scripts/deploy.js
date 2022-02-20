const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("pekked");
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("builder", {value: hre.ethers.utils.parseEther("0.1")});
  await txn.wait();
  console.log(`Minted domain builder.pekked`)

  txt = await domainContract.setRecord("builder", "I build things!")
  await txn.wait();console.log("Set record for builder.pekked")

  const address = await domainContract.getAddress("builder");
  console.log("Owner of domain builder:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance))
}

const runMain = async () => {
  try {
    await main();process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain();