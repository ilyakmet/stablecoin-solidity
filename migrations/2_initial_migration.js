const StableCoin = artifacts.require("StableCoin");

const { name, symbol, decimals } = require("../constructor");

module.exports = (deployer, network) => {
    if (network === "test" || network === "coverage") return;
    deployer.deploy(StableCoin, name, symbol, decimals);
};
