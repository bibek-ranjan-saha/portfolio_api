const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectTODB = require('./db');


connectTODB();


//SOCKET Setup
const server = require("http").createServer(app);
const io = require("socket.io")(server,{
    cors : {
        origin : "*"
    },
});

const bodyParser = require("body-parser");
const SocketRouter = require("./sockerRouter")(io);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(SocketRouter);

io.on("connection",(socket) => {
    console.log(`connect with ${socket.id}`);
})

server.listen(port, () => {
    console.log(`connected now enjoy ${port}`);
});


