const socket = io();

socket.emit("message", "mensaje enviado desde el cliente");

socket.on("server_message", (data) => {
  console.log(data);
});
