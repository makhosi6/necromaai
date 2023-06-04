
/**
 * @description Input data array of 6 number arrays
 */
const inputData = require('./data/ithuba.json');
const inputData2 = require('./data/output.cached.json');
const outputData = require('./data/output.json');
  

const bulkData = [...inputData, ...outputData,...inputData2]
module.exports = {inputData, outputData, bulkData} 

