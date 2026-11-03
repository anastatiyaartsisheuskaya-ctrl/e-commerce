import { io } from "socket.io-client";

export function createSupportSocket() {
  return io("http://localhost:3000/support", {
    transports: ["websocket"],
  });
}
