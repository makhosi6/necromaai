const fs = require("node:fs");
const {
  buildModel,
  preprocessData,
  trainModel,
  generatePredictions,
} = require("./model");
const { bulkData } = require("./data"),
  inputData = bulkData;

/** @description processed data */
const processedData = preprocessData(inputData);

/**
 *
 */
async function runModel() {
  //
  const model = buildModel();

  await trainModel(model, processedData);

  const numCycles = 30; // Specify the number of prediction cycles

  for (let cycle = 1; cycle <= numCycles; cycle++) {
    let num = Math.floor(Math.random() * inputData.length);
    let inputArray = inputData[num];
    console.log(inputArray, "  ", num);

    const predictions = generatePredictions(model, inputArray);
    console.log(predictions);
    writeToTxt(predictions);
    // Use the last prediction as the input for the next cycle
    // inputArray = predictions[0];
  }
}

runModel().catch((error) => {
  console.error("Error running the model:", error);
});

const writeToTxt = (data) =>
  fs.writeFile(
    `/Users/makhosi/Desktop/projects/necromaai/data/ithuba.txt`,
    "\n" + `[${data}],`,
    {
      flag: "a+",
    },
    function (err) {
      if (err) {
        return console.log(err);
      }
      // console.log(`Add ${data} to *txt file`);
    }
  );
