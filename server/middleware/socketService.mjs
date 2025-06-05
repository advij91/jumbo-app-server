import { Server } from "socket.io";

let io;

export const setupSocketIO = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Adjust this to your client's origin
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);
  
    // Listen for the client to request joining their room
    socket.on("join-user-room", (userContact) => {
      if (userContact) {
        socket.join(`user_${userContact}`);
        console.log(`User ${userContact} joined room user_${userContact}`);
      }
    });
  
    socket.on("disconnect", () => {
      console.log("A client disconnected:", socket.id);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO is not initialized. Call setupSocketIO first.");
  }
  return io;
};