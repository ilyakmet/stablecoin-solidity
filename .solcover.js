module.exports = {
    norpc: true,
    testCommand: "npm run test",
    compileCommand: "npm run compile",
    skipFiles: [
        "Migrations.sol",
        "utils/StableCoinDist.sol",
        "@openzeppelin/contracts/access/Roles.sol",
        "@openzeppelin/contracts/GSN/Context.sol",
        "@openzeppelin/contracts/math/SafeMath.sol",
        "@openzeppelin/contracts/ownership/Ownable.sol",
        "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol",
        "@openzeppelin/contracts/token/ERC20/IERC20.sol",
        "@openzeppelin/contracts/token/ERC20/IERC20Fee.sol"
    ]
};
