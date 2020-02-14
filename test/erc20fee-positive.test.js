const BN = require("bn.js");
const chai = require("chai");
const { expect } = require("chai");
const { name, symbol, decimals } = require("../constructor");
// const { calculateFee } = require("../utils/calculate-fee.js");
const ERC20Fee = artifacts.require("ERC20Fee");

chai.use(require("chai-bn")(BN));

contract("ERC20Fee (positive)", accounts => {
    let ERC20FeeInstance;

    const owner = accounts[0];
    const user = accounts[1];
    const feesCollector = accounts[2];
    const basisPointsRate = new BN(50, 10);
    const minimumFee = new BN(20, 10);
    const maximumFee = new BN(20, 10);
    const userFeeState = true;
    const decimals = 6;
    const tokenAmount = new BN(10 * 10 ** decimals, 10);

    beforeEach("setup contracts instances", async () => {
        ERC20FeeInstance = await ERC20Fee.new(name, symbol, decimals);
    });

    it("should set owner address", async () => {
        const actualOwner = await ERC20FeeInstance.owner();
        expect(actualOwner).to.equal(owner);
    });

    it("should set fees collector address", async () => {
        await ERC20FeeInstance.setFeesCollector(feesCollector, {
            from: owner
        });

        const actualFeesCollector = await ERC20FeeInstance.feesCollector.call();
        expect(actualFeesCollector).to.equal(feesCollector);
    });

    it("should set parameters", async () => {
        await ERC20FeeInstance.setParams(
            basisPointsRate,
            minimumFee,
            maximumFee,
            {
                from: owner
            }
        );

        const actualBasisPoints = await ERC20FeeInstance.basisPointsRate();
        const actualMinimumFee = await ERC20FeeInstance.minimumFee();
        const actualMaximumFee = await ERC20FeeInstance.maximumFee();

        expect(actualBasisPoints).to.be.a.bignumber.that.equals(
            basisPointsRate
        );
        expect(actualMinimumFee).to.be.a.bignumber.that.equals(
            minimumFee.mul(new BN(10 ** decimals, 10))
        );
        expect(actualMaximumFee).to.be.a.bignumber.that.equals(
            maximumFee.mul(new BN(10 ** decimals, 10))
        );
    });

    it("should set special parameters", async () => {
        await ERC20FeeInstance.setSpecialParams(
            user,
            basisPointsRate,
            minimumFee,
            maximumFee,
            {
                from: owner
            }
        );

        const specialFee = await ERC20FeeInstance.fees(user);

        expect(specialFee[0]).to.be.a.bignumber.that.equals(basisPointsRate);
        expect(specialFee[1]).to.be.a.bignumber.that.equals(
            minimumFee.mul(new BN(10 ** decimals, 10))
        );
        expect(specialFee[2]).to.be.a.bignumber.that.equals(
            maximumFee.mul(new BN(10 ** decimals, 10))
        );
        expect(specialFee[3]).to.equal(userFeeState);
    });

    // todo
    // it("should calculate fee", async () => {});
    // it("should calculate special fee", async () => {});
    // it("should transfer token with fee", async () => {});
    // it("should transfer token with correct minimum fee", async () => {});
    // it("should transfer token with correct maximum fee", async () => {});
    // it("should transfer token with correct special fee", async () => {});
});
