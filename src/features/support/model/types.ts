export interface Message {
  sender: "user" | "ai-bot";
  text: string;
  timestamp: string;
}
