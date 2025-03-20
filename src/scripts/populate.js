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
let data = fs.readFileSync("../data/dessins-animes.csv", "utf8");
let result = Papa.parse(data, {
  header: true,
});
console.log("Parsing done!");

console.log("Converting data...");
// Add hints, based on id
const animesWithHints = result.data.map((anime) => {
  return {
    ...anime,
    hardHint: `assets/images/${anime.id}-hard.jpg`,
    easyHint: `assets/images/${anime.id}-easy.jpg`,
  };
});

// Shuffle array
const shuffledAnimes = shuffle(animesWithHints);

// Transforms acceptedAnswers string in string[]
const animesWithConvertedAcceptedAnswers = shuffledAnimes.map((anime) => {
  if (!anime.acceptedAnswers) return { ...anime, acceptedAnswers: [] };

  let answers = anime.acceptedAnswers.split(",");
  answers = answers.map((val) => val.trim());
  return {
    ...anime,
    acceptedAnswers: answers,
  };
});

const kept = animesWithConvertedAcceptedAnswers.filter((anime) => hasImage(anime.id));
const rejected = animesWithConvertedAcceptedAnswers.filter((anime) => !hasImage(anime.id));
console.log("   > Rejected animes", rejected);

// Add index property
const animes = kept.map((item, index) => {
  return {
    ...item,
    index: (index + 1).toString(),
  };
});
fs.writeFileSync("../data/dessins-animes.json", JSON.stringify(animes), "utf8");
console.log("Conversion done!");
console.log(`Dataset contains ${animes.length} animes (vs total of ${animesWithConvertedAcceptedAnswers.length})`);

console.log("Creating sample...");
const sample = animes.slice(0, 10);
fs.writeFileSync("../data/dessins-animes_sample.json", JSON.stringify(sample), "utf8");
console.log("Sample created!");

function hasImage(id) {
  const imagePath = `../../public/assets/images/${id}-hard.jpg`;
  return fs.existsSync(imagePath);
}
