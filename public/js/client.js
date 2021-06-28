var socket = io();

const form = document.querySelector("#send-container");
const msg = document.querySelector("#msg");
const send = document.querySelector("#send");
const msg_container = document.querySelector("#msg-container");
const audio = new Audio("./mp3/message.mp3");

const append = (msg, position) => {
  const newMsg = document.createElement("div");
  const styleClassess = [
    "bg-white",
    "bg-opacity-90",
    "w-40",
    "text-black",
    "p-2",
    "rounded-lg",
    "clear-both",
    "mt-2",
  ];
  newMsg.className =
    "bg-white bg-opacity-90 w-40 text-black p-2 rounded-lg clear-both mt-2";
  newMsg.classList.add("float-" + position);
  newMsg.innerHTML = msg;
  msg_container.append(newMsg);
  if (position == "left") {
    audio.play();
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (msg.value) {
    socket.emit("send", msg.value);
    append(`<span class='font-semibold'>You:</span> ${msg.value}`, "right");
    msg.value = "";
  }
});

const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);
socket.on("user-joined", (name) => {
  append(`<span class='font-semibold'>${name}</span> joined the chat!`, "left");
});
socket.on("receive", (data) => {
  append(
    `<span class='font-semibold'>${data.name}:</span> ${data.message}`,
    "left"
  );
});
socket.on("left", (name) => {
  append(`<span class='font-semibold'>${name}</span> left!`, "left");
});
