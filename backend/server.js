require('dotenv').config()
const express = require('express')
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');

const sign = require('./routes/sign')
const profile = require('./routes/profile')
const post = require('./routes/post')

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);


app.use('/sign', sign);
app.use('/profile', profile);
app.use('/post', post);
//---------------------------SOCKET.IO-----------------------------------------------//
var users={}
io.on('connect', (socket) => {
    socket.on('join', (data) => {
        users[data] = socket;
        io.emit("user_connected",data.username);
         console.log(socket.id)
       
    //   socket.join(user.room);
  
    //   socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    //   socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
    //   io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
    //   callback();
    });
  
    socket.on('sendMessage', (message) => {
    console.log(message)
      io.emit('messages', { user:message.username,text: message.message });
  
    //   callback();
    });
  
    socket.on('disconnect', () => {
    //   const user = removeUser(socket.id);
  
    //   if(user) {
    //     io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
    //     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    //   }
    })
  });
  server.listen(5000, ()=>{
    console.log(`server running`)
})
// app.listen(5000);