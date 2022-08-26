
var startQuizButton = document.getElementById("startbtn");

var StartQuiz = document.getElementById("startpage");

var buttonA = document.getElementById("a");

var buttonB = document.getElementById("b");

var buttonC = document.getElementById("c");

var buttonD = document.getElementById("d");

var quizbody = document.getElementById("question-container");

var questionEl = document.getElementById("question");

var QuizTimer = document.getElementById("timer");

var resultsEl = document.getElementById("result");

var finalscoreEl = document.getElementById("finalScore");

var gameoverdiv = document.getElementById("gameover");

var endGameBtns = document.getElementById("endGameBtns");

var submitScoreBtn = document.getElementById("submitScore");

var HighScoreContainer = document.getElementById("highscoreContainer");

var highscoreDiv = document.getElementById("high-scorePage");

var highscoreInputName = document.getElementById("initials");

var highscoreDisplayName = document.getElementById("highscore-initials");

var highscoreDisplayScore = document.getElementById("highscore-score");

// Quiz questions and answers
var QuizQuestions = [{
    question: "What is Javascript?",

    choiceA: " JavaScript is a compiled language used to make the website interactive",

    choiceB: " JavaScript is an assembly language used to make the website interactive",

    choiceC: " JavaScript is a scripting language used to make the website interactive",

    choiceD: "None of the mentioned",

    correctAnswer: "c"},

  {
    question: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",

    choiceA: "Window",

    choiceB: "Location",

    choiceC: "Standard",

    choiceD: "Position",

    correctAnswer: "a"},

   {
    question: "Which of the following can be used to call a JavaScript Code Snippet?",

    choiceA: "Preprocessor",

    choiceB: "Function/Method",

    choiceC: " Triggering Event",

    choiceD: "React.js",

    correctAnswer: "b"},

    {
    question: "Which of the following scoping type does JavaScript use?",

    choiceA: "Sequential",

    choiceB: "Segmental",

    choiceC: "Literal",

    choiceD: "Lexical",

    correctAnswer: "d"},

    {
    question: "When is localStorage data cleared?",

    choiceA: "No expiration time",

    choiceB: "On page reload",

    choiceC: "On browser close",

    choiceD: "On computer restart",

    correctAnswer: "a"},  

    {
    question: "Why event handlers is needed in JS?",

    choiceA: "Adds innerHTML page to the code",

    choiceB: "Change the server location",

    choiceC: "Allows JavaScript code to alter the behaviour of windows",

    choiceD: "Performs handling of exceptions and occurrences",

    correctAnswer: "c"},

    {
    question: "Which of the following is not an error in JavaScript?",

    choiceA: " Missing of Bracket",

    choiceB: " Division by zero",

    choiceC: " Syntax error",

    choiceD: " Missing of semicolons",

    correctAnswer: "b"},
        
    
    ];
// other variables
var score = 0;

var correct;

var TimeLeft = 76;

var TimerInterval;

var finalQuestionIndex = QuizQuestions.length;

var currentQuestionIndex = 0;

// This shows questions and generates the score after quiz is over.
function generateQuizQuestion(){
    gameoverdiv.style.display = "none";

    if (currentQuestionIndex === finalQuestionIndex){

        return showScore();

    } 

    var CurrentQuestion = QuizQuestions[currentQuestionIndex];

    questionEl.innerHTML = "<p>" + CurrentQuestion.question + "</p>";

    buttonA.innerHTML = CurrentQuestion.choiceA;

    buttonB.innerHTML = CurrentQuestion.choiceB;

    buttonC.innerHTML = CurrentQuestion.choiceC;

    buttonD.innerHTML = CurrentQuestion.choiceD;
};

// this starts quiz shows timer and shows questions
function startQuiz(){
    gameoverdiv.style.display = "none";

    StartQuiz.style.display = "none";

    generateQuizQuestion();

    //Timer
    TimerInterval = setInterval(function() {
        TimeLeft--;
        QuizTimer.textContent = "Time left: " + TimeLeft;
    
        if(TimeLeft === 0) {
          clearInterval(TimerInterval);
          showScore();
        }
      }, 1000);
    quizbody.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){

    quizbody.style.display = "none"
    
    gameoverdiv.style.display = "flex";
    
    clearInterval(TimerInterval);
    
    highscoreInputName.value = "";
    
    finalscoreEl.innerHTML = "You got " + score + " out of " + QuizQuestions.length + " correct!";
}

// saves initials and score in local storage when submit id clicked
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

        var CurrentUser = highscoreInputName.value.trim();

        var currentHighscore = {

            name : CurrentUser,
            score : score
        };
    
        gameoverdiv.style.display = "none";

        HighScoreContainer.style.display = "flex";

        highscoreDiv.style.display = "block";

        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);

        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));

        generateHighscores();

    }
    
});

// clears high score and will replace score with a new score from the local storage
function generateHighscores(){

    highscoreDisplayName.innerHTML = "";

    highscoreDisplayScore.innerHTML = "";

    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

    for (i=0; i<highscores.length; i++){

        var newNameSpan = document.createElement("li");

        var newScoreSpan = document.createElement("li");

        newNameSpan.textContent = highscores[i].name;

        newScoreSpan.textContent = highscores[i].score;

        highscoreDisplayName.appendChild(newNameSpan);

        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// shows highscore page while hiding other pages
function showHighscore(){

    StartQuiz.style.display = "none"

    gameoverdiv.style.display = "none";

    HighScoreContainer.style.display = "flex";

    highscoreDiv.style.display = "block";

    endGameBtns.style.display = "flex";

    generateHighscores();
}

// clears high score from local storage and name
function clearScore(){

    window.localStorage.clear();

    highscoreDisplayName.textContent = "";

    highscoreDisplayScore.textContent = "";
}

// resets all pages to replay quiz
function replayQuiz(){

    HighScoreContainer.style.display = "none";

    gameoverdiv.style.display = "none";

    StartQuiz.style.display = "flex";

    TimeLeft = 76;

    score = 0;
    currentQuestionIndex = 0;
}

// this helps check for the correct answer when chosen
function checkAnswer(answer){

    correct = QuizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;

        alert("That Is Correct!");

        currentQuestionIndex++;

        generateQuizQuestion();

    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){

        alert("That Is Incorrect.")

        currentQuestionIndex++;
        
        generateQuizQuestion();
    }else{
        showScore();
    }
}

// This button starts the quiz
startQuizButton.addEventListener("click",startQuiz);