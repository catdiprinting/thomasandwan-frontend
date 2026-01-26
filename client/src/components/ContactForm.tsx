import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  caseType?: string;
  message: string;
}

interface ContactFormProps {
  variant?: "default" | "footer";
  showCaseType?: boolean;
}

export default function ContactForm({ variant = "default", showCaseType = false }: ContactFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    caseType: "",
    message: "",
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit form");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thank you for reaching out!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        caseType: "",
        message: "",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClass = variant === "footer"
    ? "bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-secondary"
    : "bg-gray-50 border-gray-200 h-12 focus-visible:ring-secondary";

  const labelClass = variant === "footer"
    ? "text-xs uppercase tracking-widest text-secondary font-bold"
    : "text-sm font-bold text-primary uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
      <div className={variant === "default" ? "grid md:grid-cols-2 gap-6" : "grid grid-cols-2 gap-4"}>
        <div className="space-y-2">
          <label className={labelClass}>First Name</label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={inputClass}
            placeholder="John"
            required
            data-testid="input-firstName"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Last Name</label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={inputClass}
            placeholder="Doe"
            required
            data-testid="input-lastName"
          />
        </div>
      </div>

      {variant === "default" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className={labelClass}>Email</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="john@example.com"
              required
              data-testid="input-email"
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Phone</label>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="(555) 555-5555"
              data-testid="input-phone"
            />
          </div>
        </div>
      )}

      {variant === "footer" && (
        <div className="space-y-2">
          <label className={labelClass}>Email</label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            required
            data-testid="input-email"
          />
        </div>
      )}

      {showCaseType && (
        <div className="space-y-2">
          <label className={labelClass}>Case Type</label>
          <select
            name="caseType"
            value={formData.caseType}
            onChange={handleChange}
            className={`flex h-12 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              variant === "footer" ? inputClass : "border-gray-200 bg-gray-50"
            }`}
            data-testid="select-caseType"
          >
            <option value="">Select a practice area...</option>
            <option value="birth-injury">Birth Injury</option>
            <option value="surgical-error">Surgical Error</option>
            <option value="misdiagnosis">Misdiagnosis</option>
            <option value="wrongful-death">Wrongful Death</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}

      <div className="space-y-2">
        <label className={labelClass}>Message</label>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={variant === "footer" ? `${inputClass} min-h-[120px]` : `${inputClass} min-h-[150px]`}
          placeholder={variant === "footer" ? "Tell us about your case..." : "Please describe what happened..."}
          required
          data-testid="textarea-message"
        />
      </div>

      <Button
        type="submit"
        disabled={submitMutation.isPending}
        className={`w-full bg-secondary hover:bg-secondary/90 text-white font-bold ${
          variant === "footer" ? "py-6 text-lg" : "py-6 text-lg rounded-none"
        }`}
        data-testid="button-submit"
      >
        {submitMutation.isPending ? "Submitting..." : "Submit Request"}
      </Button>

      {variant === "default" && (
        <p className="text-xs text-muted-foreground text-center">
          By submitting this form, you agree to our privacy policy. Your information is confidential.
        </p>
      )}
    </form>
  );
}
