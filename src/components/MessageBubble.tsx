import React from "react";
import BedrockLogo from "../assets/bedrock-color.svg";
import { Message } from "../types";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div
      className={`flex items-start space-x-3 ${
        message.type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.type === "bot" && (
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#2A2752] to-[#2C456D] rounded-full flex items-center justify-center">
          <img src={BedrockLogo} alt="Bedrock" className="w-7 h-7" />
        </div>
      )}

      <div
        className={`max-w-2xl px-4 py-3 rounded-2xl ${
          message.type === "user"
            ? "bg-gradient-to-r from-[#003594] to-blue-600 text-white ml-12"
            : "bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-10 text-white ml-12"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <span className="text-xs opacity-60 mt-2 block">
          {message.timestamp.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
