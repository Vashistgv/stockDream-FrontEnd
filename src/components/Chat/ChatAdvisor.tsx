"use client";
import React, { useState, useEffect, useRef } from "react";

import { MessageCircle } from "lucide-react";
import { useTheme } from "next-themes";
import "./chatAdvisor.css";
import { ChatMessage } from "@/types/chat.types";

import API from "@/utils/API";
import { useAuth } from "@/contexts/AuthContext";
import Header from "./chatHeader";

import MessageList from "./MessageList";
import Composer from "./Composer";
import { GroupWithQuotes } from "@/types";

import { toast } from "sonner";

const SAMPLE_SYSTEM: ChatMessage = {
  id: "s-1",
  role: "system",
  text: "I am your Stock Advisor — I can answer questions about your groups, portfolio, and the Profile Details.",
};

interface Props {
  groups: GroupWithQuotes[];
  activeGroup: GroupWithQuotes;
}

/* ---------------------- ChatAdvisor (main) ---------------------- */
const ChatAdvisor = ({ groups, activeGroup }: Props) => {
  const [messages, setMessages] = useState<ChatMessage[]>([SAMPLE_SYSTEM]);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).slice(2, 9));
  const [groupId, setGroupId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  // ref to focus input when chat opens
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sendMessage = async (text: string) => {
    console.log("groupid", groupId, text);
    if (groupId) {
      try {
        const userMsg: ChatMessage = {
          id: `u-${Date.now()}`,
          role: "user",
          text,
          createdAt: new Date().toISOString(),
        };
        setMessages((m) => [...m, userMsg]);

        const assistantPlaceholder: ChatMessage = {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: "",
          loading: true,
        };
        setMessages((m) => [...m, assistantPlaceholder]);
        setLoading(true);
        let payload = {
          userId: user?._id,
          groupId: groupId,
          question: text,
        };
        const res = await API.post(
          `/chatbot/message`,
          payload,

          {
            timeout: 70000, // Response timeout
            signal: AbortSignal.timeout(70000), // Connection timeout (Node.js 17.3+)
          }
        );

        const data = res.data;
        console.log("data", data);
        const reply = data?.result;
        ("Sorry, I couldn't generate an answer right now.");
        const quotes = data.quotes;

        setMessages((m) =>
          m.map((it) =>
            it.id === assistantPlaceholder.id
              ? { ...it, text: reply, loading: false, quotes }
              : it
          )
        );
      } catch (err: any) {
        setMessages((m) =>
          m.map((it) =>
            it.id.startsWith("a-")
              ? { ...it, text: `Error: ${err.message}`, loading: false }
              : it
          )
        );
      } finally {
        setLoading(false);
      }
    } else {
      toast("Group not selected", {
        description: `Select a group`,
        duration: 5000,
      });
    }
  };

  return (
    <div className="chat-advisor-container">
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className="chat-advisor-fab"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {open && (
        <div className={`chat-advisor-window ${isDark ? "dark" : ""}`}>
          <Header
            onClose={() => setOpen(false)}
            isDark={isDark}
            groups={groups}
            activeGroup={activeGroup}
            onGroupSelected={(id) => setGroupId(id)}
          />

          <div className="chat-advisor-content">
            <MessageList messages={messages} isDark={isDark} />
            <Composer
              onSubmit={sendMessage}
              disabled={loading}
              inputRef={inputRef}
              isDark={isDark}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAdvisor;
