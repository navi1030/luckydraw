/*
    1.  USING JAVASCRIPT MODULES 
    2.  GET CONTRACT PATH
    3.  READ THE FILE CONTENT 
    4.  COMPILING CONTRACT
    5.  VIEW THE OUTPUT
    6.  MAKE IT AVAILABLE TO OTHER FILES INSIDE PROJECT BY EXPORTING THIS MODULE
*/

/*================================
    1.  USING JAVASCRIPT MODULES 
================================*/

/*
    1.  Path modules 
        cross platform compatibility
        on windows, linux always generate the valid path
*/
const path = require('path'); // 
/*
    2.  FILE SYSTEM Modules
*/
const fs = require('fs');  
/*
    3.  SOLIDITY COMPILER MODULES
*/
const solc = require('solc');





/*================================
    2.  GET CONTRACT PATH
================================*/

// const contractPath =  path.resolve('__dirname' , 'contract folder', 'contract file');
const contractPath =  path.resolve(__dirname, 'contracts', 'LuckyDraw.sol');
// console.log(__dirname);
 //console.log(contractPath);
/*================================
    3.  READ THE FILE CONTENT 
        USING FILE SYSTEM MODULES 
================================*/
// const source =  fs.readFileSync( contractPath, type_of_encoding );
const source =  fs.readFileSync( contractPath, 'utf8');
//console.log(source);

/*================================
    4.  COMPILING CONTRACT
================================*/
var input = {
    language: 'Solidity',
    sources: {
        'LuckyDraw.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}
    /*
        JSON.stringify(input)
        solc.compile( JSON.stringify(input) )
        JSON.parse( solc.compile( JSON.stringify(input) ) )

    */
var output = JSON.parse(solc.compile(JSON.stringify(input))) // an object
//console.log(output);

/*================================
    5.  VIEW THE OUTPUT
================================*/
// console.log( output );
var contract_name = 'LuckyDraw' // get from LuckyDraw.sol
//console.log( output.contracts['LuckyDraw.sol'][contract_name] );

/*======================================================
   6.  MAKE IT AVAILABLE TO OTHER FILES INSIDE PROJECT BY EXPORTING THIS MODULE
======================================================*/
/*
    Return the entire object 
*/
// module.exports = output; 
/*
    Return content of the Lucky Draw Contract content ( or details ) 
*/
var contract_name = 'LuckyDraw' // get from LuckyDraw.sol
module.exports = output.contracts['LuckyDraw.sol'][contract_name];