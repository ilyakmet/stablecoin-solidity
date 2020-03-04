const BN = require("bn.js");
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");

const address = "{CONTRACT_ADDRESS}";

const {
    abi,
    basisPointsRate,
    minimumFee,
    maximumFee,
    specialFee,
    tokenAmount,
    denominator
} = require("../config");

const stableCoinInstance = new web3.eth.Contract(abi, address);

web3.eth.getAccounts().then(async accounts => {
    const owner = accounts[0];
    const spender = accounts[1];
    const minter = accounts[2];
    const burner = accounts[3];
    const feesCollector = accounts[4];

    const actualOwner = await stableCoinInstance.methods.owner().call();

    console.log({ actualOwner, accounts });

    await stableCoinInstance.methods
        .setParams(basisPointsRate, minimumFee, maximumFee)
        .send({
            from: owner
        });

    await stableCoinInstance.methods
        .setSpecialParams(
            spender,
            specialFee.basisPointsRate,
            specialFee.minimumFee,
            specialFee.maximumFee,
            specialFee.isActive
        )
        .send({
            from: owner
        });

    await stableCoinInstance.methods.setFeesCollector(feesCollector).send({
        from: owner
    });

    await stableCoinInstance.methods.addMinter(minter).send({
        from: owner
    });

    await stableCoinInstance.methods.addBurner(burner).send({
        from: owner
    });

    await stableCoinInstance.methods.mint(spender, tokenAmount).send({
        from: minter
    });

    await stableCoinInstance.methods.transfer(burner, tokenAmount).send({
        from: spender
    });

    await stableCoinInstance.methods.burn(tokenAmount.div(new BN(2, 10))).send({
        from: burner
    });

    const actualSpenderBalance = await stableCoinInstance.methods
        .balanceOf(spender)
        .call();

    const actualBurnerBalance = await stableCoinInstance.methods
        .balanceOf(burner)
        .call();

    const actualFeesCollectorBalance = await stableCoinInstance.methods
        .balanceOf(feesCollector)
        .call();

    console.log({
        actualSpenderBalance,
        actualBurnerBalance,
        actualFeesCollectorBalance
    });
});
