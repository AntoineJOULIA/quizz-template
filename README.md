This is a quiz about animes and cartoons of the 80s/90s developed with [Next.js](https://nextjs.org/).

## Quizz questions

Each quiz question page displays a "hard hint" picture challenging the user to identify the anime/cartoon. It is possible to toggle an "easy hint" picture.

A third kind of hint is related to the title of the show, displaying the first letter, the other ones replaced by "\_" characters.

## Achievements

### Score

The overall score of the user is displayed on the `/board` page.

From this page, the user can directly access any quiz question, clicking on the question number. The status of the various questions is displayed: success / failure / not tried yet.

### Sanctuary

The progress through the quiz is represented by the journey of the Knights of the Zodiac throughout the sanctuary. According to the number of correct answers, Gold Knights houses are passed.

A new house is passed according to fixed correct answers thresholds: there is +/- 10% of the total number of shows between two houses. The order of answers does not matter.

When all 12 houses are passed (only 1 show to be discovered), the user faces the Great Pope. At 100% success, Athena is saved and the game is finished.

Progress can be checked on the `/board` page.

### Dragon balls

Dragon balls are randomly dispatched throughout the quiz when starting a new game. When the question corresponding to a dragon ball hideout is answered correctly, it is gathered on a panel of the `/board` page.

When all 7 dragon balls are found, Shenron, the Sacred Dragon, appears. By clicking on it on the `/board` page, it can grant a "wish" to the user: the user can choose a question number and Shenron provides him/her with the corresponding answer.
