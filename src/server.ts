import { Server, Server as SocketIOServer } from "socket.io";
import http from "http";
import { app } from "./app";
import { setupSocketServer } from "./utils/socket"; // if you have socket.ts
declare global {
  var io: Server;
}
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});

global.io = io; // ✅ this works now because of global.d.ts

setupSocketServer(io); // optional

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
