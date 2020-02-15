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
    specialFee,
    tokenAmount,
    denominator
} = require("../config");

chai.use(require("chai-bn")(BN));

contract("ERC20Fee (positive)", accounts => {
    let ERC20FeeInstance;

    const owner = accounts[0];
    const user = accounts[1];
    const feesCollector = accounts[3];

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
        expect(actualMinimumFee).to.be.a.bignumber.that.equals(minimumFee);
        expect(actualMaximumFee).to.be.a.bignumber.that.equals(maximumFee);
    });

    it("should set special parameters", async () => {
        await ERC20FeeInstance.setSpecialParams(
            user,
            specialFee.basisPointsRate,
            specialFee.minimumFee,
            specialFee.maximumFee,
            specialFee.isActive,
            {
                from: owner
            }
        );

        const _specialFee = await ERC20FeeInstance.fees(user);

        expect(_specialFee[0]).to.be.a.bignumber.that.equals(
            specialFee.basisPointsRate
        );
        expect(_specialFee[1]).to.be.a.bignumber.that.equals(
            specialFee.minimumFee
        );
        expect(_specialFee[2]).to.be.a.bignumber.that.equals(
            specialFee.maximumFee
        );
        expect(_specialFee[3]).to.equal(specialFee.isActive);
    });

    it("should calculate fee", async () => {
        await ERC20FeeInstance.setParams(
            basisPointsRate,
            minimumFee,
            maximumFee,
            {
                from: owner
            }
        );

        const fee = calculateFee(tokenAmount, false);

        const actualFee = await ERC20FeeInstance.calculateFee.call(
            owner,
            tokenAmount,
            {
                from: owner
            }
        );

        expect(actualFee).to.be.a.bignumber.that.equals(fee);
    });

    it("should calculate special fee", async () => {
        await ERC20FeeInstance.setParams(
            basisPointsRate,
            minimumFee,
            maximumFee,
            {
                from: owner
            }
        );

        await ERC20FeeInstance.setSpecialParams(
            user,
            specialFee.basisPointsRate,
            specialFee.minimumFee,
            specialFee.maximumFee,
            {
                from: owner
            }
        );

        const fee = calculateFee(tokenAmount, true);

        const actualFee = await ERC20FeeInstance.calculateFee.call(
            user,
            tokenAmount,
            {
                from: user
            }
        );

        expect(actualFee).to.be.a.bignumber.that.equals(fee);
    });
});
