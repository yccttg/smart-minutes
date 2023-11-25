// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract Membership is AccessControl {
    /**
     * @dev roles are as follows
     * * ADMIN = 0x00
     * * MEMBER = 0x01
     * * LEGAL = 0x02
     * * DONOR = 0x03
     */
    bytes32 public constant MEMBER_ROLE = hex"01";
    bytes32 public constant DONOR_ROLE = hex"02";

    modifier onlyMember() {
        _checkRole(MEMBER_ROLE);
        _;
    }

    modifier onlyAdmin() {
        _checkRole(DEFAULT_ADMIN_ROLE);
        _;
    }

    modifier onlyDonor() {
        _checkRole(DONOR_ROLE);
        _;
    }

    function grantMemberRole(
        address account
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MEMBER_ROLE, account);
    }

    function grantDonorRole(
        address account
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(DONOR_ROLE, account);
    }
}
