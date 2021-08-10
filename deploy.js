/*
	1.	USING MODULES 
	2.	METAMASK MNEMONIC
	3.	DEFINE PROVIDER
	4.	CREATE INSTANCE OF WEB3
	5.	DEPLOY CONTRACT
*/

/*================================
	1.	USING MODULES 
================================*/
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
var { abi, evm } = require('./compile.js');
const bytecode = evm.bytecode.object;
const abi_string = JSON.stringify(abi); // convert object to string 




/*================================
	2.	METAMASK MNEMONIC
================================*/
const mnemonic = "laugh fly fatal hire type powder rural bullet tissue story add office";


/*================================
	3.	DEFINE PROVIDER
================================*/
const ropsten_network = 'https://ropsten.infura.io/v3/d71bfad164b24fc9a68836e4d613c729';
const provider = new HDWalletProvider( mnemonic, ropsten_network );

/*==========================================
	4.	CREATE INSTANCE OF WEB3
==========================================*/
const web3 = new Web3( provider );

/*================================
	5.	DEPLOY CONTRACT	
		WRITE A FUNCTION, so we can use the async awaits syntax.
================================*/
async function deploy(){

	/*
		ACCESS LIST OF METAMASK ACCOUNTS 
		( UNLOCKED ACCOUNTS, FREE ACCOUNT TO SEND AND RECEIVE ETHER )
	*/
	const accounts = await web3.eth.getAccounts();
	console.log('Deploy from account : ' + accounts[0] );	// 0x5674400cA6cE4a6479F95F8d4a20F20f54D39f96		

	/*
		USE METAMASK ACCOUNTS TO DEPLOY THE CONTRACT 
		AND CREATING LUCKY DRAW CONTRACT INSTANCE 
	*/
	LuckyDrawInstance  = 
	                     await new web3.eth.Contract(JSON.parse(abi_string))

						.deploy({ data: '0x' + bytecode })  // '0x' +
						

						.send({ from: accounts[0] , gas:'1000000' });

	console.log("Contract deployed to" + result.options.address);

			
	console.log('ABI : ' + abi_string);		
	

}
deploy();


