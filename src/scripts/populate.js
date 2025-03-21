// eslint-disable-next-line
const fs = require("node:fs");
// eslint-disable-next-line
const Papa = require("papaparse");

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

console.log("Reading input csv file...");
let data = fs.readFileSync("../data/quizz-items.csv", "utf8");
let result = Papa.parse(data, {
  header: true,
});
console.log("Parsing done!");

console.log("Converting data...");
// Add hints, based on id
const quizzItemsWithHints = result.data.map((item) => {
  return {
    ...item,
    hardHint: `assets/images/${item.id}-hard.jpg`,
    easyHint: `assets/images/${item.id}-easy.jpg`,
  };
});

// Shuffle array
const shuffledQuizzItems = shuffle(quizzItemsWithHints);

// Transforms acceptedAnswers string in string[]
const quizzItemsWithConvertedAcceptedAnswers = shuffledQuizzItems.map((item) => {
  if (!item.acceptedAnswers) return { ...item, acceptedAnswers: [] };

  let answers = item.acceptedAnswers.split(",");
  answers = answers.map((val) => val.trim());
  return {
    ...item,
    acceptedAnswers: answers,
  };
});

const kept = quizzItemsWithConvertedAcceptedAnswers.filter((item) => hasImage(item.id));
const rejected = quizzItemsWithConvertedAcceptedAnswers.filter((item) => !hasImage(item.id));
console.log("   > Rejected data", rejected);

// Add index property
const quizzItems = kept.map((item, index) => {
  return {
    ...item,
    index: (index + 1).toString(),
  };
});
fs.writeFileSync("../data/quizz-items.json", JSON.stringify(quizzItems), "utf8");
console.log("Conversion done!");
console.log(
  `Dataset contains ${quizzItems.length} quizz items (vs total of ${quizzItemsWithConvertedAcceptedAnswers.length})`
);

console.log("Creating sample...");
const sample = quizzItems.slice(0, 10);
fs.writeFileSync("../data/quizz-items_sample.json", JSON.stringify(sample), "utf8");
console.log("Sample created!");

function hasImage(id) {
  const imagePath = `../../public/assets/images/${id}-hard.jpg`;
  return fs.existsSync(imagePath);
}
