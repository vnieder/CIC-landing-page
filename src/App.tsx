import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import ChatContainer from "./components/ChatContainer";
import Footer from "./components/Footer";
import { Message } from "./types";

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

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage: string): void => {
    setIsTyping(true);
    setTimeout(() => {
      const responses: string[] = [
        "The AWS Cloud Innovation Center at Pitt focuses on collaborative research and education in cloud computing, AI, and emerging technologies. We work with students, faculty, and industry partners to drive innovation.",
        "Our CIC offers hands-on learning experiences, industry partnerships, and access to cutting-edge AWS technologies. Students can work on real-world projects and gain valuable cloud computing skills.",
        "The Cloud Innovation Center provides resources for research in areas like machine learning, data analytics, IoT, and serverless computing. We also offer workshops and training programs.",
        "We collaborate with various departments across the university and external partners to tackle complex challenges using cloud technologies. Our goal is to prepare students for the future of technology.",
      ];

      const randomResponse: string =
        responses[Math.floor(Math.random() * responses.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "bot",
          content: randomResponse,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
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

      <Header />

      <ChatContainer
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        isTyping={isTyping}
        onSendMessage={sendMessage}
        messagesEndRef={messagesEndRef}
      />

      <Footer />
    </div>
  );
};

export default App;
