"use client";
import { useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

export default function FloatingChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    [],
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/chat-bot`,
        "http://localhost:5000/api/v1/user/dashboard/chat-bot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: input }),
        },
      );

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setMessages((prev) => [...prev, { role: "bot", text: data.message }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[450px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-primary p-4 flex justify-between items-center text-white">
            <div>
              <h3 className="font-bold text-sm">AI Assistant</h3>
              <p className="text-xs opacity-80">Always active</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <p className="text-center text-gray-500 text-sm mt-10">
                Hi! How can I help you today?
              </p>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none italic text-xs flex items-center gap-2 text-gray-500">
                  <Loader2 className="animate-spin" size={14} /> AI is
                  thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-gray-50 dark:bg-gray-800 text-sm p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-primary text-white p-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
