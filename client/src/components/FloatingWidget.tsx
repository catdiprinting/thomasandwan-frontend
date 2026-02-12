import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone, User, Bot, Loader2 } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function FloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"contact" | "chat">("contact");

  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactError, setContactError] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;

    setContactStatus("sending");
    setContactError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: "widget@thomasandwan.com",
          phone: contactForm.phone,
          message: `[Chat Widget] ${contactForm.message}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setContactStatus("success");
        setContactForm({ name: "", phone: "", message: "" });
      } else {
        setContactStatus("error");
        setContactError(data.message || "Failed to send message.");
      }
    } catch {
      setContactStatus("error");
      setContactError("Unable to send message. Please try calling us at (713) 529-1177.");
    }
  };

  const sendChatMessage = async () => {
    const trimmed = chatInput.trim();
    if (!trimmed || chatLoading) return;

    setChatInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setChatLoading(true);

    try {
      let currentThreadId = threadId;

      if (!currentThreadId) {
        const threadRes = await fetch("/api/assistant/thread", { method: "POST" });
        const threadData = await threadRes.json();
        if (!threadData.threadId) throw new Error("Failed to create thread");
        currentThreadId = threadData.threadId;
        setThreadId(currentThreadId);
      }

      const msgRes = await fetch("/api/assistant/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId: currentThreadId, message: trimmed }),
      });

      const msgData = await msgRes.json();
      if (msgData.response) {
        setMessages((prev) => [...prev, { role: "assistant", content: msgData.response }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't process that. Please try again." }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again later." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleChatKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          data-testid="floating-widget-button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-40 w-14 h-14 rounded-full bg-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-pulse hover:animate-none"
          aria-label="Open chat widget"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div
          data-testid="floating-widget-panel"
          className="fixed z-40 bg-white border shadow-xl flex flex-col
            bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl
            md:bottom-6 md:right-6 md:left-auto md:w-[380px] md:max-h-[600px] md:rounded-2xl"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b bg-primary text-white rounded-t-2xl">
            <h3 className="font-semibold text-sm">Thomas & Wan LLP</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              data-testid="button-close-widget"
              aria-label="Close widget"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex border-b">
            <button
              data-testid="tab-quick-contact"
              onClick={() => setActiveTab("contact")}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                activeTab === "contact"
                  ? "text-secondary border-b-2 border-secondary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Contact
            </button>
            <button
              data-testid="tab-ai-assistant"
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                activeTab === "chat"
                  ? "text-secondary border-b-2 border-secondary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeTab === "contact" && (
              <div className="p-4">
                {contactStatus === "success" ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                      <Send className="w-5 h-5" />
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">Message Sent!</p>
                    <p className="text-sm text-gray-500 mb-4">We'll get back to you shortly.</p>
                    <button
                      onClick={() => setContactStatus("idle")}
                      className="text-sm text-secondary hover:underline"
                      data-testid="button-send-another"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
                          placeholder="Your name"
                          required
                          data-testid="input-widget-name"
                          className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm((f) => ({ ...f, phone: e.target.value }))}
                          placeholder="(555) 123-4567"
                          data-testid="input-widget-phone"
                          className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Message *</label>
                      <textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="How can we help you?"
                        required
                        rows={3}
                        data-testid="input-widget-message"
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary resize-none"
                      />
                    </div>
                    {contactStatus === "error" && (
                      <p className="text-xs text-red-600" data-testid="text-contact-error">{contactError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={contactStatus === "sending"}
                      data-testid="button-widget-send"
                      className="w-full py-2.5 bg-secondary text-white font-semibold rounded-lg text-sm hover:bg-secondary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {contactStatus === "sending" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {activeTab === "chat" && (
              <div className="flex flex-col h-full" style={{ minHeight: "350px" }}>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-gray-100 rounded-xl rounded-tl-sm px-3 py-2 text-sm text-gray-800 max-w-[85%]">
                      Hi! I'm Thomas & Wan's virtual assistant. I can help answer questions about medical malpractice cases. How can I help you today?
                    </div>
                  </div>

                  {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div
                        className={`rounded-xl px-3 py-2 text-sm max-w-[85%] whitespace-pre-wrap ${
                          msg.role === "user"
                            ? "bg-secondary text-white rounded-tr-sm"
                            : "bg-gray-100 text-gray-800 rounded-tl-sm"
                        }`}
                      >
                        {msg.content}
                      </div>
                      {msg.role === "user" && (
                        <div className="w-7 h-7 rounded-full bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {chatLoading && (
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-gray-100 rounded-xl rounded-tl-sm px-3 py-2 text-sm text-gray-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t p-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={handleChatKeyDown}
                      placeholder="Type a message..."
                      disabled={chatLoading}
                      data-testid="input-chat-message"
                      className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary disabled:opacity-60"
                    />
                    <button
                      onClick={sendChatMessage}
                      disabled={chatLoading || !chatInput.trim()}
                      data-testid="button-chat-send"
                      className="p-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-60"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}