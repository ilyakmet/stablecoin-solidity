pragma solidity ^0.5.0;

import "../../GSN/Context.sol";
import "../../math/SafeMath.sol";
import "../../ownership/Ownable.sol";
import "./IERC20.sol";
import "./IERC20Fee.sol";
import "./ERC20Detailed.sol";

/**
 * @dev Implementation of the {IERC20Fee} interface.
*/
contract ERC20Fee is Context, Ownable, IERC20, IERC20Fee, ERC20Detailed {
    using SafeMath for uint256;

    struct SpecialFee {
        uint256 basisPointsRate;
        uint256 minimumFee;
        uint256 maximumFee;
        bool isActive;
    }

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => SpecialFee) private _fees;

    uint256 private _totalSupply;

    // additional variables for use if transaction fees ever became necessary
    uint256 private _basisPointsRate;
    uint256 private _minimumFee;
    uint256 private _maximumFee;
    uint256 private _denominator;
    address private _feesCollector;

    /**
     * @dev Sets the values for `name`, `symbol`, `decimals`,
     * `_basisPointsRate`, `_maximumFee`, `_feesCollector`
     * and `_denominator`
     * @param name The name of the token
     * @param symbol The symbol of the token 
     * @param decimals The number of decimals the token uses
     * @notice `name`, `symbol`, `decimals` and _denominator
     * values are immutable: they can only be set once during construction
     */
    constructor(string memory name, string memory symbol, uint8 decimals)
        public
        ERC20Detailed(name, symbol, decimals)
    {
        _basisPointsRate = 0;
        _maximumFee = 0;
        _feesCollector = _msgSender();
        _denominator = 10000;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See {IERC20Fee-basisPointsRate}.
     */
    function basisPointsRate() public view returns (uint256) {
        return _basisPointsRate;
    }

    /**
     * @dev See {IERC20Fee-minimumFee}.
     */
    function minimumFee() public view returns (uint256) {
        return _minimumFee;
    }

    /**
     * @dev See {IERC20Fee-maximumFee}.
     */
    function maximumFee() public view returns (uint256) {
        return _maximumFee;
    }

    /**
     * @dev See {IERC20Fee-denominator}.
     */
    function denominator() public view returns (uint256) {
        return _denominator;
    }

    /**
     * @dev See {IERC20-fees}.
     */
    function fees(address account)
        public
        view
        returns (uint256, uint256, uint256, bool)
    {
        return (
            _fees[account].basisPointsRate,
            _fees[account].minimumFee,
            _fees[account].maximumFee,
            _fees[account].isActive
        );
    }

    /**
     * @dev See {IERC20Fee-feesCollector}.
     */
    function feesCollector() public view returns (address) {
        return _feesCollector;
    }

    /**
     * @dev See {IERC20Fee-setFeesCollector}.
     */
    function setFeesCollector(address newFeesCollector)
        public
        onlyOwner
        returns (bool)
    {
        require(
            newFeesCollector != address(0),
            "SetFeesCollector: new fees collector is the zero address"
        );
        emit FeesCollector(_feesCollector, newFeesCollector);
        _feesCollector = newFeesCollector;
        return true;
    }

    /**
     * @dev See {IERC20Fee-setFeeSize}.
     */
    function setFeeSize(
        uint256 newBasisPoints,
        uint256 newMinFee,
        uint256 newMaxFee
    ) external onlyOwner returns (bool) {
        require(
            newBasisPoints < _denominator,
            "setFeeSize: newBasisPoints >= _denominator"
        );

        require(newMaxFee >= newMinFee, "setFeeSize: newMaxFee < newMinFee");

        _basisPointsRate = newBasisPoints;
        _minimumFee = newMinFee;
        _maximumFee = newMaxFee;
        emit FeeSizeChanged(newBasisPoints, newMinFee, newMaxFee);
        return true;
    }

    /**
     * @dev See {IERC20Fee-setSpecialParams}.
     */
    function setIndividualFeeSize(
        address account,
        uint256 newBasisPoints,
        uint256 newMinFee,
        uint256 newMaxFee,
        bool state
    ) external onlyOwner returns (bool) {
        SpecialFee memory newSpecialParams = SpecialFee({
            basisPointsRate: newBasisPoints,
            minimumFee: newMinFee,
            maximumFee: newMaxFee,
            isActive: state
        });

        _fees[account] = newSpecialParams;
        emit IndividualFeeSizeSet(
            account,
            newBasisPoints,
            newMinFee,
            newMaxFee
        );
        return true;
    }

    function cancelIndividualFeeSize(address account)
        external
        onlyOwner
        returns (bool)
    {
        _fees[account].isActive = false;
        emit IndividualFeeSizeCanceled(account);
        return true;
    }

    /**
     * @dev Calculates fee for a specific`account`
     * @param account Sender account address
     * @param amount Amount of tokens to send
     * @return An uint256 value representing the account fee
     */
    function calculateFee(address account, uint256 amount)
        internal
        view
        returns (uint256)
    {
        (uint256 basisPoints, uint256 minFee, uint256 maxFee, bool active) = fees(
            account
        );

        if (active) {
            uint256 fee = (amount.mul(basisPoints)).div(_denominator);

            if (fee < minFee) fee = minFee;
            else if (fee > maxFee) fee = maxFee;

            return fee;
        }

        uint256 fee = (amount.mul(_basisPointsRate)).div(_denominator);

        if (fee < _minimumFee) fee = _minimumFee;
        else if (fee > _maximumFee) fee = _maximumFee;

        return fee;
    }

    /**
     * @dev See {IERC20-transfer}.
     * Requirements:
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender)
        public
        view
        returns (uint256)
    {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {IERC20-approve}.
     * Requirements:
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20};
     * Requirements:
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for `sender`'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount)
        public
        returns (bool)
    {
        _transfer(sender, recipient, amount);
        _approve(
            sender,
            _msgSender(),
            _allowances[sender][_msgSender()].sub(
                amount,
                "ERC20: transfer amount exceeds allowance"
            )
        );
        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     * Emits an {Approval} event indicating the updated allowance.
     * Requirements:
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue)
        public
        returns (bool)
    {
        _approve(
            _msgSender(),
            spender,
            _allowances[_msgSender()][spender].add(addedValue)
        );
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     * Emits an {Approval} event indicating the updated allowance.
     * Requirements:
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue)
        public
        returns (bool)
    {
        _approve(
            _msgSender(),
            spender,
            _allowances[_msgSender()][spender].sub(
                subtractedValue,
                "ERC20: decreased allowance below zero"
            )
        );
        return true;
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     * Emits a {Transfer} event.
     * Requirements:
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount)
        internal
    {
        require(
            sender != address(0),
            "ERC20Fee: transfer from the zero address"
        );
        require(
            recipient != address(0),
            "ERC20Fee: transfer to the zero address"
        );

        uint256 fee = calculateFee(sender, amount);

        require(amount >= fee, "ERC20Fee: amount less then fee");

        _balances[sender] = _balances[sender].sub(
            amount,
            "ERC20Fee: transfer amount exceeds balance"
        );

        uint256 sendAmount = amount.sub(fee);

        _balances[recipient] = _balances[recipient].add(sendAmount);
        emit Transfer(sender, recipient, sendAmount);

        if (fee > 0) {
            _balances[_feesCollector] = _balances[_feesCollector].add(fee);
            emit Fee(_feesCollector, fee);
        }

    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     * Emits a {Transfer} event with `from` set to the zero address.
     * Requirements
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     * Emits a {Transfer} event with `to` set to the zero address.
     * Requirements
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: burn from the zero address");

        _balances[account] = _balances[account].sub(
            amount,
            "ERC20: burn amount exceeds balance"
        );
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner`s tokens.
     * This is internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     * Emits an {Approval} event.
     * Requirements:
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`.`amount` is then deducted
     * from the caller's allowance.
     * See {_burn} and {_approve}.
     */
    function _burnFrom(address account, uint256 amount) internal {
        _burn(account, amount);
        _approve(
            account,
            _msgSender(),
            _allowances[account][_msgSender()].sub(
                amount,
                "ERC20: burn amount exceeds allowance"
            )
        );
    }
}
