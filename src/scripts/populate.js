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
let data = fs.readFileSync("../data/answers.csv", "utf8");
let result = Papa.parse(data, {
  header: true,
});
console.log("Parsing done!");

console.log("Converting data...");
// Add hints, based on id
const answersWithHints = result.data.map((answer) => {
  return {
    ...answer,
    hardHint: `assets/images/${answer.id}-hard.jpg`,
    easyHint: `assets/images/${answer.id}-easy.jpg`,
  };
});

// Shuffle array
const shuffledAnswers = shuffle(answersWithHints);

// Transforms acceptedAnswers string in string[]
const answersWithConvertedAcceptedAnswers = shuffledAnswers.map((answer) => {
  if (!answer.acceptedAnswers) return { ...answer, acceptedAnswers: [] };

  let answers = answer.acceptedAnswers.split(",");
  answers = answers.map((val) => val.trim());
  return {
    ...answer,
    acceptedAnswers: answers,
  };
});

const kept = answersWithConvertedAcceptedAnswers.filter((answer) => hasImage(answer.id));
const rejected = answersWithConvertedAcceptedAnswers.filter((answer) => !hasImage(answer.id));
console.log("   > Rejected data", rejected);

// Add index property
const answers = kept.map((item, index) => {
  return {
    ...item,
    index: (index + 1).toString(),
  };
});
fs.writeFileSync("../data/answers.json", JSON.stringify(answers), "utf8");
console.log("Conversion done!");
console.log(`Dataset contains ${answers.length} answers (vs total of ${answersWithConvertedAcceptedAnswers.length})`);

console.log("Creating sample...");
const sample = answers.slice(0, 10);
fs.writeFileSync("../data/answers_sample.json", JSON.stringify(sample), "utf8");
console.log("Sample created!");

function hasImage(id) {
  const imagePath = `../../public/assets/images/${id}-hard.jpg`;
  return fs.existsSync(imagePath);
}
