const tf = require("@tensorflow/tfjs");
const { Sequential } = tf;

function prepareData(data) {
  const inputs = [];
  const outputs = [];

  for (let i = 0; i < data.length - 1; i++) {
    const input = data[i];
    const output = data[i + 1];

    inputs.push(input);
    outputs.push(output);
  }

  return { inputs, outputs };
}

/**
 * @description to build the predictive model.
 * @returns {Sequential}
 *
 */
function buildModel() {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({ units: 16, activation: "relu", inputShape: [6] })
  );
  model.add(tf.layers.dense({ units: 16, activation: "relu" }));
  model.add(tf.layers.dense({ units: 6, activation: "linear" }));

  model.compile({
    optimizer: "adam",
    loss: "meanSquaredError",
  });

  return model;
}

/**
 *
 * @description Preprocess the data to satisfy the constraints
 * @param {Array<Array>} data
 * @returns
 */
function preprocessData(data) {
  // Preprocess the data to satisfy the constraints
  // const processedData = data.map((array) => {
  //   const processedArray = [...array];

  //   // Apply the constraints
  //   processedArray[0] = Math.max(1, Math.min(19, Math.floor(processedArray[0])));
  //   processedArray[1] = Math.max(1, Math.min(39, Math.floor(processedArray[1])));
  //   processedArray[2] = Math.max(1, Math.min(39, Math.floor(processedArray[2])));
  //   processedArray[3] = Math.max(1, Math.min(39, Math.floor(processedArray[3])));
  //   processedArray[4] = Math.max(40, Math.min(52, Math.floor(processedArray[4])));
  //   processedArray[5] = Math.round(processedArray[5]);

  //   return processedArray;
  // });

  return data;
}

/**
 * @description train the model using the preprocessed data
 * @param {Sequential} model
 * @param {Array<Array>} data
 * @returns {Promise<Array<Array>>}
 */
async function trainModel(model, data) {
  const { inputs, outputs } = prepareData(data);
  const xs = tf.tensor2d(inputs, [inputs.length, 6]);
  const ys = tf.tensor2d(outputs, [outputs.length, 6]);
  await model.fit(xs, ys, { epochs: 100 });
}

/**
 *
 * @param {Sequential} model
 * @param {Array<Array>} inputArray
 * @returns {Array<Array>}
 */
function generatePredictions(model, inputArray) {
  const input = preprocessData([inputArray]);
  const inputTensor = tf.tensor2d(input, [1, 6]);

  const outputTensor = model.predict(inputTensor);
  const outputArray = Array.from(outputTensor.dataSync());

  const predictions = [];
  for (let i = 0; i < outputArray.length; i += 6) {
    predictions.push(outputArray.slice(i, i + 6).map(num =>  Math.round(num)));
  }
  return predictions;
}

module.exports = {
  preprocessData,
  generatePredictions,
  trainModel,
  buildModel,
};
