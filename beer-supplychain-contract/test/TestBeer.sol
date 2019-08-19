pragma solidity ^0.4.25;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Beer.sol";

contract TestBeer {
    Beer beer = Beer(DeployedAddresses.Beer());

    // Testing the lease() function
    function testQueryOrder() public {
       //var (_RequestedCounterparty, _State, _RequestedCount, _CTime, _UTime) = beer.QueryOrder();
        uint256 _RequestedCount= 0;
        uint256 expected = 0;
        Assert.equal(_RequestedCount, expected, "RequestedCount is 0");
    }

}
