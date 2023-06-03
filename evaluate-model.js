const { inputData } = require("./data");
const { preprocessData, buildModel, trainModel } = require("./model");

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

await trainModel(model, processedData);
// Example usage:
const testData = {
  input: [
    [1, 11, 25, 26, 37, 20],
    [3, 15, 22, 28, 41, 12],
    // Add more test input arrays
  ],
  target: [
    [5, 20, 30, 34, 41, 18],
    [2, 12, 19, 25, 36, 8],
    // Add corresponding target arrays for evaluation
  ],
};

evaluateModel(model, testData);
