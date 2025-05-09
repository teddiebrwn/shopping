"use client";
import { ChevronDown } from "lucide-react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className=" flex flex-col gap-2 sm:gap-3 md:gap-4 w-full max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto px-3 py-4 border rounded-2xl p-4">
      <div className="flex items-center text-xl sm:text-2xl md:text-3xl font-bold justify-center gap-1 w-full">
        <span className="text-base">contact here</span>
        <ChevronDown
          width={16}
          height={16}
          className="animate-bounce translate-y-[0.1em]"
        />
      </div>
      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="flex flex-col gap-4 max-w-lg"
      >
        <Input
          className=""
          type="hidden"
          name="access_key"
          value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY!}
        />
        <Input
          type="hidden"
          name="subject"
          value="New message from tranvu.dev"
        />
        <Input type="hidden" name="from_name" value="tranvu.dev" />
        <Input
          type="hidden"
          name="redirect"
          value="https://tranvu.dev/thanks"
        />

        {step === 1 && (
          <>
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className=""
            />
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className=""
            />
            <Button onClick={handleNext} className="">
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message"
              required
              className=""
            />
            <input type="hidden" name="from_name" value="tranvu.dev" />
            <button
              type="submit"
              className="bg-accent text-accent-foreground px-4 py-2 rounded"
            >
              Send Message
            </button>
          </>
        )}
      </form>
    </div>
  );
}
