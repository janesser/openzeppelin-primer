async function main() {
    // Our code will go here

    // Retrieve accounts from the local node
    const accounts = await ethers.provider.listAccounts();
    console.log(accounts);

    // Set up an ethers contract, representing our deployed Box instance
    const address = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
    const Box = await ethers.getContractFactory('Box');
    const box = await Box.attach(address);

    // Call the retrieve() function of the deployed Box contract
    const value = ethers.BigNumber.from(await box.retrieve());
    console.log('Box value is', value.toString());

    // Send a transaction to store() a new value in the Box
    await box.store(value.add(1));

    // Call the retrieve() function of the deployed Box contract
    const value2 = await box.retrieve();
    console.log('Box value is', value2.toString());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });