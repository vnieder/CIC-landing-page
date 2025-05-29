import VideoBackground from "./components/VideoBackground";
import Header from "./components/Header";
import ChatContainer from "./components/ChatContainer";
import Footer from "./components/Footer";
import { useChat } from "./hooks/useChat";

const App: React.FC = () => {
  const chat = useChat();
  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <VideoBackground src="/pitt-campus.mp4" />
      <Header />
      <ChatContainer
        messages={chat.messages}
        inputValue={chat.inputValue}
        setInputValue={chat.setInputValue}
        isTyping={chat.isTyping}
        onSendMessage={chat.sendMessage}
        messagesEndRef={chat.messagesEndRef}
      />
      <Footer />
    </div>
  );
};

export default App;
