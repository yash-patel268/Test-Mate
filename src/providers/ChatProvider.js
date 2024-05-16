import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const clearMessages = () => setMessages([]);
  const addMessage = (message) =>
    setMessages((prevMessages) => [...prevMessages, message]);

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
