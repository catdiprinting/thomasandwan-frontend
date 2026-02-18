import { motion } from "framer-motion";
import { HelpCircle, Phone } from "lucide-react";
import SmartCTA from "./SmartCTA";

const questions = [
  "Did doctors say \"it's normal\" but something felt wrong?",
  "Did your loved one get worse after surgery?",
  "Did the hospital delay treatment?",
  "Did a mistake change your family forever?",
];

export default function WereYouIgnored() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1f2e]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-[#1a1f2e]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 text-secondary/80 text-sm uppercase tracking-[0.2em] mb-6">
              <span className="w-8 h-px bg-secondary/50" />
              You Deserve Answers
              <span className="w-8 h-px bg-secondary/50" />
            </div>
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight"
              data-testid="text-ignored-heading"
            >
              Were You Ignored or{" "}
              <span className="text-secondary">Sent Home Too Soon?</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-12 md:mb-16">
            {questions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
                data-testid={`card-ignored-question-${index}`}
              >
                <div className="flex items-start gap-4 p-5 md:p-6 rounded-lg bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.1] hover:border-secondary/20">
                  <div className="mt-0.5 flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-secondary/70 group-hover:text-secondary transition-colors" />
                  </div>
                  <p className="text-white/85 text-base md:text-lg leading-relaxed font-light">
                    {question}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              We talk to families every day who were dismissed, rushed, or not taken seriously.
            </p>
            <div className="space-y-1 mb-2">
              <p className="font-serif text-xl md:text-2xl text-white italic" data-testid="text-ignored-reassurance-1">
                You are not crazy.
              </p>
              <p className="font-serif text-xl md:text-2xl text-white italic" data-testid="text-ignored-reassurance-2">
                You are not overreacting.
              </p>
              <p className="font-serif text-xl md:text-2xl text-secondary italic" data-testid="text-ignored-reassurance-3">
                And it was not your fault.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-white/60 text-base mb-6">
              We can help you understand what happened.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SmartCTA
                mobileText="Call Now — Free Review"
                desktopText="Free Case Review"
                className="items-center gap-2 bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-4 rounded-md text-base transition-all duration-300 shadow-lg shadow-secondary/20 hover:shadow-secondary/30"
                data-testid="button-ignored-cta"
              />
              <span className="hidden md:inline-flex items-center gap-2 text-white/70 text-base">
                <Phone className="w-4 h-4" />
                (713) 529-1177
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
