import { quests } from "./questions.js";

quests.forEach((question) => {
  const correctIndex = question.correct;
  const otherAlternatives = question.alts.filter(
    (alt, index) => index !== correctIndex
  );
  const shuffledAlternatives = shuffleArray(otherAlternatives);
  shuffledAlternatives.splice(correctIndex, 0, question.alts[correctIndex]);
  question.alts = shuffledAlternatives;
});
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
let app = {
  chooseDifficulty: function () {
    const difficultymenu = document.getElementById("difficulty");
    const questiontab = document.getElementById("conjquest");

    let easy = document.getElementById("easy");
    let medium = document.getElementById("medium");
    let hard = document.getElementById("hard");
    let all = document.getElementById("all");

    let levelOneQuestions = quests.filter((question) => question.lvl === 1);
    let levelTwoQuestions = quests.filter((question) => question.lvl === 2);
    let levelThreeQuestions = quests.filter((question) => question.lvl === 3);

    let btnstart = document.getElementById("btnstart");
    let startmenu = document.getElementById("start");

    btnstart.addEventListener("click", () => {
      startmenu.style.display = "none";
      btnstart.style.display = "none";
      difficultymenu.style.display = "block";
    });
    easy.addEventListener("click", () => {
      questiontab.style.display = "block";
      difficultymenu.style.display = "none";
      this.availableQuestions = levelOneQuestions.slice();
    });
    medium.addEventListener("click", () => {
      questiontab.style.display = "block";
      difficultymenu.style.display = "none";
      this.availableQuestions = levelTwoQuestions.slice();
    });
    hard.addEventListener("click", () => {
      questiontab.style.display = "block";
      difficultymenu.style.display = "none";
      this.availableQuestions = levelThreeQuestions.slice();
    });
    all.addEventListener("click", () => {
      questiontab.style.display = "block";
      difficultymenu.style.display = "none";
      this.availableQuestions = quests.slice();
    });
  },
  totalflaws: 0,
  totalscore: 0,
  availableQuestions: [],

  start: function () {
    let levelOneQuestions = quests.filter((question) => question.lvl === 1);
    this.nowpos = 0;
    let altrs = document.querySelectorAll(".alt");
    altrs.forEach((element, index) => {
      element.addEventListener("click", () => {
        this.check(index);
      });
    });
    this.availableQuestions = levelOneQuestions.slice();
    this.questionScreen(this.getRandomQuestion());
    this.chooseDifficulty();
  },
  questionScreen: function (q) {
    this.qnow = q;
    let titlequest = document.getElementById("quest");
    titlequest.innerHTML = "";
    let image = document.createElement("img");
    image.src = q.title;
    titlequest.appendChild(image);

    let altrs = document.querySelectorAll(".alt");
    altrs.forEach(function (element, index) {
      element.textContent = q.alts[index];
    });
  },
  nextquest: function () {
    let finalScore = document.createElement("h2");
    let totalQuestions = this.totalscore + this.totalflaws;
    let main = document.querySelector("main");

    if (this.availableQuestions.length == 0) {
      finalScore.textContent = `Você acertou ${this.totalscore} de ${totalQuestions} Bandeiras!`;
      finalScore.classList.add("final-score");
      main.innerHTML = "";
      main.appendChild(finalScore);
    } else {
      setTimeout(() => {
        let nextQuestion = app.getRandomQuestion();
        app.questionScreen(nextQuestion);
        app.nextQuest();
      }, 1);
    }
  },
  getRandomQuestion: function () {
    let randomIndex = Math.floor(
      Math.random() * this.availableQuestions.length
    );
    let question = this.availableQuestions[randomIndex];
    this.availableQuestions.splice(randomIndex, 1);
    return question;
  },
  check: function (user) {
    if (this.qnow.correct == user) {
      this.totalscore++;
      this.mark(true);
    } else {
      this.totalflaws++;
      this.mark(false);
    }
    this.attscore();
    this.nextquest();
  },
  attscore: function () {
    let scoreDiv = document.getElementById("score");
    scoreDiv.textContent = `Você acertou: ${this.totalscore}`;
  },
  mark: function (correct) {
    let resultDiv = document.getElementById("result");
    let result = "";
    if (correct) {
      result = "Resposta Correta";
      resultDiv.classList.add("correct");
      resultDiv.classList.remove("incorrect");
    } else {
      let quest = this.qnow;
      let cindex = quest.correct;
      let ctext = quest.alts[cindex];
      result = `Incorreto!<br>Resposta correta: ${ctext}`;
      resultDiv.classList.add("incorrect");
      resultDiv.classList.remove("correct");
    }
    resultDiv.innerHTML = result;
  },
};
app.start();
