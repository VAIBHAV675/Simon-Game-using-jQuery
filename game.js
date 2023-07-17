let userClickedPattern=[];
let gamePattern=[];
let level=0;
let buttonColours=["red","blue","green","yellow"];
function startOver()
{
    level=0;
    gamePattern=[];
}
function animatePress(currentColour)
{
    let identity="#"+currentColour;
    $(identity).addClass("pressed");
    setTimeout(function ()
    {
        $(identity).removeClass("pressed");
    },100);
}
function playSound(name)
{
    let song="./sounds/"+name+".mp3";
    let audio=new Audio(song);
    audio.play();
}
function nextSequence() {
    level++;
    userClickedPattern=[];
    clickCounter=0;
    let write="Level "+level;
    $("h1").text(write);
    let randomNumber=Math.floor((Math.random()*4));
    let randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    let identity="#"+randomChosenColour;
    $(identity).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}
let clickCounter=0;
$(".btn").click(function (){
    clickCounter++;
    let userChosenColour=$(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    let index=userClickedPattern.length-1;
    checkAnswer(index);
    if(clickCounter==level)
    {
    setTimeout(nextSequence,1000);
    }
});
$(document).keydown(function(event){
    if(level===0)
    {
        nextSequence();
    }
})
function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("right");
    }
    else
    {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
