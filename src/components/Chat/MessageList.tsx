import React, { useRef, useEffect } from "react";
import { ChatMessage } from "@/types/chat.types";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: ChatMessage[];
  isDark: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isDark }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-advisor-messages-container">
      <div
        className={`chat-advisor-messages chat-advisor-scrollbar ${
          isDark ? "dark" : ""
        }`}
      >
        <div className="chat-advisor-messages-inner">
          {messages.map((m) => (
            <MessageItem key={m.id} msg={m} isDark={isDark} />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default MessageList;
