const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
const { v4: uuid } = require("uuid");
const crypto = require("crypto");

const PORT = 6969;

const CORS_Config = {
  origin: "http://localhost:3000",
};

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
app.use(cors());

const availableUsers = [];

app.get("/", (req, res) => {
  console.log(req);
  res.json({ message: "some message is this" });
});

app.get("/meet", (req, res) => {
  const { id } = req.query;
  console.log(id);
  availableUsers.push(id);

  const roomJoinPass = crypto.randomUUID();
  const roomID = uuid();

  // room id and the match will be sent (not implemented)
  res.send({ match: findMatch(id), roomID, roomJoinPass });
});

app.get("/live_users", (req, res, next) => {
  res.send(availableUsers);
});

server.listen(PORT, () => {
  console.log("server started at port", PORT);
});

function findMatch(id) {
  if (availableUsers.length < 2) return null;

  const rand = (Math.random() * 10000) % availableUsers.length;

  // if same person found
  if (availableUsers.rand === id) return findMatch(id);

  // otherwise return other user
  return availableUsers[rand];
}

io.on("connection", (socket) => {
  socket.on("join-room", (roomID, userID) => {
    console.log("joined room");
    console.log(roomID, userID);
  });
});
