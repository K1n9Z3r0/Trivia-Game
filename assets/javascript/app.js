
var counter = 30;
var currentQuestion = 0;
var score = 0;
var timer;

function loadQuestion() {
    const question = quizQuestions[currentQuestion].question; //
    const choices = quizQuestions[currentQuestion].choices; //
    $("#time").html("time remaining: " + counter);
    $("#game").html(
        '<p>' + question + '</p>');
    $(loadChoices(choices));
}

    function loadChoices(choices) {
        var result = '';

        for (let index = 0; index < choices.length; index++) {
            result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
            
            return result;
        }
    }
    $("#game").html("<p>crap</p>");

loadQuestion();