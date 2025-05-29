import { useState, useRef, useEffect } from "react";
import { Message } from "../types";
import { getBotReply } from "../services/api";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Hi! I'm the University of Pittsburgh Cloud Innovation Center assistant, powered by AWS. I can help you learn about our current projects, industry partnerships, and student opportunities. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const botResponse = async (userMessage: string) => {
    setIsTyping(true);
    try {
      const botReply = await getBotReply(userMessage);
      setMessages((m) => [
        ...m,
        {
          id: Date.now(),
          type: "bot",
          content: botReply,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: Date.now(),
          type: "bot",
          content:
            "I apologize, but I'm experiencing technical difficulties right now. Please try again in a moment.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    setMessages((m) => [
      ...m,
      { id: Date.now(), type: "user", content: text, timestamp: new Date() },
    ]);
    botResponse(text);
    setInputValue("");
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    messagesEndRef,
    sendMessage,
  };
}
