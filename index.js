var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userclickPattern=[];
var level=0;
var idx=0;
var gameOverFlag=false;

function nextSequence()
{
    var randomNumber=Math.floor(Math.random()*3+1);
    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);
    
    playSound(randomChoosenColor);

    level+=1;
    $("#level-title").html("Level: "+level);
    userclickPattern=[];
}


$(".btn").click(function(){
    if(level==0 && !gameOverFlag)
    {
        setTimeout(()=>{nextSequence();},100);
    }
    else if(level != 0)
    {
        
      
        var clickedId=$(this).attr("id");
        userclickPattern.push(clickedId);
        playSound(clickedId);
        clickAnimation(clickedId);
        idx=userclickPattern.length-1;
       
       
       

        if(idx <= level-1)
        {
            if(checkAnswer(idx))
            {
                if(idx== level-1)
                {
                    setTimeout(()=>{nextSequence();},1500);
                }              
            
            }
            else
            {
                $("#level-title").html("Game Over, Press any key to restart..");
                playSound("wrong");
                $("body").addClass("game-over");
                setTimeout(()=>{$("body").removeClass("game-over");},100);
                level=0;
                gamePattern=[];
                userclickPattern=[];
                idx=0;
                gameOverFlag=true;

            }
        }


    }
    else{
        window.location.reload();
    }

    
});

function clickAnimation(clicked)
{
    
    $("#"+clicked).addClass("pressed");
    setTimeout(function(){$("#"+clicked).removeClass("pressed");},100);
}

function playSound(clicked)
{
    var audio= new Audio("./sounds/"+clicked+".mp3");
    audio.play();
}

function checkAnswer(idx)
{
    var flag=true;
    for(var i=0;i<= idx;i++)
    {
        if(gamePattern[i] != userclickPattern[i]){
           flag=false;
           break;
            
        }
    }
    if(flag)
    {
        console.log("Success");
        console.log("gamePatter: "+gamePattern);
        console.log("userclickPattern"+userclickPattern);
        return true;
    }
    else
    {
        console.log("Failure");
        console.log("gamePatter: "+gamePattern);
        console.log("userclickPattern"+userclickPattern);
        return false;
    }
}
