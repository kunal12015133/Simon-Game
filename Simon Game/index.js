var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started = false;

function playAudio(clr)
{
    var par = 'sounds/sounds_'+clr+'.mp3';
    var ad =new Audio(par);
    ad.play();
}


function nextSequence(){
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    while(userClickedPattern.length!=0)
        userClickedPattern.pop();
    level++;
    
    $('h1').text('Level '+level);

    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColour);

}

$('.btn').click(function(){
    var userChosenColour= $(this).attr('id');
    
    $('#'+userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    ckeck(userClickedPattern.length-1);
});


function animatePress(currentColour){
    $('#'+currentColour).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColour).removeClass('pressed')
    },100);
}

function gameOver(){
    
    $("#level-title").text("Game Over , Press Any Key to Restart");
    level=0;
    started =false;
    $('body').addClass('game-over');
    setTimeout(function(){
        $('body').removeClass('game-over')
    },100);
    var ad=new Audio('sounds/sounds_wrong.mp3');
    ad.play();
}

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        while(gamePattern.length!=0)
            gamePattern.pop();
        nextSequence();
        started = true;
      }
    
})


function ckeck(colorIdx){
    console.log(colorIdx);
    if(colorIdx === gamePattern.length-1)
    {
        if(userClickedPattern[colorIdx]===gamePattern[colorIdx])
        {
            nextSequence();
        }
        else {
            gameOver();
        }


    }

    else if(userClickedPattern[colorIdx]!=gamePattern[colorIdx])
    {
        gameOver();
    }
    
}