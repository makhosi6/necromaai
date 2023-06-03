const tf = require("@tensorflow/tfjs");
const {
  buildModel,
  preprocessData,
  trainModel,
  generatePredictions,
} = require("./model");
const { inputData } = require("./data");

/** @description processed data */
const processedData = preprocessData(inputData);

/**
 * 
 */
async function runModel() {
  //
  const model = buildModel();

  await trainModel(model, processedData);

  let inputArray = [1, 11, 25, 26, 37, 20];
  const numCycles = 3; // Specify the number of prediction cycles

  for (let cycle = 1; cycle <= numCycles; cycle++) {
    const predictions = generatePredictions(model, inputArray);
    console.log(`Cycle ${cycle} Predictions:`, predictions);

    // Use the last prediction as the input for the next cycle
    inputArray = predictions[predictions.length - 1];
  }
}

runModel().catch((error) => {
  console.error("Error running the model:", error);
});
