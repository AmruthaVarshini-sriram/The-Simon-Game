var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenPattern = [];
var level ;
var started = false;

var userChosenColor;

//Game Flow

$(document).keydown(function() {
  if (!started) { level=0; nextSequence();}
  started = true;
});

  $(".btn").click(function() {
    userChosenColor = $(this).attr("id");
    userChosenPattern.push(userChosenColor);
    makeSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userChosenPattern.length - 1);
  })




function nextSequence() {
  level += 1;
  userChosenPattern=[];
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColor);


  makeSound(randomChosenColor);

}

function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userChosenPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userChosenPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
      makeSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over! Press any Key to Start Again");
      started=false;
      gamePattern=[];
    console.log("wrong");

  }

}

function makeSound(buttonID) {
  var audio = new Audio("sounds/" + buttonID + ".mp3");
  audio.play();
}

function animatePress(btnClass) {
  var activeButton = $("." + userChosenColor);

  activeButton.addClass("pressed");
  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);
}
