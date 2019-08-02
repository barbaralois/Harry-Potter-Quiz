let activeQuestion=0;
let currentScore=0;

/* function will generate the question/answers from the question set (render question in DOM) - Loop through possible responses*/
function generateQuestion() {
  $("section.main-content").replaceWith(`<section class="main-content"><h1>${STORE[activeQuestion].question}</h1><form id="question-prompt"><fieldset><label class="an-answer"><input type="radio" value="${STORE[activeQuestion].possibleResponses[0]}" name="answer" required><span>${STORE[activeQuestion].possibleResponses[0]}</span></label><label class="an-answer"><input type="radio" value="${STORE[activeQuestion].possibleResponses[1]}" name="answer" required><span>${STORE[activeQuestion].possibleResponses[1]}</span></label><label class="an-answer"><input type="radio" value="${STORE[activeQuestion].possibleResponses[2]}" name="answer" required><span>${STORE[activeQuestion].possibleResponses[2]}</span></label><label class="an-answer"><input type="radio" value="${STORE[activeQuestion].possibleResponses[3]}" name="answer" required><span>${STORE[activeQuestion].possibleResponses[3]}</span></label></fieldset></form><input type="submit" value="Submit" form="question-prompt" class="submit-button"></section>`);
};

/* function will render the question number in the DOM */
function currentQuestion() {
  $(".current-question").replaceWith(`<div class="current-question">Question ${activeQuestion+1}</div>`)
};

/* function will render the user's score in the DOM */
function trackScore() {
  $(".current-score").replaceWith(`<div class="current-score">Current Score: ${currentScore}/10`);
};

/* function will display the feedback screen after the user clicks submit on a question */
function rightAnswer() {
  $("section.main-content").replaceWith(`<section class="main-content"><h1>You are...</h1><img src="https://i.imgur.com/akqmeFl.png" alt="Correct written in Harry Potter style font" class="images"><p>${STORE[activeQuestion].feedback}</p><button type="button" class="submit-button next">Next</button></section>`)
};

function wrongAnswer() {
  $("section.main-content").replaceWith(`<section class="main-content"><h1>You are...</h1><img src="https://i.imgur.com/McoT3Bf.png" alt="Incorrect written in Harry Potter style font" class="images"><p>${STORE[activeQuestion].feedback}</p><button type="button" class="submit-button next">Next</button></section>`)
};

/* function will display the final results screen after the user completes the last question */
function quizResults() {
  $("header.quiz-progress").hide();
  if (currentScore > 7) {
    $("section.main-content").replaceWith(`<section class="main-content"><img src="https://i.imgur.com/MMw5M7U.png" alt="Outstanding written in Harry Potter style font" class="images image-results"><h1>Your Score: ${currentScore}/10</h1><p>You’re no casual Harry Potter fan...you know your stuff, and you did a great job on this quiz. Congratulations on achieving the highest rating!</p><a href="https://barbaralois.github.io/QuizApp/welcome.html" class="submit-button" role="button">Play Again</a></section>`)
  }
  else if (currentScore > 3) {
    $("section.main-content").replaceWith(`<section class="main-content"><img src="https://i.imgur.com/Yt9ijDU.png" alt="Acceptable written in Harry Potter style font" class="images image-results"><h1>Your Score: ${currentScore}/10</h1><p>Your Harry Potter knowledge could use a little brushing up...maybe it's time to reread the series and see if you can improve your score!</p><a href="https://barbaralois.github.io/QuizApp/welcome.html" class="submit-button" role="button">Play Again</a></section>`)
  }
  else {
    $("section.main-content").replaceWith(`<section class="main-content"><img src="https://i.imgur.com/tphGq8w.png" alt="Dreadful written in Harry Potter style font" class="images image-results"><h1>Your Score: ${currentScore}/10</h1><p>Oh, dear. Have you read the Harry Potter books? If not, you are missing out on a wonderful fantasy universe! You should pick up a copy of Harry Potter and the Sorcerer's Stone and see what the buzz is about.</p><a href="https://barbaralois.github.io/QuizApp/welcome.html" class="submit-button" role="button">Play Again</a></section>`)
  };
};

/* function will increment score */
function increaseScore() {
  currentScore++;
};

/* function will progress to the next question */
function nextQuestion () {
  activeQuestion++;
};

/* function will check if provided answer is correct */
function checkAnswer () {
  $("form").on("submit", function (event) {
    let answer = $("input:checked").val();
    event.preventDefault();
    let correctAnswer = `${STORE[activeQuestion].correctAnswer}`;
    if (answer === correctAnswer) {
      rightAnswer();
      increaseScore();
    } else {
      wrongAnswer();
    };
  });
};

/* function will load next question*/
function renderNext() {
  $("main").on("click", ".next", function (event) {
    trackScore();
    if (activeQuestion+1 < STORE.length) {
      nextQuestion();
      generateQuestion();
      currentQuestion();
      checkAnswer();
    } else {
      quizResults();
    }
  });
};


/* function will load appropriate quiz functions at start */
function initializeQuiz () {
  generateQuestion();
  renderNext();
  checkAnswer();
};

initializeQuiz();