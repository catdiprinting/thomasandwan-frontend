import { useState } from "react";
import { Phone } from "lucide-react";

interface LeadCaptureFormProps {
  variant?: "inline" | "card" | "sidebar";
  heading?: string;
  subheading?: string;
  className?: string;
}

export default function LeadCaptureForm({
  variant = "inline",
  heading,
  subheading,
  className = "",
}: LeadCaptureFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const fullMessage = `[Lead Form - No Email] Phone: ${phone}${message ? ` | ${message}` : ""}`;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: "lead@thomasandwan.com",
          phone,
          message: fullMessage,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Unable to send message. Please try calling us at (713) 529-1177.");
    }
  };

  if (status === "success") {
    const successBg = variant === "card" ? "bg-white/10" : "bg-green-50 border border-green-200";
    const successText = variant === "card" ? "text-white" : "text-green-800";
    return (
      <div className={className}>
        {variant === "card" && (
          <div className="bg-primary border-t-4 border-secondary p-8 md:p-10">
            <div className={`${successBg} p-6 text-center`}>
              <p className={`text-lg font-bold ${successText}`}>Thank you!</p>
              <p className={`mt-2 ${variant === "card" ? "text-white/80" : "text-green-700"}`}>
                We'll contact you shortly for your free case review.
              </p>
            </div>
          </div>
        )}
        {variant !== "card" && (
          <div className={`${successBg} p-6 text-center`}>
            <p className={`text-lg font-bold ${successText}`}>Thank you!</p>
            <p className={`mt-2 ${successText}`}>
              We'll contact you shortly for your free case review.
            </p>
          </div>
        )}
      </div>
    );
  }

  const inputBaseClass = "w-full px-4 py-3 text-sm border focus:outline-none focus:ring-2 focus:ring-secondary/50";
  const cardInputClass = `${inputBaseClass} border-white/20 bg-white/10 text-white placeholder:text-white/60`;
  const lightInputClass = `${inputBaseClass} border-gray-200 bg-white text-gray-900 placeholder:text-gray-400`;

  const inputClass = variant === "card" ? cardInputClass : lightInputClass;

  const buttonClass = "bg-secondary hover:bg-secondary/90 text-white font-bold uppercase tracking-widest text-sm px-6 py-3 transition-colors whitespace-nowrap";

  if (variant === "card") {
    const h = heading || "Injured by Medical Negligence?";
    const sub = subheading || "Get a free case review. No fees unless we win.";

    return (
      <div className={`bg-primary border-t-4 border-secondary p-8 md:p-10 ${className}`}>
        <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">{h}</h3>
        <p className="text-white/80 mb-6">{sub}</p>

        <form onSubmit={handleSubmit} data-testid="form-lead-capture" className="space-y-4">
          <input
            type="text"
            placeholder="Your Name *"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={cardInputClass}
            data-testid="input-lead-name"
          />
          <input
            type="tel"
            placeholder="Phone Number *"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={cardInputClass}
            data-testid="input-lead-phone"
          />
          <textarea
            placeholder="Brief description of your case (optional)"
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${cardInputClass} resize-none`}
            data-testid="input-lead-message"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={`${buttonClass} w-full py-4`}
            data-testid="button-lead-submit"
          >
            {status === "loading" ? "Sending..." : "Get Free Case Review"}
          </button>
        </form>

        {status === "error" && (
          <p className="mt-3 text-red-300 text-sm">{errorMessage}</p>
        )}

        <div className="mt-6 flex items-center gap-2 text-white/80 text-sm">
          <Phone className="w-4 h-4 text-secondary" />
          <span>Or call us directly:</span>
          <a href="tel:713-529-1177" className="text-secondary font-bold hover:underline">
            (713) 529-1177
          </a>
        </div>
      </div>
    );
  }

  if (variant === "sidebar") {
    const h = heading || "Free Case Review";

    return (
      <div className={`bg-white border border-gray-100 p-6 ${className}`}>
        <h4 className="font-bold text-primary uppercase tracking-wide text-sm mb-3">{h}</h4>
        {subheading && <p className="text-slate-600 text-sm mb-4">{subheading}</p>}

        <form onSubmit={handleSubmit} data-testid="form-lead-capture" className="space-y-3">
          <input
            type="text"
            placeholder="Your Name *"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${lightInputClass} py-2 text-xs`}
            data-testid="input-lead-name"
          />
          <input
            type="tel"
            placeholder="Phone Number *"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${lightInputClass} py-2 text-xs`}
            data-testid="input-lead-phone"
          />
          <textarea
            placeholder="Brief description (optional)"
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${lightInputClass} py-2 text-xs resize-none`}
            data-testid="input-lead-message"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={`${buttonClass} w-full py-3 text-xs`}
            data-testid="button-lead-submit"
          >
            {status === "loading" ? "Sending..." : "Get Free Case Review"}
          </button>
        </form>

        {status === "error" && (
          <p className="mt-2 text-red-600 text-xs">{errorMessage}</p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        data-testid="form-lead-capture"
        className="flex flex-col md:flex-row gap-3 items-stretch"
      >
        <input
          type="text"
          placeholder="Your Name *"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${inputClass} md:flex-1`}
          data-testid="input-lead-name"
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`${inputClass} md:flex-1`}
          data-testid="input-lead-phone"
        />
        <textarea
          placeholder="Brief description (optional)"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} md:flex-1 resize-none`}
          data-testid="input-lead-message"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={buttonClass}
          data-testid="button-lead-submit"
        >
          {status === "loading" ? "Sending..." : "Get Free Case Review"}
        </button>
      </form>

      {status === "error" && (
        <p className="mt-2 text-red-600 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}
