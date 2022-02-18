// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

interface Factory {

  /**
    * @dev Mints asset(s) in accordance to a specific address with a particular "option".
    * Options should also be delineated 0 - (numOptions() - 1) for convenient indexing.
    * @param _optionId the option id
    * @param _toAddress address of the future owner of the asset(s)
    */
  function mint(uint256 _optionId, address _toAddress) external;

  /**
   * @dev Returns a URL specifying some metadata about the option. This metadata can be of the
   * same structure as the ERC721 metadata.
   */
  function tokenURI(uint256 _optionId) external view returns (string memory);
}
