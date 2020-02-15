const BN = require("bn.js");

const {
    basisPointsRate,
    minimumFee,
    maximumFee,
    specialFee,
    denominator
} = require("../config");

const calculateFee = (amount, isActive) => {
    if (isActive) {
        let fee = amount.mul(specialFee.basisPointsRate).div(denominator);

        if (fee.lt(specialFee.minimumFee)) fee = specialFee.minimumFee;
        else if (fee.gt(specialFee.maximumFee)) fee = specialFee.maximumFee;

        return fee;
    }

    let fee = amount.mul(basisPointsRate).div(denominator);

    if (fee.lt(minimumFee)) fee = minimumFee;
    else if (fee.gt(maximumFee)) fee = maximumFee;

    return fee;
};

module.exports = { calculateFee };
