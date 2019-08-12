
// Global Variables
var timerExpired = false;
var allQuestionsAnswered = false;
var counter = 60; //set for sixty seconds

var triviaQuestions = [
  // array to hold all of the questions
  {
    "questionNumber": 1,
    "question": "What is the name of Doc Brown's dog in Back To The Future?",
    "answers": ["Einstein", "Tesla", "Edison", "Bob"],
    "correctAnswer": "answer-1",
  }
];

// Functions
function selectQuestion(array) {
  // selects a question from the bank of questions

  indexNumber = 0; //maybe make random, but for testing will be static

  var question = array[indexNumber];
  $("#question").append("<h4>" + question.question + "</h4>")
  $("#answer-1").append("<h5>" + question.answers[0] + "</h5>")
  $("#answer-2").append("<h5>" + question.answers[1] + "</h5>")
  $("#answer-3").append("<h5>" + question.answers[2] + "</h5>")
  $("#answer-4").append("<h5>" + question.answers[3] + "</h5>")

  return question.correctAnswer;
}



$(document).ready(function () {

  // once the page is loaded a question is selected.
  var currentQuestionAnswer = selectQuestion(triviaQuestions);

  var timerCountdown = setInterval(function () {
    counter--;
    if (counter <= 0) {
      clearInterval(timerCountdown);
      $("#timer-msg").html("<h3>Time is up!</h3>")
      timerExpired = true;
    } else {
      $("#timer-msg").html("<h3>Time Remaining: "+counter+"</h3>");
    }
  }, 1000);




  $(".answers").on("click", function () {
    if (timerExpired) {
      alert("Time is up, cannot select an answer.")
    } else {
      var selectedAnswer = this.id;
      if (currentQuestionAnswer === selectedAnswer) {
        alert("You selected the correct answer!")
      } else {
        alert("You selected the incorrect answer.")
      }
    }
  });








});