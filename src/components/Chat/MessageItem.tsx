import React from "react";
import { ChatMessage } from "@/types/chat.types";
import TypingIndicator from "./TypingIndicator";
import { StockQuoteTable } from "./StockTable";

interface MessageItemProps {
  msg: ChatMessage;
  isDark: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ msg, isDark }) => {
  const isUser = msg.role === "user";
  return (
    <div className={`chat-advisor-message ${isUser ? "user" : "assistant"}`}>
      <div
        className={`chat-advisor-message-bubble ${
          isUser ? "user" : "assistant"
        } ${isDark && !isUser ? "dark" : ""}`}
      >
        {msg.text}
        {msg.loading && <TypingIndicator />}
        {!msg.loading && msg.quotes && <StockQuoteTable quotes={msg.quotes} />}
      </div>
    </div>
  );
};

export default MessageItem;
