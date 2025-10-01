import React from "react";

const TypingIndicator: React.FC = () => (
  <div className="chat-advisor-typing">
    <span className="chat-advisor-typing-text">typing</span>
    <div className="chat-advisor-typing-dots">
      <div className="chat-advisor-typing-dot" />
      <div className="chat-advisor-typing-dot" />
      <div className="chat-advisor-typing-dot" />
    </div>
  </div>
);

export default TypingIndicator;
