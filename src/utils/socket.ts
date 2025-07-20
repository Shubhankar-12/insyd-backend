import { Server } from "socket.io";

const onlineUsers = new Map<string, string>(); // userId -> socketId
declare global {
  var io: Server;
}
function setupSocketServer(io: Server) {
  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("register", (userId: string) => {
      console.log(`📌 Registered ${userId} with socket ${socket.id}`);
      onlineUsers.set(userId, socket.id);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`❌ Disconnected ${userId}`);
          break;
        }
      }
    });
  });
}

export { setupSocketServer, onlineUsers };
