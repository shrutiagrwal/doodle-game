function isRoomCodeCorrect(){
    let actual_code = 'aad';
    let code = document.getElementById('roomCode').value;
    console.log(code);

    if(code === actual_code)
        console.log("yess");
    else
        console.log("noo");
}


function randomStr(len, arr) { 
    var ans = ''; 
    for (var i = len; i > 0; i--) { 
        ans +=  
          arr[Math.floor(Math.random() * arr.length)]; 
    }

    return ans; 
}

function generate_room_code() {
    let r_code;
    r_code = randomStr(5, 'abcdefghijklmnopqrstuvwxyz1234567890');

    document.getElementById('new_room_code_div').style.display = 'block';
    document.getElementById('new_room_code').innerText = r_code;
    document.getElementById('room').value = r_code;

    console.log(r_code);
}

function randomWord()
{
    let rand_word;
    rand_word = easy_words[ [Math.floor(Math.random()*(easy_words.length))] ];

    return rand_word;
}
