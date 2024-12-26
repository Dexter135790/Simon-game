var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function newSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  return randomNumber;
}

$(".btn").click(function (event) {
  useChosenColor = event.target.id;
  userClickedPattern.push(useChosenColor);
  playSound(useChosenColor);
  animatePress(useChosenColor);
  if (checkAnswer(userClickedPattern.length - 1)) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        newSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }, 200);
  }
});

$(document).on("keypress", function () {
  $("h1").text("Level 0");
  newSequence();
  started = true;
});

function checkAnswer(currentLevel) {
  for (var i = 0; i <= currentLevel; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      return false;
    }
  }
  return true;
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
