"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function () {
  const [email, setEmail] = useState("");
  const subsription = () => {
    console.log(email);
  };
  return (
    <div>
      <h4 className="font-bold text-lg mb-6">Newsletter</h4>
      <p className="text-sm text-muted-foreground mb-4">
        Get updates on new releases and upcoming series.
      </p>
      <div className="flex flex-col gap-3">
        <Input
          value={email}
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="bg-background border-border rounded-xl"
          required
        />
        <Button
          onClick={subsription}
          className="w-full cursor-pointer text-white bg-primary rounded-xl font-bold shadow-lg shadow-primary/20 dark:bg-green-600"
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
}
