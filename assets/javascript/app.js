
var counter = 15;
var currentQuestion = 0;
var score = 0;
var lose = 0;
var timer;

function nextQuestion() {

    var gameOver = (quizQuestions.length - 1) === currentQuestion;

    if (gameOver) {
        displayResult();
    }

    else {
        currentQuestion++;
        loadQuestion();
    }
}

function timeUp() {
    clearInterval(timer);
    lose++;
    preloadImage("lose");
    setTimeout(nextQuestion, 4 * 1000);
}

function countDown() {
    counter--;
    $("#time").html("Time remaining: " + counter);

    if (counter === 0) {
        timeUp();
    }
}

function loadQuestion() {

    counter = 15;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; //
    const choices = quizQuestions[currentQuestion].choices; //
    $("#time").html("Time remaining: " + counter);
    $("#game").html(`
        <h4>${question}</h4>
    ${loadChoices(choices)}
    ${loadRemainingQuestions()}
    `);
}

function loadChoices(choices) {
    var result = '';

    for (var i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;

}

$(document).on("click", ".choice",function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr("data-answer");
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    
    if (correctAnswer === selectedAnswer){
        score++;
        preloadImage("win");
        setTimeout(nextQuestion, 4 * 1000);
    }
    else {
            lose++;
            preloadImage("lose");
            setTimeout(nextQuestion, 4 * 1000);
        }

})

function displayResult() {
    const result = `
    <p>You got ${score} out of ${quizQuestions.length} questions right</p>
    <button class="btn btn-primary" id="resetBtn">Restart Game?</button>
    `;
    $("#game").html(result);
}

$(document).on("click","#resetBtn", function(){
counter = 15;
currentQuestion = 0;
score = 0;
lose = 0;
timer = null;
loadQuestion();
})


function loadRemainingQuestions() {
    const remainingQuestions = quizQuestions.length - (currentQuestion + 1);
    const totalQuestions = quizQuestions.length;
    return `Questions Left ${remainingQuestions}/${totalQuestions}`;

}

function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;
}

function preloadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    if (status === "win"){
        $("#game").html
        (`<p class="preload-image">Congratulations! The Correct answer was <b>${correctAnswer}</b></p>
        <img src="${randomImage(winImg)}"/>
        `);}
    
    else {
    $("#game").html
    (`<p class="preload-image">Too Bad! The Correct answer was <b>${correctAnswer}</b></p>
    <img src="${randomImage(loseImg)}"/>`);}
}

$("#start").click(function(){
    $("#start").remove();
    $("#time").html(counter);
    loadQuestion();
});