const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const word = document.getElementById('word');
const result = document.getElementById('result');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

socket = io();
var choosed_word;

function randomWord() {
    let rand_word;
    rand_word = easy_words[[Math.floor(Math.random() * (easy_words.length))]];

    return rand_word;
}

// 
function getWord() {
    console.log("aa");
    choosed_word = randomWord();
    let mesg = `Your word : \'${choosed_word}\'`;
    result.innerText = '';

    socket.emit('wordTelling', mesg, choosed_word);
}


// JOin chatroom
socket.emit('joinRoom', { username, room });


// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});


// Message from server
socket.on('b_message', message => {
    /* console.log(message); */

    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});



// Message from server
socket.on('message', (arr, user) => {
    /* choosed_word = 'aaa'; */
    let isCorrect;

    if ((arr.msg).toLowerCase() == (arr.wordd).toLowerCase())
        isCorrect = true;
    else
        isCorrect = false;

    console.log(arr.msg, arr.wordd);
    console.log(isCorrect);

    outputguessedWord(arr.msg, isCorrect, user);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});


socket.on('clear_word_and_result', msg => {
    word.innerText = ' ';
});


socket.on('word_tell', msg => {
    word.innerText = msg;
    console.log(msg);
});




// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});





// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add('botMsg');

    div.innerHTML = ` <p class="meta"> ${message.username}</p>
    <p class="text">
        ${message.text}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
}



// Output message to DOM
function outputguessedWord(msg, isCorrect, user) {
    const div = document.createElement('div');
    div.classList.add('message');

    if (isCorrect)
        div.classList.add('correct');
    else
        div.classList.add('incorrect');


    /*  */
    div.innerHTML = ` 
    <p class="meta"> ${user.username}</p>
    <p class="text"> ${msg} </p>
    `;

    document.querySelector('.chat-messages').appendChild(div);

    if (isCorrect) {
        socket.emit('correctlyGuessed', user.username);
    }

}


// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}


// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li> ${user.username} </li>`).join('')}
    `;
}



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