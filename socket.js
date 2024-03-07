const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
const jwt = require('jsonwebtoken');

io.use((socket, next) => {
  const token = socket.handshake.query.token; // Retrieve the JWT from the query parameters
  const secret = process.env.JWT_SECRET; // The secret key used to sign JWTs

  // Verify and decode the JWT
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      // JWT verification failed, reject the connection
      next(new Error("Authentication failed"));
    } else {
      // JWT verification succeeded, allow the connection
      // You can access the decoded user information or perform additional checks here
      socket.join(decoded);
      next();
    }
  });
});

const onConnection = (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });

  socket.on("notification:list", () => {
    console.log("notification:list");
  });
}

io.on("connection", onConnection);

module.exports.io = io;