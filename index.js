var btncol=["green","red","blue","yellow"];
var gamePattern=[];
var userPattern=[];

//start the game
var started=false;
var level=0;

$(document).keypress(function(){
  if(!started){
    nextSeq();
    started=true;
  }
});

//game pattern
function nextSeq(){
  userPattern=[];
  level++;
  $("h1").text("Level "+ level);

  var randNum=Math.floor(Math.random()*4);
  var randCol=btncol[randNum];
  gamePattern.push(randCol);

  $("#"+randCol).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //flash effect

  playSound(randCol);
}

// event listeners to buttons
$(".btn").click(function(){
    var userCol=$(this).attr("id");
    userPattern.push(userCol);
    playSound(userCol);
    animatePress(userCol);

    checkanswer(userPattern.length-1);
});

function checkanswer(index){
  if(userPattern[index] === gamePattern[index])
  {
    if( userPattern.length===gamePattern.length)
    {
        setTimeout(function(){
        nextSeq();
        },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Press Any Key to Restart");  // "#"+level-title is wrong as level-title is not a var

      setTimeout(function () {
       $("body").removeClass("game-over");
      }, 200);
     startOver();
  }
}

function playSound(name){
var colSrc="sounds/"+name+".mp3";
var audio=new Audio(colSrc);
audio.play();
}

function animatePress(currCol){
  $("#"+currCol).addClass("pressed");
  setTimeout(function(){
  $("#"+currCol).removeClass("pressed");
  },100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
