const StableCoin = artifacts.require("StableCoin");

const { name, symbol, decimals } = require("../config");

module.exports = (deployer, network) => {
    if (network === "test" || network === "coverage") return;
    deployer.deploy(StableCoin, name, symbol, decimals);
};
