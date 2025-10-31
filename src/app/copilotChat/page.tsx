"use client";

import { CopilotChat } from "@copilotkit/react-ui";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">
          🤖 Multi-Agent Assistant
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          User Management & Stock Analysis Powered by AI
        </p>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <CopilotChat
          labels={{
            title: "AI Assistant",
            initial: "Hello! I'm your multi-agent assistant. I can help you with:\n\n👤 **User Management**: View, update user profiles and balances\n📈 **Stock Analysis**: Get stock prices, suggestions, and comparisons\n\nWhat would you like to do today?",
          }}
          className="h-full"
        />
      </main>
    </div>
  );
}
