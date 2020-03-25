pragma solidity ^0.5.0;

/**
 * @dev Interface of the ERC20Fee standard.
 */
interface IERC20Fee {
    /**
     * @dev Returns the `_basisPointsRate`
     */
    function basisPointsRate() external view returns (uint256);

    /**
     * @dev Returns the `_minimumFee`
     */
    function minimumFee() external view returns (uint256);

    /**
     * @dev Returns the `_maximumFee`
     */
    function maximumFee() external view returns (uint256);

    /**
     * @dev Returns the `_denominator`
     */
    function denominator() external view returns (uint256);

    /**
     * @dev Returns the special fees parameters for account
     * @param account Account address
     * @return A tuple of (uint256, uint256, uint256, bool) types
     */
    function fees(address account)
        external
        view
        returns (uint256, uint256, uint256, bool);

    /**
     * @dev Returns the `_feesCollector`
     */
    function feesCollector() external view returns (address);

    /**
     * @dev Sets contract fees collector to a new account (`newFeesCollector`).
     * @param newFeesCollector Account address of new fees collector
     * @return A bool value indicating whether the operation succeeded
     */
    function setFeesCollector(address newFeesCollector) external returns (bool);

    /**
     * @dev Sets `_basisPointsRate`, `_minimumFee` and `_maximumFee`
     * @param newBasisPoints Value of basis rate
     * @param newMinFee Value of minimum fee
     * @param newMaxFee Value of maximum fee
     * @return A bool value indicating whether the operation succeeded
     */
    function setFeeSize(
        uint256 newBasisPoints,
        uint256 newMinFee,
        uint256 newMaxFee
    ) external returns (bool);

    /**
     * @dev Sets `basisPointsRate`, `minimumFee` and `maximumFee`
     * for `account` in `_fees` mapping
     * @param account Account address
     * @param newBasisPoints Value for account basis rate
     * @param newMinFee Value of account minimum fee
     * @param newMaxFee Value of account maximum fee
     * @param state Account special fees state (true/false)
     * @return A bool value indicating whether the operation succeeded
     */
    function setIndividualFeeSize(
        address account,
        uint256 newBasisPoints,
        uint256 newMinFee,
        uint256 newMaxFee,
        bool state
    ) external returns (bool);

    /**
     * @dev Emitted when `_basisPointsRate`, `_minimumFee` and `_maximumFee`
     * parameters have been changed.
     */
    event FeeSizeChanged(
        uint256 indexed newBasisPoints,
        uint256 indexed newMinFee,
        uint256 indexed newMaxFee
    );

    /**
     * @dev Emitted when `_basisPointsRate`, `_minimumFee` and `_maximumFee`
     * parameters have been changed for specific account.
     */
    event IndividualFeeSizeSet(
        address indexed account,
        uint256 indexed newBasisPoints,
        uint256 newMinFee,
        uint256 newMaxFee
    );

    event IndividualFeeSizeCanceled(address indexed account);

    /**
     * @dev Emitted when fees are moved to fees collector
     */
    event FeeTransferred(address indexed _feesCollector, uint256 indexed fee);

    /**
     * @dev Emitted when `_feesCollector` parameter have been changed
     */
    event FeesCollectorSet(
        address indexed _feesCollector,
        address indexed newFeesCollector
    );
}
