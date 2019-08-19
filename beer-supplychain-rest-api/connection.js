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
var log4js = require('log4js');
var logger = log4js.getLogger('Connection');
var util = require('util');

//------------------------
// Web3 Connect
//------------------------
var Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.HttpProvider("http://13.125.217.83:7545")); //aws
var provider = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); //ganache
const web3 = new Web3(provider);
var beerAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "QueryOrder",
        "outputs": [
            {
                "name": "owner",
                "type": "string"
            },
            {
                "name": "State",
                "type": "uint8"
            },
            {
                "name": "count",
                "type": "uint256"
            },
            {
                "name": "ctime",
                "type": "uint256"
            },
            {
                "name": "utime",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "Complete",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newCounterparty",
                "type": "string"
            },
            {
                "name": "newCount",
                "type": "uint256"
            }
        ],
        "name": "RequestTransfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "UTime",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "RequestedCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "FirstCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newCounterparty",
                "type": "string"
            },
            {
                "name": "newCount",
                "type": "uint256"
            }
        ],
        "name": "StartTransfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "InitLedger",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "currState",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "RequestedCounterparty",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "AcceptTransfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "CTime",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
];
var contractAddress = "0xb44a24bdca4209424f73d3b252b764aa31cd4827"; // ganache
var beerContract = new web3.eth.Contract(beerAbi, contractAddress);
web3.eth.defaultAccount = web3.eth.accounts[0];

var getLogger = function(moduleName) {
	var logger = log4js.getLogger(moduleName);
	return logger;
};


exports.beerContract = beerContract;
exports.getLogger = getLogger;