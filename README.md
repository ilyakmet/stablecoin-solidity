# StableCoin Solidity Prototype

[![Build Status](https://travis-ci.org/ilyakmet/stablecoin-solidity.svg?branch=master)](https://travis-ci.org/ilyakmet/stablecoin-solidity)
[![codecov](https://codecov.io/gh/ilyakmet/stablecoin-solidity/branch/master/graph/badge.svg)](https://codecov.io/gh/ilyakmet/stablecoin-solidity)

Instance (Ropsten): `0xB8355dC42B7c92BD67b71aC7a0614D0C4d649781`

Owner (Ropsten): `0x06140f7878921C5DeF1E2b93376B1B5bdfdF0C57`

# Developer Tools

-   [Openzepplin Contracts](https://openzeppelin.com/contracts/)
-   [Truffle](https://trufflesuite.com/)

## Start

> Create `.infura` and `.secret` files before deployment.

```bash
$ npm install
```

```bash
$ make production
```

## Test

```bash
$ npm run test
```

## Coverage

```bash
$ npm run coverage
```

## Dist

```bash
$ make production
```

## Deploy

```bash
$ make production
```

```bash
$ make deploy-ropsten
```

# Basic Example

You can find a basic usage example [here](https://github.com/ilyakmet/stablecoin-solidity/tree/master/example).

# Documentation

# \{Ownable\}

Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions. \* This module is used through inheritance. It will make available the modifier `onlyOwner`, which can be applied to your functions to restrict their use to the owner.

## constructor - read

_No parameters_
Initializes the contract setting the deployer as the initial owner.
function Object() { [native code] }

## OwnershipTransferred - read

| name          | type    | description |
| ------------- | ------- | ----------- |
| previousOwner | address |
| newOwner      | address |

Event

## isOwner - view

_No parameters_
Returns true if the caller is the current owner.

## owner - view

_No parameters_
Returns the address of the current owner.

## renounceOwnership - read

_No parameters_
Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.

## transferOwnership - read

| name     | type    | description |
| -------- | ------- | ----------- |
| newOwner | address |

Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.

# \{IERC20\}

Interface of the ERC20 standard as defined in the EIP. Does not include the optional functions; to access them see {ERC20Detailed}.

## Approval - read

| name    | type    | description |
| ------- | ------- | ----------- |
| owner   | address |
| spender | address |
| value   | uint256 |

Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance.

## Transfer - read

| name  | type    | description |
| ----- | ------- | ----------- |
| from  | address |
| to    | address |
| value | uint256 |

Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero.

## allowance - view

| name    | type    | description |
| ------- | ------- | ----------- |
| owner   | address |
| spender | address |

Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called.

## approve - read

| name    | type    | description |
| ------- | ------- | ----------- |
| spender | address |
| amount  | uint256 |

Sets `amount` as the allowance of `spender` over the caller's tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event.

## balanceOf - view

| name    | type    | description |
| ------- | ------- | ----------- |
| account | address |

Returns the amount of tokens owned by `account`.

## totalSupply - view

_No parameters_
Returns the amount of tokens in existence.

## transfer - read

| name      | type    | description |
| --------- | ------- | ----------- |
| recipient | address |
| amount    | uint256 |

Moves `amount` tokens from the caller's account to `recipient`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.

## transferFrom - read

| name      | type    | description |
| --------- | ------- | ----------- |
| sender    | address |
| recipient | address |
| amount    | uint256 |

Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.

# \{IERC20Fee\}

Interface of the ERC20Fee standard.

## Fee - read

| name            | type    | description |
| --------------- | ------- | ----------- |
| \_feesCollector | address |
| fee             | uint256 |

Emitted when fees are moved to fees collector.

## FeesCollector - read

| name             | type    | description |
| ---------------- | ------- | ----------- |
| \_feesCollector  | address |
| newFeesCollector | address |             |

Emitted when `_feesCollector` parameter have been changed.

## Params - read

| name           | type    | description |
| -------------- | ------- | ----------- |
| newBasisPoints | uint256 |
| newMinFee      | uint256 |
| newMaxFee      | uint256 |

Emitted when `_basisPointsRate`, `_minimumFee` and `_maximumFee` parameters have been changed.

## SpecialParams - read

| name           | type    | description |
| -------------- | ------- | ----------- |
| account        | address |             |
| newBasisPoints | uint256 |             |
| newMinFee      | uint256 |             |
| newMaxFee      | uint256 |             |

Emitted when `_basisPointsRate`, `_minimumFee` and `_maximumFee` parameters have been changed for specific account.

## basisPointsRate - view

_No parameters_
Returns the `_basisPointsRate`

## calculateFee - read

| name    | type    | description              |
| ------- | ------- | ------------------------ |
| account | address | Sender account address   |
| amount  | uint256 | Amount of tokens to send |

Calculates fee for a specific`account`
Return : An uint256 value representing the account fee

## denominator - view

_No parameters_
Returns the `_denominator`

## fees - view

| name    | type    | description     |
| ------- | ------- | --------------- |
| account | address | Account address |

Returns the special fees parameters for account
Return : A tuple of (uint256, uint256, uint256, bool) types

## feesCollector - view

_No parameters_
Returns the `_feesCollector`

## maximumFee - view

_No parameters_
Returns the `_maximumFee`

## minimumFee - view

_No parameters_
Returns the `_minimumFee`

## setFeesCollector - read

| name             | type    | description                           |
| ---------------- | ------- | ------------------------------------- |
| newFeesCollector | address | Account address of new fees collector |

Sets contract fees collector to a new account (`newFeesCollector`).
Return : A bool value indicating whether the operation succeeded

## setParams - read

| name               | type    | description          |
| ------------------ | ------- | -------------------- |
| newBasisPointsRate | uint256 | Value of basis rate  |
| newMinimumFee      | uint256 | Value of minimum fee |
| newMaximumFee      | uint256 | Value of maximum fee |

Sets `_basisPointsRate`, `_minimumFee` and `_maximumFee`
Return : A bool value indicating whether the operation succeeded

## setSpecialParams - read

| name           | type    | description                             |
| -------------- | ------- | --------------------------------------- |
| account        | address | Account address                         |
| newBasisPoints | uint256 | Value for account basis rate            |
| newMinFee      | uint256 | Value of account minimum fee            |
| newMaxFee      | uint256 | Value of account maximum fee            |
| state          | bool    | Account special fees state (true/false) |

Sets `basisPointsRate`, `minimumFee` and `maximumFee` for `account` in `_fees` mapping
Return : A bool value indicating whether the operation succeeded

# \{ERC20Fee\}

Implementation of the {IERC20Fee} interface.

## constructor - read

| name     | type   | description                           |
| -------- | ------ | ------------------------------------- |
| name     | string | The name of the token                 |
| symbol   | string | The symbol of the token               |
| decimals | uint8  | The number of decimals the token uses |

Sets the values for `name`, `symbol`, `decimals`, `_basisPointsRate`, `_maximumFee`, `_feesCollector` and `_denominator`
`name`, `symbol`, `decimals` and \_denominator values are immutable: they can only be set once during constructi

## decreaseAllowance - read

| name            | type    | description |
| --------------- | ------- | ----------- |
| spender         | address |
| subtractedValue | uint256 |

Atomically decreases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address. - `spender` must have allowance for the caller of at least `subtractedValue`.

## increaseAllowance - read

| name       | type    | description |
| ---------- | ------- | ----------- |
| spender    | address |
| addedValue | uint256 |

Atomically increases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address.

# \{ERC20Detailed\}

Optional functions from the ERC20 standard.

## constructor - read

| name     | type   | description |
| -------- | ------ | ----------- |
| name     | string |
| symbol   | string |
| decimals | uint8  |

Sets the values for `name`, `symbol`, and `decimals`. All three of these values are immutable: they can only be set once during construction.
function Object() { [native code]

## decimals - view

_No parameters_
Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5,05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.

## name - view

_No parameters_
Returns the name of the token.

## symbol - view

_No parameters_
Returns the symbol of the token, usually a shorter version of the name.

# \{StableCoin\}

## constructor - read

| name     | type   | description                           |
| -------- | ------ | ------------------------------------- |
| name     | string | The name of the token                 |
| symbol   | string | The symbol of the token               |
| decimals | uint8  | The number of decimals the token uses |

Sets the values for `name`, `symbol`, `decimals` and gives owner {MinterRole} and {BurnerRole}
`name`, `symbol` and `decimals` values are immutable: they can only be set once during construction

## BurnerAdded - read

| name    | type    | description |
| ------- | ------- | ----------- |
| account | address |

Emitted when account get access to {BurnerRole}.

## BurnerRemoved - read

| name    | type    | description |
| ------- | ------- | ----------- |
| account | address |

Emitted when an account loses access to the {BurnerRole}.

## MinterAdded - read

| name    | type    | description |
| ------- | ------- | ----------- |
| account | address |

Emitted when account get access to {MinterRole}.

## MinterRemoved - read

| name    | type    | description |
| ------- | ------- | ----------- |
| account | address |

Emitted when an account loses access to the {MinterRole}.

## addBurner - read

| name    | type    | description     |
| ------- | ------- | --------------- |
| account | address | Account address |

Give an account access to {BurnerRole}

## addMinter - read

| name    | type    | description     |
| ------- | ------- | --------------- |
| account | address | Account address |

Give an account access to {MinterRole}

## burn - read

| name   | type    | description    |
| ------ | ------- | -------------- |
| amount | uint256 | Amount to burn |

Destroys `amount` of tokens from the caller. See {ERC20-\_mint}
Return : bool

## isBurner - view

| name    | type    | description     |
| ------- | ------- | --------------- |
| account | address | Account address |

Check if an account has {BurnerRole}
Return : bool

## isMinter - view

| name    | type    | description     |
| ------- | ------- | --------------- |
| account | address | Account address |

Check if an account has {MinterRole}
Return : bool

## mint - read

| name   | type    | description                  |
| ------ | ------- | ---------------------------- |
| to     | address | Account address of recipient |
| amount | uint256 | Amount to mint               |

Mint `amount` of tokens `to` recipient. See {ERC20-\_mint}
Return : bool

## renounceBurner - read

| name    | type    | description     |
| ------- | ------- | --------------- |
| account | address | Account address |

Remove an account's access to {BurnerRole}

## renounceMinter - read

| name    | type    | description     |
| ------- | ------- | --------------- |
| account | address | Account address |

Remove an account's access to {MinterRole}
