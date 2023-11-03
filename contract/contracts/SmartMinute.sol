// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @title Smart Minute
/// @author @ghimiresdp
/// @notice This is a NFT that contains metadata for the meeting minutes.
/// @dev  The contract SmartMinute is an erc-721 compliant smart contract that
/// is generated whenever new meeting minute gets posted.
contract SmartMinute is ERC721, Ownable {
    bool public locked;

    constructor(
        address initialOwner
    ) ERC721("SmartMinute", "SMNFT") Ownable(initialOwner) {}

    modifier onlyUnlocked() {
        require(!locked, "ERROR: CONTRACT_LOCKED");
        _;
    }
}
