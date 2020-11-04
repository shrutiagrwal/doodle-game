const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers, users: all } = require('./utils/users');
const { fstat } = require('fs');
const fs = require('fs');
const users = require('./utils/users');
const words = require('./utils/word')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
const botName = 'Doodle Bot';


//io.emit => all clients
// socket.emit => single client
// socket.broadcast.emit => all clients except itself


// run when client connects
io.on('connection', socket => {


    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // Welcome current user
        socket.emit('b_message', formatMessage(botName, 'Welcome to Scribble!'));

        // Broadcast when a user connects
        socket.broadcast.to(user.room)
            .emit('b_message', formatMessage(botName, `${user.username} joined!`));

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    });

    socket.on('correctlyGuessed', (usrName) => {
        console.log('pp', usrName);
        console.log("aa");
        const user = getCurrentUser(socket.id);
        console.log(user);
        socket.to(user.room).emit('b_message', formatMessage(botName, `The word was guessed correctly by ${usrName}`));
    });


    // Listen for chat Message
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        // var tmpp = JSON.parse(fs.readFileSync(word_path));
        // var wordd = tmpp[0][user.room];

        let wordd = words[user.room];
        var arr = {
            msg,
            wordd
        }

        console.log(socket.id);
        console.log(user.room);
        console.log(arr);
        io.to(user.room).emit('message', arr, user);
    });


    socket.on('wordTelling', (msg, wordd) => {
        const user = getCurrentUser(socket.id);
        // var words = JSON.parse(fs.readFileSync(word_path));
        // console.log(words);
        console.log(user)
        io.to(user.room).emit('clear_word_and_result', '');
        io.to(socket.id).emit('word_tell', msg);

        console.log(wordd);

        words[user.room] = wordd;
        // fs.writeFileSync(word_path, JSON.stringify(words, null, 2));

        io.to(user.room).emit('b_message', formatMessage(botName, `${user.username} is drawing`));
    });


    // Drawing 
    // recieves positions of canvas from client
    socket.on('positions', data => {
        // console.log("dd ")
        //sends positions of canvas to all other clients
        const user = getCurrentUser(socket.id);
        // console.log(user)
        // console.log(all)
        socket.to(user.room).broadcast.emit('positions', data)
    })


    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room)
                .emit('b_message', formatMessage(botName, `${user.username} has left`));

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }

    });

})


const PORT = 4000 || process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});