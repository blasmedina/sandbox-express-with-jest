const { Server } = require("socket.io");

module.exports = Object.freeze({
  listen: (httpServer) => {
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      // console.log("connected:", socket.client.id);
      socket.on("serverEvent", (data) => {
        // console.log("serverEvent", data);
        socket.emit("clientEvent", "bien, ¿y tu?");
      });
    });

    return io;
  },
});
