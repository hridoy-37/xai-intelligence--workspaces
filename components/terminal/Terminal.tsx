"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are Xai, an advanced intelligence workspace AI. Respond concisely and professionally about data analysis, insights, and intelligence synthesis. Keep responses under 100 words.`;

export default function Terminal() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Xai Intelligence Core initialized. Ask me about data synthesis, model architectures, or analytics pipelines.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "", // API key handled by Claude.ai
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 200,
          messages: [
            { role: "user", content: SYSTEM_PROMPT },
            ...messages
              .filter((m) => m.role === "user")
              .map((m) => ({ role: "user", content: m.content })),
            { role: "user", content: input.trim() },
          ],
        }),
      });

      const data = await response.json();
      
      if (data.content && data.content[0]) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.content[0].text,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      // Fallback to simulated responses
      const responses = [
        "Data ingestion pipeline optimized. Processing 2.4M records/second across distributed nodes.",
        "Anomaly detection model trained on 18 data sources. Confidence: 94.2%. 3 critical patterns identified.",
        "Strategic synthesis complete. Revenue correlation factor: 0.87. Recommended action: Scale segment A by 34%.",
        "Real-time analytics dashboard updated. 12 KPIs tracking nominal. Alert threshold: 2 deviations detected.",
        "Neural architecture deployed. 47 active models processing concurrent streams. Latency: 180ms avg.",
      ];
      
      const assistantMessage: Message = {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-sm font-mono text-zinc-500">xai-core-terminal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-green-500">ONLINE</span>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 scroll-smooth">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.role === "user"
                      ? "order-2"
                      : "order-1"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.role === "assistant" && (
                      <div className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-black text-xs">X</span>
                      </div>
                    )}
                    <span className="text-xs font-mono text-zinc-600">
                      {message.role === "user" ? "YOU" : "XAI"}
                    </span>
                    <span className="text-xs font-mono text-zinc-700">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div
                    className={`px-4 py-3 rounded-lg font-mono text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-indigo-500/20 border border-indigo-500/30 text-indigo-100"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-300"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">X</span>
              </div>
              <div className="flex gap-2 items-center bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-lg">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200" />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-zinc-800 bg-zinc-900 px-6 py-4"
        >
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query the intelligence core..."
              disabled={loading}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 rounded-lg font-bold text-sm transition-all hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Execute"}
            </button>
          </div>
          <p className="text-xs text-zinc-600 font-mono mt-3">
            Press Enter to submit • Powered by Claude Sonnet 4
          </p>
        </form>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
    </div>
  );
}
