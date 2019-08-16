
// Global Variables
var timerExpired = false;
var allQuestionsAnswered = false;
var answerSelected = false;

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

// Function
function selectQuestion(array) {
  // selects a question from the bank of questions

  // indexNumber = 0; //maybe make random, but for testing will be static
  indexNumber = Math.floor(Math.random() * array.length); // this will select a random question.

  var question = array[indexNumber];
  $("#question").append("<h4>" + question.question + "</h4>")
  $("#answer-1").append("<h5>" + question.answers[0] + "</h5>")
  $("#answer-2").append("<h5>" + question.answers[1] + "</h5>")
  $("#answer-3").append("<h5>" + question.answers[2] + "</h5>")
  $("#answer-4").append("<h5>" + question.answers[3] + "</h5>")

  // set timer in script
  counter = 60;
  // set timer on webpage
  $("#timer-box").html("<h3>Time Remaining:&nbsp;" + counter + "</h3>")

  // remove the selected question from the bank of questions.
  triviaQuestions.splice(indexNumber, 1);

  return question.correctAnswer;
}

function countdownTimer(count) {
  count--;
  if (count <= 0) {
    clearInterval(self);
    $("#timer-box").html("<h3>Time is up!</h3>")
    timerExpired = true;
  } else {
    $("#timer-box").html("<h3>Time Remaining: " + counter + "</h3>");
  }
}

function newQuestionTimer(counter){
  $("#timer-box").html("<h3>Next question in " + counter + " seconds!</h3>")
  var nextQuestionTimer = setInterval(function () {
    counter--;
    if (counter <= 0) {
      clearInterval(timerCountdown);
      $("#timer-box").html("<h3>Next Question!</h3>")
      timerExpired = true;
    } else {
      $("#timer-box").html("<h3>Next question in " + counter + " seconds!</h3>");
    }
  }, 1000);
  
}

$(document).ready(function () {

  // once the page is loaded a question is selected.
  var currentQuestionAnswer = selectQuestion(triviaQuestions);

  var timerCountdown = setInterval(function () {
    counter--;
    if (counter <= 0) {
      clearInterval(timerCountdown);
      $("#timer-box").html("<h3>Time is up!</h3>")
      timerExpired = true;
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
          countdownTimer(5);


        } else {
          // if the user is incorrect do the following.
          var questionID = "#" + currentQuestionAnswer;
          $(questionID).addClass("correct-answer");
          $(selectedAnswerID).addClass("incorrect-answer");
          countdownTimer(5);

        }
        // regardless of whether the answer is right or wrong, prep for next question
      }

    }

  });








});