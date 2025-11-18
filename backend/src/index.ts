import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { app } from "./app";
import { initDB } from "./database/db";
import { initializeSocket } from "./modules/common/socket.handler";

const PORT = process.env.PORT || 3000;

initDB();

const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const socket = initializeSocket(io);

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Socket.IO is active.`);
});
