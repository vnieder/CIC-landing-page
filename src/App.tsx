import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  HelpCircle,
  Folder,
  Briefcase,
  Handshake,
  LucideIcon,
} from "lucide-react";
import BedrockLogo from "./assets/bedrock-color.svg";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBotReply } from "./api";

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

interface Suggestion {
  text: string;
  icon: LucideIcon;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Hi! I'm the University of Pittsburgh Cloud Innovation Center assistant, powered by AWS. I can help you learn about our current projects, industry partnerships, and student opportunities. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = async (userMessage: string): Promise<void> => {
    setIsTyping(true);

    try {
      // Call the Bedrock API
      const botReply = await getBotReply(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "bot",
          content: botReply,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error calling Bedrock API:", error);

      // Fallback to a generic error message
      setMessages((prev) => [
        ...prev,
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

  const sendMessage = (messageText: string): void => {
    if (!messageText.trim() || isTyping) return;

    const newMessage: Message = {
      id: Date.now(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    simulateBotResponse(messageText);
    setInputValue("");
  };

  const handleSubmit = (): void => {
    sendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestionClick = (suggestion: string): void => {
    sendMessage(suggestion);
  };

  const suggestions: Suggestion[] = [
    {
      text: "What is the Cloud Innovation Center",
      icon: HelpCircle,
    },
    { text: "Current projects", icon: Folder },
    { text: "Internship opportunities", icon: Briefcase },
    { text: "Industry partnerships", icon: Handshake },
  ];

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      {/* VIDEO BACKGROUND */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/pitt-campus.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* HEADER */}
      <header className="relative min-h-[10vh] bg-[#003594] opacity-90 top-0 left-0 w-full flex items-center justify-between z-10 p-4 text-white">
        <a
          href="https://pitt.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center ml-8 cursor-pointer"
        >
          <img
            src="/image.png"
            alt="University of Pittsburgh Logo"
            className="h-16"
          />
        </a>
        <a
          href="https://www.technology.pitt.edu/about/AWS-CIC"
          className="text-bold text-xl mr-8"
        >
          AWS Cloud Innovation Center
        </a>
      </header>

      {/* MAIN CONTENT AREA - CENTERED MODAL */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-2/3 h-[70vh] max-w-5xl bg-black bg-opacity-30 backdrop-blur-sm border border-white border-opacity-20 rounded-2xl flex flex-col">
          {/* CHAT MESSAGES AREA */}
          <div className="flex-1 overflow-hidden pt-3">
            <div className="h-full overflow-y-auto p-6 space-y-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.type === "bot" && (
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#2A2752] to-[#2C456D] rounded-full flex items-center justify-center">
                        <img
                          src={BedrockLogo}
                          alt="Bedrock"
                          className="w-7 h-7"
                        />
                      </div>
                    )}

                    <div
                      className={`max-w-2xl px-4 py-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-[#003594] to-blue-600 text-white ml-12"
                          : "bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-10 text-white ml-12"
                      }`}
                    >
                      <div className="prose prose-invert text-sm leading-relaxed">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </div>

                      <span className="text-xs opacity-60 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start space-x-3 justify-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#2A2752] to-[#2C456D] rounded-full flex items-center justify-center">
                      <img
                        src={BedrockLogo}
                        alt="Bedrock"
                        className="w-7 h-7"
                      />
                    </div>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm text-white border border-white border-opacity-20 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>

          {/* INPUT AREA */}
          <div className="border-t border-white border-opacity-20 p-6">
            <div className="flex space-x-3 mb-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything about the Cloud Innovation Center..."
                className="flex-1 px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-gray-300 rounded-2xl border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-opacity-20 transition-all"
                disabled={isTyping}
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!inputValue.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-[#003594] to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>

            {/* SUGGESTION BUTTONS */}
            <div className="flex justify-center flex-wrap gap-2">
              {suggestions.map((suggestion, index) => {
                const IconComponent = suggestion.icon;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    disabled={isTyping}
                    className="flex items-center justify-center space-x-2 px-4 py-3 text-sm bg-white bg-opacity-10 backdrop-blur-sm text-blue-200 rounded-2xl hover:bg-opacity-20 transition-all border border-white border-opacity-10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{suggestion.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative bottom-4 w-full text-center z-10 text-white">
        <p className="text-sm">Website made by Vincent Niedermayer</p>
      </footer>
    </div>
  );
};

export default App;
