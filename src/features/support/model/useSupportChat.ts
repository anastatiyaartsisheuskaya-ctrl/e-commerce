import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";

import { createSupportSocket } from "../service/supportChatSocket";
import type { Message } from "./types";

export function useSupportChat() {
  const socketRef = useRef<Socket | null>(null);
  const isChatOpenRef = useRef(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const socketInstance = createSupportSocket();

    socketRef.current = socketInstance;

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      setIsConnected(false);
    });

    socketInstance.on("receiveMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);

      if (message.sender === "ai-bot" && !isChatOpenRef.current) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    return () => {
      socketInstance.disconnect();
      socketRef.current = null;
    };
  }, []);

  const sendMessage = (text: string) => {
    const trimmedText = text.trim();

    if (!trimmedText || !socketRef.current?.connected) return;

    const userMessage: Message = {
      sender: "user",
      text: trimmedText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    socketRef.current.emit("sendMessage", { text: trimmedText });
  };

  const setIsChatOpen = (isOpen: boolean) => {
    isChatOpenRef.current = isOpen;

    if (isOpen) {
      setUnreadCount(0);
    }
  };

  const clearUnreadCount = () => {
    setUnreadCount(0);
  };

  return {
    isConnected,
    messages,
    sendMessage,
    unreadCount,
    clearUnreadCount,
    setIsChatOpen,
  };
}
