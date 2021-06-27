var socket = io();

const form = document.querySelector("#send-container");
const msg = document.querySelector("#msg");
const send = document.querySelector("#send");

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   if (msg.value) {
//     socket.emit("send", msg.value);
//     msg.value = "";
//   }
// });

const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);
socket.on("user-joined", (name) => {
  console.log(name);
});
