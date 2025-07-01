import http from "http";
import app from "./app.mjs";
import { setupSocketIO } from "./middleware/socketService.mjs";

const PORT = process.env.PORT || 5000;

// Create the HTTP server
const server = http.createServer(app);

// Setup Socket.IO
setupSocketIO(server);

// Start the server
// Make sure you listen on 0.0.0.0, not just localhost
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});