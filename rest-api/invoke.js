/*
# Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
# 
# Licensed under the Apache License, Version 2.0 (the "License").
# You may not use this file except in compliance with the License.
# A copy of the License is located at
# 
#     http://www.apache.org/licenses/LICENSE-2.0
# 
# or in the "license" file accompanying this file. This file is distributed 
# on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
# express or implied. See the License for the specific language governing 
# permissions and limitations under the License.
#
*/

'use strict';
var util = require('util');
var helper = require('./connection.js');
var logger = helper.getLogger('Invoke');
var contract = helper.beerContract;

var sendTransfer = async function(args, fcn) {
	var error_message = null;
	var txIdAsString = null;
	var results = null;

	try {
		logger.info('##### sendTransfer - Invoke transaction request to %s', JSON.stringify(args));

		if (fcn == "StartTransfer"){
			results = await contract.methods.StartTransfer(args[0], parseInt(args[1])).send({from: "0x584b8d3d56939921360de245f912efc49777234b", gas:2000000});
		} else if (fcn == "RequestTransfer" ){
			results = await contract.methods.RequestTransfer(args[0], parseInt(args[1])).send({from: "0x584b8d3d56939921360de245f912efc49777234b", gas:2000000});
		} else if (fcn == "AcceptTransfer" ){
			results = await contract.methods.AcceptTransfer().send({from: "0x584b8d3d56939921360de245f912efc49777234b", gas:2000000});
		} else if (fcn == "Complete" ){
			results = await contract.methods.Complete().send({from: "0x584b8d3d56939921360de245f912efc49777234b", gas:2000000});
		} else if (fcn == "InitLedger" ){
			results = await contract.methods.InitLedger().send({from: "0x584b8d3d56939921360de245f912efc49777234b", gas:2000000});
		}

		logger.info('##### results - %s', JSON.stringify(results));
		error_message = results.events;
		txIdAsString = results.transactionHash;
	} 
	catch (error) {
		logger.error('##### invokeChaincode - Failed to invoke due to error: ' + error.stack ? error.stack : error);
		error_message = error.toString();
	}

	if (!error_message.length) {
		let message = util.format(
			'##### invokeChaincode - Successfully invoked function for transaction ID: %s', txIdAsString);
		logger.info(message);
		let response = {};
		response.transactionId = txIdAsString;
		return response;
	}
	else {
		let message = util.format('##### invokeChaincode - Failed to invoke chaincode. cause:%s', error_message);
		logger.error(message);
		throw new Error(message);
	}
};

exports.sendTransfer = sendTransfer;
