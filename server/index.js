const server = require("http").createServer();
const PORT = process.env.PORT || 3000;
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:8080", //this is the port of the react frontend
    },
});

//middleware checking the socket and trying to extract the username appendend in the frontend. If no username, it will throw an error and pass it to next (why?). Otherwise it will set a username on the socket and proceed to next.

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});

//server connection establishing, giving a socket and checking for the other connected sockets
io.on("connection", (socket) => {
    // fetch existing users
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: socket.username,
        });
    }
    socket.emit("users", users);

    // notify existing users
    socket.broadcast.emit("user connected", {
        userID: socket.id,
        username: socket.username,
    });

    // forward the private message to the right recipient
    socket.on("private message", ({ content, to }) => {
        socket.to(to).emit("private message", {
            content,
            from: socket.id,
        });
    });

    // notify users upon disconnection
    socket.on("disconnect", () => {
        socket.broadcast.emit("user disconnected", socket.id);
    });
});

server.listen(PORT, () =>
    console.log(`server listening at http://localhost:${PORT}`)
);