var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var first = true;

var anscheck = false;

function nextSquence() {
  var n;
  n = Math.floor(Math.random() * 4);
  var randomChosenColour;
  randomChosenColour = buttonColours[n];
  animatePress(randomChosenColour);
  playsound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

$(".btn").on("click", function () {
  var userChosenColour;
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playsound(userChosenColour);
  while (userClickedPattern.length == gamePattern.length) {
    console.log("userClickedPattern", userClickedPattern);
    console.log("gamePattern.length", gamePattern.length);
    checkans();
    break;
  }
});

function playsound(name) {
  var obj = document.createElement("audio");
  obj.src = "./sounds/" + name + ".mp3";
  obj.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).fadeTo(100, 0.3, function () {
    $(this).fadeTo(500, 1.0);
  });
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function (event) {
  if (first) {
    first = false;
    $("h1").text("Level 0 ");
    nextSquence();
  } else {
    console.log(first);
  }
});

function checkans() {
  if (userClickedPattern.toString() == gamePattern.toString()) {
    anscheck = true;
    userClickedPattern = [];
    setTimeout(function () {
      nextSquence();
      console.log(userClickedPattern.length);
    }, 700);
  } else {
    anscheck = false;
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    console.log(anscheck);
    first = true;
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
  }
}
