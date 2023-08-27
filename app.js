let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let body = document.querySelector("body");  
let gameSq = [];
let usrSq = [];

//level up function ==> level up and change the h2 heading to current level
function levelup(){
    level++;
    h2.innerText = `level ${level}`;
}


//giving the radom button
let buttons = ["red" , "green" , "yellow" , "purple"];


//flash white to button && push into the gameSq
function RandomflashAndAddIntogameSq(){
    //get the random button
    let randBtn = buttons[Math.floor(Math.random() * 4)];
    let btn = document.querySelector(`.${randBtn}`);

    

    btn.classList.add("white");
    setTimeout(function(){
        btn.classList.remove("white");
    } , 500);

    //pushing the game sequance
    gameSq.push(btn.getAttribute("id"));
    console.log("blinked random button is" , gameSq);                 //only for console

}

//flash green while user click the buttons && push into the usrSq
function usrflashAndAddIntoUsrSq(btn){

    btn.classList.add("usrgreen");
    setTimeout(function(){
        btn.classList.remove("usrgreen");
    } , 500);

    //pushing into the usrSq
    usrSq.push(btn.getAttribute("id"));
    console.log("user clicked " , usrSq);       //only for console

}



function checkAns(ind){
    if(usrSq[ind] == gameSq[ind]){
        console.log("great you are doing well keep it up");
        if(usrSq.length == gameSq.length){
            //means new level 
            usrSq = [];
            levelup();
            RandomflashAndAddIntogameSq();
        }
    }
    else{
        h2.innerText = "game over buddy!";
        body.classList.add("fullRed");
        setTimeout(restart , 2  * 1000);
    }
}


//selecting all buttons for clicking
let btns = document.querySelectorAll(".btn");
//clicking buttons
for(b of btns){
    b.addEventListener("click",function(){
        if(started == false){
            alert("Please enter the Random key");
        }
        else{
        //for flash && add into the usrSq array
        usrflashAndAddIntoUsrSq(this);


        //now we want to see answer is write or wrong
        checkAns(usrSq.length - 1);
        }
    });
}



//game started
document.addEventListener("keypress" , function(){
    if(started == false){
        started = true;
        levelup();
        RandomflashAndAddIntogameSq();
    }
});

//for restarting game
function restart(){
    body.classList.remove("fullRed");
    h2.innerText = "Press Any key to start the game";
    gameSq = [];
    usrSq = [];
    started = false;
}