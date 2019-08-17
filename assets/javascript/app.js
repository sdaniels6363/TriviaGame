function loadGameQuestions(){
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
  return triviaQuestions;
}

// Function
function selectQuestion(array) {
  // this function selects a question from the bank of questions

  // sets the games basic conditions.
  timerExpired = false;
  answerSelected = false;

  // indexNumber = 0; //maybe make random, but for testing will be static
  indexNumber = Math.floor(Math.random() * array.length); // this will select a random question.

  var question = array[indexNumber];
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
    counter = 60;
    // set timer on webpage
    $("#timer-box").html("<h3>Time Remaining: " + counter + "</h3>")

    // remove the selected question from the bank of questions.
    triviaQuestions.splice(indexNumber, 1);

    return question.correctAnswer;
  } else {
    score = (answeredCorrect / totalQuestions) * 100;
    $("#timer-box").html("<h4>No questions remain, you scored: " + score + "</h4>");
    // reset game
  }
}

function displayResult(counter, selectedAnswer, currentQuestionAnswer) {
  var resultTimer = setInterval(function () {
    counter--;
    if (counter <= 0) {
      clearInterval(resultTimer);
      $("#timer-box").empty();
    } else {
      if (currentQuestionAnswer === selectedAnswer) {
        $("#timer-box").html("<h3>Correct Choice</h3>");
      } else {
        $("#timer-box").html("<h3>Incorrect Choice</h3>");
      }
    }
  })
}


function newQuestionTimer(counter) {

  $("#timer-box").html("<h3>Next question in " + counter + " seconds!</h3>")
  var nextQuestionTimer = setInterval(function () {
    counter--;
    if (counter <= 0) {
      clearInterval(nextQuestionTimer);
      $("#timer-box").html("<h3>Next Question!</h3>")
      timerExpired = false; // set to false for next question.
      currentQuestionAnswer = selectQuestion(triviaQuestions);
      answerSelected = false; // resetting 
    } else {
      $("#timer-box").html("<h3>Next question in " + counter + " seconds!</h3>");
    }
  }, 1000);




  currentQuestionAnswer = selectQuestion(triviaQuestions); //once timer expires call next question.
}

$(document).ready(function () {

  // load questions
  triviaQuestions = loadGameQuestions();

  // score tracker
  totalQuestions = triviaQuestions.length;
  answeredCorrect = 0;


  // once the page is loaded a question is selected.
  currentQuestionAnswer = selectQuestion(triviaQuestions);

  var timerCountdown = setInterval(function () {
    counter--;
    if (counter <= 0) {
      clearInterval(timerCountdown);
      $("#timer-box").html("<h3>Time is up!</h3>")
      timerExpired = true;
      displayResult(3);
      newQuestionTimer(7);
    } else {
      $("#timer-box").html("<h3>Time Remaining: " + counter + "</h3>");
    }
  }, 1000);

  $(".answers").on("click", function () {
    if (answerSelected) {
      // prevents the user from changing the answer.
      console.log("Answer has already been selected.")
    } else {

      if (timerExpired) {
        alert("Time is up, cannot select an answer.")
      } else {
        var selectedAnswer = this.id;
        var selectedAnswerID = "#" + selectedAnswer;
        answerSelected = true;
        clearInterval(timerCountdown); // stop the countdown timer

        if (currentQuestionAnswer === selectedAnswer) {
          // if the user selects the correct answer do the following
          $(selectedAnswerID).addClass("correct-answer");
          // $("#timer-box").html("Correct!");
          // add timer for 3 seconds
          displayResult(3, selectedAnswer, currentQuestionAnswer);
          newQuestionTimer(7); // new question will be selected here.
          answeredCorrect = answeredCorrect+1;
  
        } else {
          // if the user is incorrect do the following.
          var correctAnswerId = "#" + currentQuestionAnswer;
          $(correctAnswerId).addClass("correct-answer");
          $(selectedAnswerID).addClass("incorrect-answer");
          // $("#timer-box").html("Incorrect!  The correct answer is in Green.");
          // add timer for 3 seconds
          displayResult(3, selectedAnswer, currentQuestionAnswer);
          newQuestionTimer(7); // new question will be selected here.
  
        }
        // // regardless of whether the answer is right or wrong, prep for next question
        // displayResult(3, selectedAnswer, currentQuestionAnswer);
        // newQuestionTimer(7); // new question will be selected here.
      }

    }

  });








});