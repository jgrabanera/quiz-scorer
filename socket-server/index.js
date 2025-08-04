const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // for dev; restrict in production
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

// Listen for messages from Laravel
const PORT = 3001;
server.listen(PORT, () => console.log(`Socket.IO server on port ${PORT}`));

// You can later expose `io` so Laravel can POST to this server
module.exports.io = io;
