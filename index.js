const tf =  require('@tensorflow/tfjs');
const { buildModel, preprocessData, trainModel, generatePredictions } = require('./model');
const { inputData } = require('./data');


const model = buildModel();

/** @description processed data */
const processedData = preprocessData(inputData);


trainModel(model, processedData)
  .then(() => {
    // Model training is complete, now you can generate predictions
    const inputArray = [...inputData[inputData.length - 1]];

    console.log("Input Array", inputArray);
    const predictions = generatePredictions(model, inputArray);
    console.log('Predictions:', predictions);
  })
  .catch((error) => {
    console.error('Error training the model:', error);
  });
