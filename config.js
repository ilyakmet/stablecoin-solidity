const BN = require("bn.js");

module.exports = {
    // for testing and deploy
    name: "StableCoin",
    symbol: "STBLC",
    decimals: 6,
    // for testing only
    basisPointsRate: new BN(50, 10),
    minimumFee: new BN(5 * 10 ** 6, 10),
    maximumFee: new BN(10 * 10 ** 6, 10),
    specialFee: {
        basisPointsRate: new BN(20, 10),
        minimumFee: new BN(4 * 10 ** 6, 10),
        maximumFee: new BN(8 * 10 ** 6, 10),
        isActive: true
    },
    tokenAmount: new BN(100 * 10 ** 6, 10),
    wrongTokenAmount: new BN(1, 10),
    denominator: new BN(10000, 10)
};