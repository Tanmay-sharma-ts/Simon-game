
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$("body").keypress(function(){
    if(level == 0){
        nextSequence();
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(currentLevel == gamePattern.length-1){
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key To Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over")
        }, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(input){
    var audio = new Audio("sounds/" + input + ".mp3");
    audio.play();
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() *4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}