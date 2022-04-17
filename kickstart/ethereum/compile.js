const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');
const contractFileName = 'Compaign.sol';

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const compaignPath = path.resolve(__dirname, 'contracts', contractFileName);
const source = fs.readFileSync(compaignPath, 'utf8');

// below compile method is not compatible with latest version
// const output = solc.compile(source, 1).contracts;
var input = {
    language: 'Solidity',
    sources: {
        contractFileName : {
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
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts.contractFileName;
fs.ensureDirSync(buildPath);

for(let contract in output){
  console.log(contract);
  fs.outputJsonSync(
    path.resolve(buildPath, contract+'.json'),
    output[contract]
  );
}
