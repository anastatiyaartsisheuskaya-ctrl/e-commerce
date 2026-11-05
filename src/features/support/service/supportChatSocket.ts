import { io } from "socket.io-client";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const serverOrigin = rawBaseUrl.replace(/\/api\/?$/, "");

const SOCKET_URL = `${serverOrigin}/support`;

export function createSupportSocket() {
  return io(SOCKET_URL, {
    transports: ["websocket"],
  });
}
