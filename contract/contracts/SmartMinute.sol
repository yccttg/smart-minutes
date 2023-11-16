// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Membership.sol";

/// @title Smart Minute
/// @author @ghimiresdp
/// @notice This is a NFT that contains metadata for the meeting minutes.
/// @dev  The contract SmartMinute is an erc-721 compliant smart contract that
/// is generated whenever new meeting minute gets posted.
contract SmartMinute is ERC721URIStorage, Membership, Ownable, Pausable {
    bool public locked;
    uint256 private _tokenCounter;
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd; // ERC721 interface ID
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7; // ERC165 interface ID

    event PublishedNFT(address publisher, uint256 newId);

    constructor(
        address initialOwner
    ) ERC721("SmartMinute", "SMNFT") Ownable(initialOwner) Membership() {
        _tokenCounter = 0;
    }

    modifier onlyUnlocked() {
        require(!locked, "ERROR: CONTRACT_LOCKED");
        _;
    }

    function _mint(
        string memory _tokenUri,
        address _to
    ) internal whenNotPaused returns (uint256) {
        _safeMint(_to, _tokenCounter);
    }

    // Override supportsInterface from AccessControl that is used in Membership and ERC721URIStorage
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(AccessControl, ERC721URIStorage) returns (bool) {
        return
            AccessControl.supportsInterface(interfaceId) ||
            ERC721URIStorage.supportsInterface(interfaceId);
    }
}
