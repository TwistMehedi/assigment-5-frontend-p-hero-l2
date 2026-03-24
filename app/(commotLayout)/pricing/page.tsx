import React from "react";
import { Check, Crown, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    features: [
      "720p Streaming",
      "1 Screen at a time",
      "Unlimited Movies",
      "Ad-supported",
    ],
  },
  {
    name: "Standard",
    price: "$15.99",
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    features: [
      "1080p Full HD",
      "2 Screens at a time",
      "Offline Downloads",
      "No Ads",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "$19.99",
    icon: <Crown className="h-8 w-8 text-yellow-500" />,
    features: [
      "4K + HDR Streaming",
      "4 Screens at a time",
      "Dolby Atmos Audio",
      "Early Access",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-4">
          Choose Your Plan
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Unlock unlimited access to the world's best movies and TV series. Pick
          the plan that's right for you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative p-10 rounded-3xl border flex flex-col ${plan.popular ? "border-primary shadow-2xl scale-105 bg-card" : "bg-background"}`}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                Most Popular
              </span>
            )}
            <div className="mb-6">{plan.icon}</div>
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="text-5xl font-black mb-8">
              {plan.price}
              <span className="text-lg font-normal text-muted-foreground">
                /mo
              </span>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((f, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-300"
                >
                  <Check className="h-5 w-5 text-primary" /> {f}
                </li>
              ))}
            </ul>

            <Button
              className={`w-full h-14 rounded-2xl font-bold text-lg ${plan.popular ? "shadow-lg shadow-primary/30" : ""}`}
              variant={plan.popular ? "default" : "outline"}
            >
              Subscribe Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
