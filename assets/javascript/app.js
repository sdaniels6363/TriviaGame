function loadGameQuestions() {
  var triviaQuestions = [
    // array to hold all of the questions
    {
      "question": "What is the name of Doc Brown's dog in Back To The Future?",
      "answers": ["Einstein", "Tesla", "Edison", "Bob"],
      "correctAnswer": "answer-1",
    }, {
      "question": "What is 2 + 2?",
      "answers": ["2", "22", "4", "10"],
      "correctAnswer": "answer-3"
    }
  ];
  // load variables
  answeredCorrect = 0;

  return triviaQuestions;
}

function resetGameTimer(counter) {
  $("#timer-box").html("<h3>Resetting game in " + counter + " seconds.</h3>");
  var resetGame = setInterval(function () {
    var timerRunning = true;
    counter--;
    if (counter <= 0) { // this resets the game.
      clearInterval(resetGame);
      timerRunning = false; // toggles the state of the timer
      timerExpired = true; // tracks if the question timer expired
      triviaQuestions = loadGameQuestions();
      currentQuestionAnswer = selectQuestion(triviaQuestions);
    } else if (counter < 2) {
      $("#timer-box").html("<h3>Loading Questions</h3>")
    } else {
      $("#timer-box").html("<h3>Resetting game in " + counter + " seconds.</h3>");
    }
  }, 1000);
}

function selectQuestion(array) {
  // this function selects a question from the bank of questions

  // sets the games basic conditions.
  timerExpired = false;
  answerSelected = false;

  // indexNumber = 0; //maybe make random, but for testing will be static
  indexNumber = Math.floor(Math.random() * array.length); // this will select a random question.

  question = array[indexNumber];
  if (question) {
    $("#question").html("<h4>" + question.question + "</h4>")
    $("#answer-1").html("<h5>" + question.answers[0] + "</h5>")
    $("#answer-2").html("<h5>" + question.answers[1] + "</h5>")
    $("#answer-3").html("<h5>" + question.answers[2] + "</h5>")
    $("#answer-4").html("<h5>" + question.answers[3] + "</h5>")

    // if the answer buttons were changed to highlight the answers, reset them.
    for (i = 1; i < 5; i++) {
      var answerId = "#answer-" + i;
      if ($(answerId).hasClass("correct-answer")) {
        $(answerId).removeClass("correct-answer");
      } else if ($(answerId).hasClass("incorrect-answer")) {
        $(answerId).removeClass("incorrect-answer");
      }
    }

    // set timer for question
    counter = 30;
    var timerRunning = true;
    $("#timer-box").html("<h3>Time Remaining: " + counter + "</h3>");
    timerCountdown = setInterval(function () {
      counter--;
      if (counter <= 0) {
        clearInterval(timerCountdown);
        $("#timer-box").html("<h3>Time is up!</h3>");
        timerRunning = false;
        timerExpired = true;
        selectedAnswer = null;
        answerId = "#" + currentQuestionAnswer;
        $(answerId).addClass("correct-answer"); // if question is unanswered, the correct answer will be highlighted.
        newQuestionTimer(7);
      } else {
        $("#timer-box").html("<h3>Time Remaining: " + counter + "</h3>");
      }
    }, 1000);


    // remove the selected question from the bank of questions.
    triviaQuestions.splice(indexNumber, 1);

    return question.correctAnswer;

  } else {
    // do nothing
  }
}

function newQuestionTimer(counter) {

  var timerRunning = true;
  var nextQuestionTimer = setInterval(function () {
    $("#timer-box").html("<h3>Next question in " + counter + " seconds!</h3>")
    counter--;
    if (counter <= 0) {
      clearInterval(nextQuestionTimer);
      // check to see if there are any remaining questions
      var questionsRemaining = triviaQuestions.length
      if (questionsRemaining === 0) {
        $("#timer-box").html("<h3>No questions remain.</h3>")
        endOfGamePopup();
      } else {
        $("#timer-box").html("<h3>Next Question!</h3>");
        timerExpired = true;
        timerRunning = false;
        currentQuestionAnswer = selectQuestion(triviaQuestions); //once timer expires call next question.
      }
    } else if (null === selectedAnswer && counter > 3) {
      $("#timer-box").html("<h3>Time is up!</h3>");
    } else if (currentQuestionAnswer === selectedAnswer && counter > 3) {
      $("#timer-box").html("<h3>Correct Choice</h3>");
    } else if (currentQuestionAnswer !== selectedAnswer && counter > 3) {
      $("#timer-box").html("<h3>Incorrect Choice</h3>");
    } else {
      $("#timer-box").html("<h3>Next question in " + counter + " seconds!</h3>");
    }
  }, 1000);
}

function endOfGamePopup() {
  // to be run when the user has finished the game.
  $("#score").text("Score: " + ((answeredCorrect / totalQuestions)*100));
  $("#correct-answers").text("Correct Answers: " + answeredCorrect);
  $("#incorrect-answers").text("Incorrect Answers: " + (totalQuestions - answeredCorrect));
  $("#popup").removeClass("hidden");
}

$(document).ready(function () {

  // load questions
  triviaQuestions = loadGameQuestions();

  // score tracker
  totalQuestions = triviaQuestions.length;
  timerRunning = true;

  // once the page is loaded a question is selected.
  currentQuestionAnswer = selectQuestion(triviaQuestions);

  $(".answers").on("click", function () {
    if (answerSelected) {
      // prevents the user from changing the answer.
      console.log("Answer has already been selected.")
    } else {

      if (timerExpired) {
        alert("Time is up, cannot select an answer.")
      } else {
        selectedAnswer = this.id;
        selectedAnswerID = "#" + selectedAnswer;
        answerSelected = true;
        clearInterval(timerCountdown); // stop the countdown timer

        if (currentQuestionAnswer === selectedAnswer) {
          // if the user selects the correct answer do the following
          $(selectedAnswerID).addClass("correct-answer");
          // add timer for 3 seconds
          answeredCorrect = answeredCorrect + 1;

        } else {
          // if the user is incorrect do the following.
          correctAnswerId = "#" + currentQuestionAnswer;
          $(correctAnswerId).addClass("correct-answer");
          $(selectedAnswerID).addClass("incorrect-answer");
        }
        // // regardless of whether the answer is right or wrong, prep for next question
        newQuestionTimer(5); // new question will be selected here. 
      }

    }

  });

  $("#restart").on("click", function(){
    $("#popup").addClass("hidden");
    $("#question").empty();
    $("#answer-1").empty();
    $("#answer-2").empty();
    $("#answer-3").empty();
    $("#answer-4").empty();
    // if the answer buttons were changed to highlight the answers, reset them.
    for (i = 1; i < 5; i++) {
      var answerId = "#answer-" + i;
      if ($(answerId).hasClass("correct-answer")) {
        $(answerId).removeClass("correct-answer");
      } else if ($(answerId).hasClass("incorrect-answer")) {
        $(answerId).removeClass("incorrect-answer");
      }
    }
    $("#timer-box").empty();
    resetGameTimer(5);
  });
});