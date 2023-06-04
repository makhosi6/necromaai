const tf = require("@tensorflow/tfjs");
const { Sequential } = tf;
const { inputData, outputData } = require("./data");
const { preprocessData, buildModel, trainModel } = require("./model");
/**
 * 
 * @param {Sequential} model 
 * @param {Array<Array>} testData 
 */
function evaluateModel(model, testData) {
  const inputTensor = tf.tensor2d(testData.input, [testData.input.length, 6]);
  const targetTensor = tf.tensor2d(testData.target, [
    testData.target.length,
    6,
  ]);

  const predictionsTensor = model.predict(inputTensor);
  const predictionsArray = predictionsTensor.arraySync();

  const mse = tf.metrics
    .meanSquaredError(targetTensor, predictionsTensor)
    .dataSync()[0];
  console.log("Mean Squared Error (MSE):", mse);

  // Additional evaluation metrics can be calculated here

  // Dispose tensors to free up memory
  inputTensor.dispose();
  targetTensor.dispose();
  predictionsTensor.dispose();
}
const processedData = preprocessData(inputData);

//
const model = buildModel();

trainModel(model, processedData).then(() => {
  console.log("Done!");
  const testData = {
    input: inputData,
    target: outputData,
  };
  
  evaluateModel(model, testData);
  
})
