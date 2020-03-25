Contract Deployment (ZToken)

## Before deployment

Register with infura and create a new project to get your own API-Key. The infura API Key is used to communicate with Ethereum Blockchain. Infura offers 3 keys free in mainnet / testnet, and you can do 100.000 requests a day.



4 steps:

- Step — 1 Register
- Step — 2 Create your infura API KEY
- Step — 3 Use the infura API KEY
- Step — 4 Deploy the contract 

## Step — 1 (Register)

Upon registration you will be able to create a new project, which will in turn generate a new Project ID (and the associated Infura API endpoint URLs). Make sure you save this key and keep it private!



To get infura API Key, register here[ https://infura.io/register](https://infura.io/register).

Check your email, and confirm the address.

## Step — 2 (API key creation)

Create a new project and setup the name of it

![img](https://lh3.googleusercontent.com/zLXYYyM5QfYT3iIFrdN0imMunBz2jUlmSqBB7_dG9jd7qO-kn9639BFqcwQMZTi0KUjyxvXkv6rzc-aAp4INdsOx8skmRLD913Y8NyfiCLsL5kU7G4vLXcBnB0LcXDFrH4P9Kk02)

Now, you can copy the project ID (key) from your project.

## Step — 3 (Use the API key)

Create `.infura`, `.secret` files and `dist` directory.

Pass your API-Key to the `.infura` file. Save it.

You'll also need a mnemonic - the twelve word phrase the wallet uses to generate public/private key pairs. If you're publishing your code to GitHub make sure you load this phrase from a file you've .gitignored so it doesn't accidentally become public.

Pass your mnemonic to the `.secret` file. Save it.

In the `truffle-config.js` file, uncomment this section of the code:


```javascript
const HDWalletProvider = require("truffle-hdwallet-provider");

const fs = require("fs");

const mnemonic = fs
  .readFileSync(".secret")
  .toString()
  .trim();*


const infuraKey = fs
  .readFileSync(".infura")
  .toString()
  .trim();
```

You are ready to deploy the contract.

## Step — 4 (Deploy the contract)

*Note: Before deployment, make sure that you have enough funds on your address.*

To build contract run command:

```bash
$ make production
```

In order to deploy the contract, you have to specify the network.

Available commands are listed below.

**Main network:**


```bash
$ make deploy-live
```
**Ropsten network:**

```bash
$ make deploy-ropsten
```
**Kovan network: **

```bash
$ make deploy-kovan
```

**Rinkeby network:**

```bash
$ make deploy-rinkeb
```

**Development network:**

```bash
$ make deploy-development
```





---

For example, to deploy in Ropsten:

```bash
$ make deploy-ropsten
```

After a successful deployment, you will see the final log:

```
Starting migrations...
======================
> Network name:  'ropsten'
> Network id:   3
> Block gas limit: 0x7a121d

1_initial_migration.js
======================

  Replacing 'Migrations'
  ----------------------*
  > transaction hash:  0x957e341f44ae12ab5adba486ea045198392e9865929fdc9330eb65587778989c
  > Blocks: 0      Seconds: 9
  > contract address:  0x49D050CcC73a141Acd04334F18537AEf02973Ddd
  > block number:    7583110
  > block timestamp:   1585077231
  > account:       0x81052D42a31a5D73879f69cE2D2D646Ca00C2b89
  > balance:       1.09773098
  > gas used:      135795
  > gas price:      20 gwei
  > value sent:     0 ETH
  > total cost:     0.0027159 ETH

  Pausing for 2 confirmations...
  ------------------------------
  > confirmation number: 1 (block: 7583111)
  > confirmation number: 2 (block: 7583112)

2_deploy_contracts.js

=====================

  Replacing 'StableCoin'
  ----------------------*
  > transaction hash:  0x7a586e46ac362413c70a3ac1cbd28eb498515a796cdeef121513deaee18b61c7
  > Blocks: 2      Seconds: 40
  > contract address:  0x822dE5f41e2E484cd62D53D9bcD14e7e3bcaD792
  > block number:    7583112
  > block timestamp:   1585067299
  > account:       0x81052D42a31a5D73879f69cE2D2D646Ca00C2b89
  > balance:       0.10044688
  > gas used:      3138665
  > gas price:      20 gwei
  > value sent:     0 ETH
  > total cost:     0.0627733 ETH

  Pausing for 2 confirmations...
  ------------------------------
  > confirmation number: 1 (block: 7583113)
  > confirmation number: 2 (block: 7583114)

```



In the `dist` folder you will find the Solidity single file code `StableCoin.sol`, that you need in order to verify the contract at etherscan.io 



In the `build/contracts` directory you will find the `StableCoin.json` file, which contains an ABI and a Byte code.