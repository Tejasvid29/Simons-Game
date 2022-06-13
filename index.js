
var buttonColors= ["red", "blue", "green", "yellow"]

var gamePattern= []

var userClickedPattern;

var level= 0;

var started = false;

function nextSequence() {

    level++;
  $("#level-title").text("Level " + level);

  userClickedPattern = [];

 var randomNumber = Math.floor(Math.random()*4) ;

 var randomChosenColor= buttonColors[randomNumber];

 gamePattern.push(randomChosenColor);

 $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
 
 playSound(randomChosenColor);


}
$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
  })
  

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}  
function animatePress(currentColor) {  
    
    $(currentColor).addClass("pressed");

    setTimeout(function () { 
        $(currentColor).removeClass("pressed");
     }, 100)
}
$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
    
 function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        var audio= new Audio("sounds/wrong.mp3")
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        $(document).click(startOver)
      }
 } 
function startOver() { 
    gamePattern= [];
    level= 0;
    started= false;
 }