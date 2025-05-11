import http from "http";
import app from "./app.mjs";
import { setupSocketIO } from "./middleware/socketService.mjs";

const PORT = process.env.PORT || 5000;

// Create the HTTP server
const server = http.createServer(app);

// Setup Socket.IO
setupSocketIO(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});