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
    wrongTokenAmount,
    denominator
} = require("../config");

chai.use(require("chai-bn")(BN));

contract("StableCoin (negative)", accounts => {
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

    it("should not add and identify minter", async () => {
        try {
            await stableCoinInstance.addMinter(minter, {
                from: minter
            });
            throw null;
        } catch (err) {
            assert(err, "Expected a revert but did not get one");
        }
    });

    it("should not add and identify burner", async () => {
        try {
            await stableCoinInstance.addBurner(burner, {
                from: burner
            });
            throw null;
        } catch (err) {
            assert(err, "Expected a revert but did not get one");
        }
    });

    it("should not remove minter", async () => {
        try {
            await stableCoinInstance.addMinter(minter, {
                from: owner
            });

            await stableCoinInstance.renounceMinter(minter, {
                from: burner
            });
            throw null;
        } catch (err) {
            assert(err, "Expected a revert but did not get one");
        }
    });

    it("should not remove burner", async () => {
        try {
            await stableCoinInstance.addBurner(burner, {
                from: owner
            });

            await stableCoinInstance.renounceBurner(burner, {
                from: minter
            });
            throw null;
        } catch (err) {
            assert(err, "Expected a revert but did not get one");
        }
    });

    it("should not mint tokens", async () => {
        try {
            await stableCoinInstance.addMinter(minter, {
                from: owner
            });

            await stableCoinInstance.mint(spender, tokenAmount, {
                from: burner
            });
            throw null;
        } catch (err) {
            assert(err, "Expected a revert but did not get one");
        }
    });

    it("should not burn tokens", async () => {
        try {
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
                from: minter
            });
            throw null;
        } catch (err) {
            assert(err, "Expected a revert but did not get one");
        }
    });

    it("should not transfer token with fee", async () => {
        try {
            await stableCoinInstance.addMinter(minter, {
                from: owner
            });

            await stableCoinInstance.mint(spender, wrongTokenAmount, {
                from: minter
            });

            await stableCoinInstance.transfer(recipient, wrongTokenAmount, {
                from: spender
            });
        } catch (err) {
            assert(err, "Expected a revert but did not get one");
        }
    });

    it("should transfer token with special fee", async () => {
        try {
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

            await stableCoinInstance.mint(spender, wrongTokenAmount, {
                from: minter
            });

            await stableCoinInstance.transfer(recipient, wrongTokenAmount, {
                from: spender
            });
        } catch (err) {
            assert(err, "Expected a revert but did not get one");
        }
    });
});
