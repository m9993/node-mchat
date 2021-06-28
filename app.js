const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");

const port = process.env.PORT || 3000;

//using public folder for direct access to views
app.use(express.static(path.join(__dirname, "public")));

const users = [];

//when new user connects
io.on("connection", (socket) => {
  //joins new user
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  //sended message will come here and broadcast
  socket.on("send", (msg) => {
    socket.broadcast.emit("receive", { message: msg, name: users[socket.id] });
  });

  //when a user disconnects
  socket.on("disconnect", (name) => {
    socket.broadcast.emit("left", users[socket.id]);
  });
});

server.listen(port, () => {
  console.log(`listening on: ${port}`);
});
