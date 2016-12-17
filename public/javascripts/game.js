/**
 * Created by LuisZenaidoHernandez on 12/15/16.
 */
var x;
var score = 0;
function updateAttempts(a){
    document.getElementById('attempts').innerHTML = "Attempts: " + a;
}
function updateScore(a){

    document.getElementById('score1').innerHTML = "Chests Unlocked: " + a;
    document.getElementById('score').value = a;
}
function unlocked(){
    score+=1;
    updateScore(score);
    play();
}


function gameOver(){
    document.getElementById('try').style.visibility = 'hidden';

    document.getElementById('s').style.visibility = 'visible';
}

function play(){
    document.getElementById('start').style.visibility = 'hidden';
    x = new game();
    document.getElementById('try').style.visibility = 'visible';
    document.getElementById('lockarea').innerHTML = '';
    for (var i = 0; i < x.numkeys; i++){
        document.getElementById('lockarea').innerHTML += "<select class='lock'>" +
            "<option value='1'>1</option>" +
            "<option value='2'>2</option>" +
            "<option value='3'>3</option>"+
            "<option value='4'>4</option>"+
            "<option value='5'>5</option>"+
            "<option value='6'>6</option>"+
            "<option value='7'>7</option>"+
            "<option value='8'>8</option>"+
            "<option value='9'>9</option>" + "</select>";

    }
    updateScore(score);
    updateAttempts(x.attempts);
}
function game(){
    this.keycount = [0,0,0,0,0,0,0,0,0,0];
    this.numkeys = Math.floor(Math.random() * 5) + 1;
    this.attempts = 0;
    this.keys = [];
    if(this.numkeys == 1){
        this.attempts = 5;
    }else if(this.numkeys == 2){
        this.attempts = 4;
    }else if(this.numkeys > 2){
        this.attempts = 3;
    }
    this.chestsUnlocked = 0;
    for (var i = 0; i < this.numkeys; i++){
        var ran = Math.floor(Math.random() * 9) + 1 ;
        this.keys.push(ran);
        this.keycount[ran] += 1;

    }
    this.attempt = function () {
        var l = document.getElementsByClassName('lock');
        var gamewon = true;
        for(var i  = 0; i < this.numkeys; i++){
            if(this.keys[i] == l[i].options[l[i].selectedIndex].value ){
                if(this.keycount[this.keys[i]] == 1){
                    l[i].style.backgroundColor = 'purple';
                }else{
                    l[i].style.backgroundColor = 'blue';
                }
            }else if(this.keycount[parseInt(l[i].options[l[i].selectedIndex].innerHTML) - 1] > 0){
                l[i].style.backgroundColor = 'yellow';
                gamewon = false;
            }else{
                l[i].style.backgroundColor = 'red';
                gamewon = false;
            }
        }
        updateAttempts(--this.attempts);
        if(gamewon){
            unlocked();

        }

        if(this.attempts == 0){
            gameOver();
        }


    }
}
