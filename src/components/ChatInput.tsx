import React, { useRef } from "react";
import { Send } from "lucide-react";
import SuggestionButtons from "./SuggestionButtons";

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  isTyping: boolean;
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  isTyping,
  onSendMessage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (): void => {
    onSendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestionClick = (suggestion: string): void => {
    onSendMessage(suggestion);
  };

  return (
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

      <SuggestionButtons
        onSuggestionClick={handleSuggestionClick}
        isDisabled={isTyping}
      />
    </div>
  );
};

export default ChatInput;
