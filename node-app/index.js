const http = require("http");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const socketIO = require("socket.io");

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users=[{}];

//Socket.io
io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on(`joined`, ({user})=>{
    users[socket.id]=user;
    console.log(`${user} has joined `);
    socket.broadcast.emit('userJoined', { user:"Admin", message:`${users[socket.id]} has joined`});
    socket.emit('welcome', {user:"Admin", message:`Welcome to the chat, ${users[socket.id]}`});
  })

  socket.on('message',({message, id})=>{
      io.emit('sendMessage', {user:users[id], message, id})
    })
 
  socket.on('disconnect', ()=>{
    socket.broadcast.emit('leave',{user:"Admin", message:`${users[socket.id]} has left`});
    console.log('User left')
  })

});

//Middleware - Plugin
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/", (req, res)=>{
  res.send("Wellcome to chatting server");
});

server.listen(PORT, () => console.log(`Server Starts at http://localhost:${PORT}`));
