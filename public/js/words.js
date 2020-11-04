const easy_words = [
'moon', 'fork', 'rain', 'duck', 'broom', 'purse', 'plant', 'bell','ant','flower', 'recycle'
,'password'
, 'watch'
, 'sleep'
, 'rainstorm'
, 'cheek'
, 'elephant'
, 'wallet'
, 'seed'
, 'birthday'
, 'toast'
, 'pilot'
, 'mattress'
,'page'
, 'tablespoon'
, 'ceiling fan'
, 'country'
, 'check'
, 'mirror'
, 'border'
, 'pain'
, 'fur'
, 'sticky note'
, 'page'
, 'headache'
, 'cough'
, 'water cycle'
, 'download'
, 'palace'];


const medium_words = [ 
'password'
, 'watch'
, 'sleep'
, 'rainstorm'
, 'cheek'
, 'elephant'
, 'wallet'
, 'seed'
, 'birthday'
, 'toast'
, 'pilot'
, 'mattress'
];


const difficult_words = [
'page'
, 'tablespoon'
, 'ceiling fan'
, 'country'
, 'check'
, 'mirror'
, 'border'
, 'pain'
, 'fur'
, 'sticky note'
, 'page'
, 'headache'
, 'cough'
, 'water cycle'
, 'download'
, 'palace'
];

/* 
module.exports = [
    easy_words,
    medium_words,
    difficult_words
] */

function isCorrectlyGuessed( guessed, actual_word){
    if(guessed === actual_word)
        return true;
    else
        return false;
}

function randomWord()
{
    let rand_word;
    if(round == 1)
        rand_word = easy_words[ [Math.floor(Math.random()*(easy_words.length))] ];
    else if(round==2)
        rand_word = medium_words[ [Math.floor(Math.random()*(medium_words.length))] ];
    else if(round==3)
        rand_word = difficult_words[ [Math.floor(Math.random()*(difficult_words.length))] ];
    else
        return 'error';

    return rand_word;
}

/* console.log(randomWord(1));
console.log(randomWord(2));
console.log(randomWord(3)); */

/* 
function playGame(round ) {
    var sec = 5;
    let word = randomWord(round);
    console.log(`Your word is ${word}`);
    let cnt = 0;
    
    function timerr() {
        document.getElementById("timer").innerHTML =  sec ;
        sec-=1;
        if(sec == 00)
        {
            sec = 5;
        }
            clearInterval(func); 
    }

    var func  = setInterval(timerr(), 1000);
    
} */
/* 
function startGame() {
    let round = 1;

    while( round<2)
    {
        playGame(round);
        round+= 1;
    }
    
}
 */

function startGame() {
    let word = randomWord(1);
    document.getElementById('word').innerText = `Your word is ${word}`;
    console.log(`Your word is ${word}`);
}


 