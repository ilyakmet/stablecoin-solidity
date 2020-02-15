const BN = require("bn.js");
const chai = require("chai");
const { expect } = require("chai");
const { calculateFee } = require("../utils/calculate-fee.js");
const StableCoin = artifacts.require("StableCoin");

const {
    name,
    symbol,
    decimals,
    basisPointsRate,
    minimumFee,
    maximumFee,
    specialFee,
    tokenAmount,
    denominator
} = require("../config");

chai.use(require("chai-bn")(BN));

contract("StableCoin (positive)", accounts => {
    let stableCoinInstance;

    const owner = accounts[0];
    const spender = accounts[1];
    const recipient = accounts[2];
    const minter = accounts[3];
    const burner = accounts[4];
    const feesCollector = accounts[3];

    beforeEach("setup contracts instances", async () => {
        stableCoinInstance = await StableCoin.new(name, symbol, decimals);

        await stableCoinInstance.setFeesCollector(feesCollector, {
            from: owner
        });

        await stableCoinInstance.setParams(
            basisPointsRate,
            minimumFee,
            maximumFee,
            {
                from: owner
            }
        );
    });

    it("should add and identify minter", async () => {
        await stableCoinInstance.addMinter(minter, {
            from: owner
        });

        const actualIsMinter = await stableCoinInstance.isMinter(minter);
        expect(actualIsMinter).to.equal(true);
    });

    it("should add and identify burner", async () => {
        await stableCoinInstance.addBurner(burner, {
            from: owner
        });

        const actualIsBurner = await stableCoinInstance.isBurner(burner);
        expect(actualIsBurner).to.equal(true);
    });

    it("should remove minter", async () => {
        await stableCoinInstance.addMinter(minter, {
            from: owner
        });

        await stableCoinInstance.renounceMinter(minter, {
            from: owner
        });

        const actualIsMinter = await stableCoinInstance.isMinter(minter);
        expect(actualIsMinter).to.equal(false);
    });

    it("should remove burner", async () => {
        await stableCoinInstance.addBurner(burner, {
            from: owner
        });

        await stableCoinInstance.renounceBurner(burner, {
            from: owner
        });

        const actualIsBurner = await stableCoinInstance.isBurner(burner);
        expect(actualIsBurner).to.equal(false);
    });

    it("should mint tokens", async () => {
        await stableCoinInstance.addMinter(minter, {
            from: owner
        });

        await stableCoinInstance.mint(spender, tokenAmount, {
            from: minter
        });

        const actualSpenderBalance = await stableCoinInstance.balanceOf(
            spender
        );

        expect(actualSpenderBalance).to.be.a.bignumber.that.equals(tokenAmount);
    });

    it("should burn tokens", async () => {
        await stableCoinInstance.addMinter(minter, {
            from: owner
        });

        await stableCoinInstance.mint(burner, tokenAmount, {
            from: minter
        });

        await stableCoinInstance.addBurner(burner, {
            from: owner
        });

        await stableCoinInstance.burn(tokenAmount, {
            from: burner
        });

        const actualBurnerBalance = await stableCoinInstance.balanceOf(spender);

        expect(actualBurnerBalance).to.be.a.bignumber.that.equals(
            new BN(0, 10)
        );
    });

    it("should transfer token with fee", async () => {
        await stableCoinInstance.addMinter(minter, {
            from: owner
        });

        await stableCoinInstance.mint(spender, tokenAmount, {
            from: minter
        });

        await stableCoinInstance.transfer(recipient, tokenAmount, {
            from: spender
        });

        const fee = calculateFee(tokenAmount, false);
        const spenderBalance = new BN(0, 10);
        const recipientBalance = tokenAmount.sub(fee);
        const feesCollectorBalance = fee;

        const actualSpenderBalance = await stableCoinInstance.balanceOf(
            spender
        );
        const actualRecipientBalance = await stableCoinInstance.balanceOf(
            recipient
        );
        const actualFeesCollectorBalance = await stableCoinInstance.balanceOf(
            feesCollector
        );

        expect(actualSpenderBalance).to.be.a.bignumber.that.equals(
            spenderBalance
        );

        expect(actualRecipientBalance).to.be.a.bignumber.that.equals(
            recipientBalance
        );

        expect(actualFeesCollectorBalance).to.be.a.bignumber.that.equals(
            feesCollectorBalance
        );
    });

    it("should transfer token with special fee", async () => {
        await stableCoinInstance.setSpecialParams(
            spender,
            specialFee.basisPointsRate,
            specialFee.minimumFee,
            specialFee.maximumFee,
            specialFee.isActive,
            {
                from: owner
            }
        );

        await stableCoinInstance.addMinter(minter, {
            from: owner
        });

        await stableCoinInstance.mint(spender, tokenAmount, {
            from: minter
        });

        await stableCoinInstance.transfer(recipient, tokenAmount, {
            from: spender
        });

        const fee = calculateFee(tokenAmount, true);
        const spenderBalance = new BN(0, 10);
        const recipientBalance = tokenAmount.sub(fee);
        const feesCollectorBalance = fee;

        const actualSpenderBalance = await stableCoinInstance.balanceOf(
            spender
        );
        const actualRecipientBalance = await stableCoinInstance.balanceOf(
            recipient
        );
        const actualFeesCollectorBalance = await stableCoinInstance.balanceOf(
            feesCollector
        );

        expect(actualSpenderBalance).to.be.a.bignumber.that.equals(
            spenderBalance
        );

        expect(actualRecipientBalance).to.be.a.bignumber.that.equals(
            recipientBalance
        );

        expect(actualFeesCollectorBalance).to.be.a.bignumber.that.equals(
            feesCollectorBalance
        );
    });
});
