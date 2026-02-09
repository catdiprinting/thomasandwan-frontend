import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Plus, Bot, User, Copy, Check } from "lucide-react";
import PageShell from "@/components/PageShell";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function MarkdownContent({ content }: { content: string }) {
  const formatted = content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm my-2"><code>$1</code></pre>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm">$1</code>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
    .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
    .replace(/\n\n/g, "</p><p class='mb-3'>")
    .replace(/\n/g, "<br>");

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: `<p class='mb-3'>${formatted}</p>` }}
    />
  );
}

export default function ContentAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const createThread = async () => {
    const res = await fetch("/api/assistant/thread", { method: "POST" });
    const data = await res.json();
    return data.threadId;
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      let currentThreadId = threadId;
      if (!currentThreadId) {
        currentThreadId = await createThread();
        setThreadId(currentThreadId);
      }

      const res = await fetch("/api/assistant/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId: currentThreadId, message: userMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.error || "Something went wrong"}` },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Could not connect to the assistant. Please try again." },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setThreadId(null);
    setInput("");
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = [
    "Write a blog post about the statute of limitations for medical malpractice in Texas",
    "Create SEO-optimized title tags and meta descriptions for our birth injury practice area",
    "Draft an FAQ section about what qualifies as medical negligence",
    "Generate a blog outline about common signs of cerebral palsy caused by birth injuries",
  ];

  return (
    <PageShell title="Content Assistant" subtitle="AI-Powered Content Creation">
      <section className="py-8 md:py-12 bg-gray-50 min-h-[80vh]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-slate-600 text-sm">
                Chat with your AI assistant to draft blog posts, SEO content, and more.
              </p>
            </div>
            <button
              onClick={startNewChat}
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-new-chat"
            >
              <Plus className="w-4 h-4" /> New Chat
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm min-h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ maxHeight: "60vh" }}>
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <Bot className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-serif font-bold text-primary mb-2">
                    Content Creation Assistant
                  </h3>
                  <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">
                    Ask your assistant to help with blog posts, SEO content, legal articles, and more.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(suggestion)}
                        className="text-left p-3 border border-gray-200 rounded-lg text-sm text-slate-600 hover:border-secondary hover:bg-secondary/5 transition-colors"
                        data-testid={`button-suggestion-${i}`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                  data-testid={`message-${msg.role}-${i}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-secondary" />
                    </div>
                  )}
                  <div
                    className={`relative group max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-primary text-white p-4 rounded-2xl rounded-br-sm"
                        : "bg-gray-50 p-4 rounded-2xl rounded-bl-sm border border-gray-100"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <>
                        <MarkdownContent content={msg.content} />
                        <button
                          onClick={() => copyToClipboard(msg.content, i)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                          data-testid={`button-copy-${i}`}
                        >
                          {copied === i ? (
                            <Check className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-gray-400" />
                          )}
                        </button>
                      </>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3" data-testid="message-loading">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl rounded-bl-sm border border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Thinking...
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-3">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask your assistant to create content..."
                  className="flex-1 resize-none border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary"
                  rows={2}
                  disabled={loading}
                  data-testid="input-message"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="self-end bg-secondary hover:bg-secondary/90 disabled:bg-gray-300 text-white p-3 rounded-lg transition-colors"
                  data-testid="button-send"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
