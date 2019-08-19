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
*/

var util = require('util');
var helper = require('./connection.js');
var logger = helper.getLogger('Query');
var contract = helper.beerContract;

var queryTransfer = async function(args, fcn) {
	try {
		logger.info('##### queryChaincode - Query request to Ethereum %s', JSON.stringify(args));
		var responses = await contract.methods.QueryOrder().call();
		logger.info('##### responses - Query responses to Ethereum %s', JSON.stringify(responses));
		let ret = [];

		if (responses) {
			// we will only use the first response. We strip out the Fabric key and just return the payload
			let json = null;
			try {
				json = JSON.parse(JSON.stringify(responses));
			}
			catch(error) {
				json = JSON.stringify(responses);
			}
			ret.push(json);
			return ret;
		}
		else {
			logger.error('##### queryChaincode - result of query, responses is null');
			return 'responses is null';
		}
	}
	catch(error) {
		logger.error('##### queryChaincode - Failed to query due to error: ' + error.stack ? error.stack : error);
		return error.toString();
	}
};

exports.queryTransfer = queryTransfer;
