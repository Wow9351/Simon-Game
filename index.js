var buttonColor = ["green","red","yellow","blue"];

var gamePattern = [];
var userPattern = [];

var started=false;
var level=0;

document.addEventListener("keypress",function(){
  if(!started)
  {
    started=true;
    sequence();
  }
});

function anim(className){
    $("#" + className).addClass("pressed");
    setTimeout(function(){
      $("#" + className).removeClass("pressed");
    },100);
}

function sequence() {

  $("#level-title").text("Level " + level);
  userPattern = [];
  level++;

  var ranNum=Math.floor(Math.random() * 4) ;
  anim(buttonColor[ranNum]);
  playSound(buttonColor[ranNum]);
  gamePattern.push(buttonColor[ranNum]);

}

  $(".btn").click(function(){
    var idOfButton = $(this).attr("id");
    anim(idOfButton);
    playSound(idOfButton);
    userPattern.push(idOfButton);

    checkAnswer(userPattern.length - 1);
  });

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userPattern[currentLevel])
  {
    console.log("success");

    setTimeout(function(){
      if(userPattern.length == gamePattern.length)
      {
        sequence();
      }
    },1500);

  }
  else
  {
    level=0;
    $("#level-title").text("Game Over, Press Any Key To Start");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);

    gamePattern = [];
    started=false;
  }
}

function playSound(idName){
  var sound= new Audio("sounds/" + idName + ".mp3");
  sound.play();
}
