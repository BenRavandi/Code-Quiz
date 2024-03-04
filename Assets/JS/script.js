
// Set global variable selectors
var countdownElement = document.querySelector("#time");
var introductionContainerElement = document.querySelector("#introduction");
var startQuizButtonElement = document.querySelector("#button__start-quiz");
var quizContainerElement = document.querySelector("#quiz");
var questionContainerElement = document.querySelector("#question");
var multipleChoiceContainerElement = document.querySelector("#multiple_choice");
var answerText = document.querySelector("#answer");
var doneContainerElement = document.querySelector("#done");
var scoreContainerElement = document.querySelector("#score");
var formElement = document.querySelector("#form");
var initialsInputElement = document.querySelector("#initials");
var scoresContainerElement = document.querySelector("#high-scores");
var highScoresContainerElement = document.querySelector("#high-scores-container");
var goBackButtonElement = document.querySelector("#button__go-back");
var clearScoresButtonElement = document.querySelector("#button__clear-high-scores");
var viewHighScoresLinkElement = document.querySelector("#view-high-scores");
var currentQuestionIndex = 0;
var timeRemaining = 75;

// Set local storage to store the key and the value of scores
var scoresArray;
if (localStorage.getItem("scores")) {
    scoresArray = JSON.parse(localStorage.getItem("scores"));
} else {
    scoresArray = [];
    localStorage.setItem("scores", JSON.stringify(scoresArray));
};

// Set an array for questions
var questionsArray = [
    {
        question: "Commonly used data types do not include:",
        multiple_choice: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question: "The condition in an if/else statement is enclosed with what?",
        multiple_choice: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "curly brackets",
    },
    {
        question: "Arrays in JavaScript can be used to store what?",
        multiple_choice: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above",
        ],
        answer: "all of the above",
    },
    {
        question:
            "String values must be enclosed within what when being assigned to variables?",
        multiple_choice: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes",
    },
    {
        question:
            "A very useful tool used during development and debugging for printing conent to the debugger is:",
        multiple_choice: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log",
    },
];


// Declare startQuize function
function startQuiz() {
    introductionContainerElement.classList.add("hidden");
    quizContainerElement.classList.remove("hidden");
    startTimer();
    renderQuestion();
}

// Add a click event on quiz button to execute its passed in function
startQuizButtonElement.addEventListener("click", startQuiz);

// Set timer for the quiz
function startTimer() {
    countdownElement.textContent = timeRemaining;
    var timeInterval = setInterval(function () {
        timeRemaining--;
        countdownElement.textContent = timeRemaining;
        // Acceptance Criteria: When all questions are answered or the timer reaches 0, then the game is over.
        if (timeRemaining === 0 || currentQuestionIndex === questionsArray.length) {
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}


// This function renders questions by showing questions & multiple choices on the page
function renderQuestion() {
    var currentQuestion = questionsArray[currentQuestionIndex];
    questionContainerElement.textContent = currentQuestion.question;

    // This clears the page preventing all multiple choices to be collapsed on one page
    multipleChoiceContainerElement.innerHTML = "";

    // Set a loop to go through multiple choices & create a button for each choice & append them
    for (var i = 0; i < currentQuestion.multiple_choice.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.textContent = currentQuestion.multiple_choice[i];
        multipleChoiceContainerElement.appendChild(choiceButton);

        // When a choice is clicked, it will take you to next question
        choiceButton.addEventListener("click", nextQuestion);
    }
};


function nextQuestion() {

    // Check to see if the question was answered correctly or not then show it on the page
    if (this.innerHTML === questionsArray[currentQuestionIndex].answer) {
        answerText.innerHTML = "<hr>" + "Correct!";
        timeRemaining;
    } else {
        answerText.innerHTML = "<hr>" + "Incorrect!";
        timeRemaining -= 12;
    }

    // When question is answered, another one will pop
    currentQuestionIndex++;

    // When all questions are answered or the timer reaches 0, then the game is over.
    if (timeRemaining === 0 || currentQuestionIndex === questionsArray.length) {
        endQuiz();
    } else {
        renderQuestion();
    }

};

// Make list element to be shown in view high scores
function makeLi(text) {
    var li = document.createElement("li");
    li.textContent = text;
    highScoresContainerElement.appendChild(li);
}

// When last question is answered, this function will execute
function endQuiz() {
    quizContainerElement.classList.add("hidden");
    doneContainerElement.classList.remove("hidden");
    scoreContainerElement.innerHTML = timeRemaining;
}

// This function submits our input
formElement.addEventListener("submit", function (event) {

    // Overrides default action from clearing up the data
    event.preventDefault();

    // Push user initial & list items to our array, store them in local storage
    // And Show them on the page
    scoresArray.push(initialsInputElement.value + ": " + timeRemaining);
    localStorage.setItem("scores", JSON.stringify(scoresArray));
    makeLi(initialsInputElement.value + ": " + timeRemaining);
    doneContainerElement.classList.add("hidden");
    scoresContainerElement.classList.remove("hidden");
});

// Set a loop to iterate through each element in scoresArray
// and pass in every score being recorded in makeLi function to be shown in View High Scores List 
for (var i = 0; i < scoresArray.length; i++) {
    makeLi(scoresArray[i]);
}

// Add a click event on a link to view high scores
viewHighScoresLinkElement.addEventListener("click", function () {
    scoresContainerElement.classList.remove("hidden");
    introductionContainerElement.classList.add("hidden");
    quizContainerElement.classList.add("hidden");
    doneContainerElement.classList.add("hidden");
});

// Add click event to Go Back 
goBackButtonElement.addEventListener("click", function () {
    location.reload();
});

// Add click event to Clear High Scores 
clearScoresButtonElement.addEventListener("click", function () {
    localStorage.clear();
    while (highScoresContainerElement.firstChild) {
        highScoresContainerElement.removeChild(
            highScoresContainerElement.firstChild
        );
    }
});


