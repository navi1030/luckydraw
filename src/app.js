/*
	1.  USING NODE JS MODULES 
	2.	CREATE PROVIDER AND WEB3 INSTANCE 
	3.	CREATE LUCKY DRAW ( SMART CONTRACT ) INSTANCE
	4.	INITIALIZE BASIC SETUP
	5.	PARTICIPANTS ENTER LUCKY DRAW GAMES
	6.	FIND WINNER
*/
$(document).ready(function(){
	

	/*===================================================
		1.  USING NODE JS MODULES 
			1.	web3 			Modules 
			2.	hdwalllet-provider 	Modules
	===================================================*/
	var Web3 = require('web3');
	var HDWalletProvider = require('@truffle/hdwallet-provider');

	/*======================================================
		2.	CREATE PROVIDER AND WEB3 INSTANCE 
	======================================================*/
		/*
			1.	METAMASK MNEMONIC
		*/
		const mnemonic = "impose toe above cause buddy yard dice pool earn tonight hurt enjoy";
		/*
			2.	DEFINE PROVIDER
		*/
		const ropsten_network = 'https://ropsten.infura.io/v3/98dc29f38ae14930ab1e726fbd992104';
		const provider = new HDWalletProvider( mnemonic, ropsten_network );
		const web3 = new Web3( provider );


	/*=======================================
		3.	CREATE LUCKY DRAW ( SMART CONTRACT ) INSTANCE
	=======================================*/
	const contract_account_address = '0xb1D5af130ec36Cc62cFb076cb5572326798Dd0A4';
	const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"destroyContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enterLuckyDraw","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"findWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"participants","outputs":[{"internalType":"address payable","name":"participant_address","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_participants","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"winner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];

	var luckyDrawInstance = new web3.eth.Contract( abi , contract_account_address );
	// console.log( luckyDrawInstance );

	/*===================================================
		4.	INITIALIZE BASIC SETUP
			1.	GET MANAGER ACCOUNT ADDRESS
			2.	GET TOTAL PARTICIPANTS
	===================================================*/
	async function initialize_basic_setup(){


		if( window.ethereum ){

			const current_account = await window.ethereum.request({ method : 'eth_requestAccounts' });
	       	participants_account_address = await current_account[0];
	        	connected_account = await participants_account_address;

			/*
			    GET MANAGER ACCOUNT ADDRESS
			*/
			const manager_account_address = await luckyDrawInstance.methods.manager().call(); 
			$( "#owner_account_address" )     .text( manager_account_address );
				// console.log(manager_account_address);

			/*
			    2.	GET TOTAL PARTICIPANTS
			*/
			var total_participants = await luckyDrawInstance.methods.total_participants().call();
			$( "#total_participants" ).text(total_participants);
					// console.log(total_participants);

			/*
			    GET CONTRACT BALANCE
			*/
			const balance = await web3.eth.getBalance(luckyDrawInstance.options.address);
			$( "#contract_balance" ).text( web3.utils.fromWei(  balance, 'ether')  );
			// console.log(balance);

			/*===================================================
					6.	FIND WINNER
			===================================================*/
		    	if(     ( parseInt(connected_account) == parseInt(manager_account_address) ) 	
			    	&&  total_participants > 0
			){

		    		var wrap = '<h2>Find Winner</h2>';
				wrap += '<button id="findWinnerButton">Find</button><br/><br/>';
				wrap += '<div id="messageForWinner"></div>';
				wrap += '<br/><br/>';

		    		$( "#findWinnerWrap" ).html(wrap);  	

		    	}

		    	async function findWinner(){
				
				$( "#messageForWinner" ).text("Process of Picking a Winner . . .");

			    	await luckyDrawInstance.methods.findWinner().send({  from: connected_account });  

			    	const winner = await luckyDrawInstance.methods.winner().call();  

			    	var message_more = '';

			    	await web3.eth.getBalance( winner, function (error, balance_in_wei) {
			       	message_more = ' , and new balance is : ' + web3.utils.fromWei(balance_in_wei, 'ether');
			    	}); 
			   
			    	$( "#messageForWinner" ).text("A Winner is : " + winner + message_more );
			}

	    }

	}
	initialize_basic_setup();

	/*===================================================
		5.	PARTICIPANTS ENTER LUCKY DRAW GAMES
	===================================================*/
	async function participants_enter_lucky_draw_games(){
		
		$( "#message" ).text("Waiting for Process Registration . . .");

		await luckyDrawInstance.methods.enterLuckyDraw()
				.send({ 	
					from: participants_account_address , 
					gas:1000000,
		               	value: web3.utils.toWei( $("#ether_amount").val() , 'ether' ) 
	           		});  

		$( "#message" ).text("You have participate on this Lucky Draw Games");
	}

	$( "#register_form" ).submit(function( event ) {
	
		participants_enter_lucky_draw_games();
		event.preventDefault();
	});
});
