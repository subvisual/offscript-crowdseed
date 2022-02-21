// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

/**
 * @dev An OpenSea delegate proxy interface which we use in ProxyRegistry.
 *      We use it to give compiler a hint that ProxyRegistry.proxies() needs to be
 *      converted to the address type explicitly
 */
interface IOwnableDelegateProxy {

}

/**
 * @dev OpenSea Proxy Registry determines which address (wrapped as OwnableDelegateProxy)
 *      is allowed to mint an option at any given time
 * @dev OpenSea takes care to set it properly when an option is being bought
 */
interface IProxyRegistry {
    /**
     * @dev Maps owner address => eligible option minter address wrapped as OwnableDelegateProxy
     */
    function proxies(address) external view returns (IOwnableDelegateProxy);
}
