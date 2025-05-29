import React from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Message } from "../types";

interface ChatContainerProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  inputValue,
  setInputValue,
  isTyping,
  onSendMessage,
  messagesEndRef,
}) => {
  return (
    <div className="flex-1 flex items-center justify-center p-8 relative z-10">
      <div className="w-2/3 h-[70vh] max-w-5xl bg-black bg-opacity-30 backdrop-blur-sm border border-white border-opacity-20 rounded-2xl flex flex-col">
        <MessageList
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />

        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          isTyping={isTyping}
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
