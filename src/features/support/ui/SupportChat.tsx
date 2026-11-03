import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { Headset, MessageCircle, Send, Wifi } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Badge } from "@/shared/components/ui/badge";

import { useSupportChat } from "../model/useSupportChat";

export function SupportChat() {
  const {
    isConnected,
    messages,
    sendMessage,
    unreadCount,
    clearUnreadCount,
    setIsChatOpen,
  } = useSupportChat();

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleToggleChat = () => {
    if (!isOpen) {
      clearUnreadCount();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "instant",
    });
  }, [messages, isOpen]);

  const handleSend = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = input.trim();

    if (!text || !isConnected) return;

    sendMessage(text);
    setInput("");
  };

  const canSend = input.trim().length > 0 && isConnected;

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setIsOpen(true);
          handleToggleChat();
          setIsChatOpen(true);
        }}
        className="fixed bottom-6 right-6 z-50 h-14 rounded-full px-5 shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="size-5" />
        <span>Chat with us</span>
        {unreadCount > 0 && (
          <Badge
            variant="default"
            className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-6 min-w-6 items-center justify-center rounded-full px-1 py-0 text-[12px] animate-badge-pop"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          setIsChatOpen(open);
        }}
      >
        <DialogContent className="flex h-[min(680px,calc(100dvh-2rem))] w-[calc(100vw-2rem)] max-w-none flex-col gap-0 overflow-hidden rounded-2xl border bg-card p-0 shadow-2xl sm:w-105">
          <DialogHeader className="flex-row items-center gap-3 border-b bg-card p-5 text-left">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Headset className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <DialogTitle className="text-base font-semibold">
                Customer Support
              </DialogTitle>

              <DialogDescription className="mt-1 flex items-center gap-2 text-xs">
                <span
                  className={`size-2 rounded-full ${
                    isConnected ? "bg-primary" : "bg-destructive"
                  }`}
                />
                {isConnected ? "Connected" : "Disconnected"}
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto bg-muted/30 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageCircle className="size-8" />
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                  Hello there!
                </h3>

                <p className="mt-2 max-w-60 text-sm text-muted-foreground">
                  Have a question? Send us a message and we'll be happy to help.
                </p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isUser = msg.sender === "user";

                return (
                  <div
                    key={`${msg.sender}-${index}`}
                    className={`flex items-end gap-2 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Headset className="size-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-sm ${
                        isUser
                          ? "rounded-br-sm bg-primary text-primary-foreground"
                          : "rounded-bl-sm border bg-card text-card-foreground"
                      }`}
                    >
                      <p
                        className={`mb-1 text-[11px] font-medium ${
                          isUser
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {isUser ? "You" : "Support"}
                      </p>

                      <p className="wrap-break-word whitespace-pre-wrap text-sm">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                );
              })
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t bg-card p-4">
            {!isConnected && (
              <p className="mb-2 flex items-center gap-2 text-xs text-destructive">
                <Wifi className="size-3.5" />
                Waiting for connection...
              </p>
            )}

            <form onSubmit={handleSend} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Write a message..."
                disabled={!isConnected}
                autoComplete="off"
                className="h-11 rounded-xl bg-muted/40"
              />

              <Button
                type="submit"
                size="icon"
                disabled={!canSend}
                aria-label="Send message"
                className="size-11 shrink-0 rounded-xl"
              >
                <Send className="size-4" />
              </Button>
            </form>

            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Press Enter to send
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
