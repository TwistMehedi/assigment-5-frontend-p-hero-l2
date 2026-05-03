"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, Sparkles } from "lucide-react";
import { changePassword } from "../../../backend/src/modules/auth/auth.controller";

const faqData = [
  {
    id: 1,
    question: "How does the AI Search Suggestion work?",
    answer:
      "Our portal uses Google Gemini AI to analyze your partial inputs and browsing patterns. It suggests movie titles, genres, and directors in real-time to help you find the perfect content even if you have typos.",
    isAi: true,
  },
  {
    id: 2,
    question: "Can I watch movies without a subscription?",
    answer:
      "You can browse the catalog and see trailers for free. However, to watch full movies and premium TV series, you'll need an active subscription plan.",
    isAi: false,
  },
  {
    id: 3,
    question: "What is the 'Smart Tips' feature in Series?",
    answer:
      "Smart Tips is an agentic AI feature that recommends trending shows similar to your search results, helping you discover binge-worthy content faster.",
    isAi: true,
  },
  {
    id: 4,
    question: "How can I request a movie or show?",
    answer:
      "You can reach out to us through our support desk or leave a review on existing media. We regularly update our database based on user requests and trending ratings.",
    isAi: false,
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className=" pb-5 container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-16 space-y-4">
        <div className="flex items-center justify-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
          <HelpCircle size={14} /> Support Center
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
          Got <span className="text-primary">Questions?</span>
        </h2>
        <p className="text-muted-foreground text-sm font-medium">
          Everything you need to know about our AI-powered streaming platform.
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={faq.id}
            className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
              activeIndex === index
                ? "border-primary/50 bg-card shadow-xl shadow-primary/5"
                : "border-border/50 bg-card/30 hover:border-primary/30"
            }`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
            >
              <span className="flex items-center gap-3 font-bold text-sm md:text-base uppercase tracking-tight">
                {faq.question}
                {faq.isAi && (
                  <span className="flex items-center gap-1 bg-primary/10 text-primary text-[8px] px-2 py-0.5 rounded-full border border-primary/20">
                    <Sparkles size={8} fill="currentColor" /> AI
                  </span>
                )}
              </span>

              <div
                className={`transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`}
              >
                {activeIndex === index ? (
                  <Minus size={18} className="text-primary" />
                ) : (
                  <Plus size={18} className="text-muted-foreground" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 md:px-6 pb-6 text-muted-foreground text-sm leading-relaxed font-medium border-t border-border/20 pt-4 bg-background/20">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">
          Still confused?
          <button className="text-primary ml-2 transition-all">
            Talk to an our agent chat box see the right side of the screen
          </button>
        </p>
      </div>
    </section>
  );
};

export default FAQ;
