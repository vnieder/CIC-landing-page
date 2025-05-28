import React from "react";
import BedrockLogo from "../assets/bedrock-color.svg";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start space-x-3 justify-start">
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#2A2752] to-[#2C456D] rounded-full flex items-center justify-center">
        <img src={BedrockLogo} alt="Bedrock" className="w-7 h-7" />
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
  );
};

export default TypingIndicator;
