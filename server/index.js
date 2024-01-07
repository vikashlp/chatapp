const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const http = require("http");
const { Server } = require("socket.io");

//Middlware
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    target: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`The server is running on port:${PORT}`);
});
