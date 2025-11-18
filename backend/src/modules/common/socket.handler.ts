import { Server as SocketIOServer, Socket } from "socket.io";

export const initializeSocket = (ioServer: SocketIOServer) => {
  console.log("Socket Handler Initialized.");

  ioServer.on("connection", (socket: Socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return {
    emitEvent: (eventName: string, data: any): void => {
      ioServer.emit(eventName, data);
    },
  };
};
