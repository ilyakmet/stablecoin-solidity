const BN = require("bn.js");
const chai = require("chai");
const { expect } = require("chai");
const { calculateFee } = require("../utils/calculate-fee.js");
const ERC20Fee = artifacts.require("ERC20Fee");

const {
    name,
    symbol,
    decimals,
    basisPointsRate,
    minimumFee,
    maximumFee,
    specialFee
} = require("../config");

chai.use(require("chai-bn")(BN));

contract("ERC20Fee (negative)", accounts => {
    let ERC20FeeInstance;

    const owner = accounts[0];
    const user = accounts[1];
    const feesCollector = accounts[3];

    beforeEach("setup contracts instances", async () => {
        ERC20FeeInstance = await ERC20Fee.new(name, symbol, decimals);
    });

    it("should not set feesCollector address", async () => {
        try {
            await ERC20FeeInstance.setFeesCollector(feesCollector, {
                from: feesCollector
            });
            throw null;
        } catch (err) {
            assert(err, "Expected a revert but did not get one");
        }
    });

    it("should not set parameters", async () => {
        try {
            await ERC20FeeInstance.setParams(
                basisPointsRate,
                minimumFee,
                maximumFee,
                {
                    from: feesCollector
                }
            );
            throw null;
        } catch (err) {
            assert(err, "Expected a revert but did not get one");
        }
    });

    it("should not set special parameters", async () => {
        try {
            await ERC20FeeInstance.setSpecialParams(
                user,
                specialFee.basisPointsRate,
                specialFee.minimumFee,
                specialFee.maximumFee,
                specialFee.isActive,
                {
                    from: feesCollector
                }
            );
            throw null;
        } catch (err) {
            assert(err, "Expected a revert but did not get one");
        }
    });
});
