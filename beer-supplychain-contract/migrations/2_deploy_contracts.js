//var LeaseProperty = artifacts.require("./LeaseProperty.sol");
var Beer = artifacts.require("./Beer.sol");
module.exports = function(deployer) {
  deployer.deploy(Beer);
};