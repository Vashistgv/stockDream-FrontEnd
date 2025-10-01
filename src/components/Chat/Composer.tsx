import React, { useState } from "react";
import { Send } from "lucide-react";

interface ComposerProps {
  onSubmit: (txt: string) => void;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  isDark: boolean;
}

const Composer: React.FC<ComposerProps> = ({
  onSubmit,
  disabled,
  inputRef,
  isDark,
}) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    console.log("text", text);
    onSubmit(text.trim());
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`chat-advisor-composer ${isDark ? "dark" : ""}`}>
      <input
        type="text"
        placeholder="Ask Advisor..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        ref={inputRef as any}
        className={`chat-advisor-input ${isDark ? "dark" : ""}`}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled}
        aria-label="Send"
        className="chat-advisor-send-btn"
      >
        <Send className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Composer;
