"use client";
import React from "react";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const sendMessage = (e: any) => {
    e.preventDefault();

    toast.success(
      "Message sent successfully! Our support team will get back to you shortly.",
    );
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#141414] text-gray-900 dark:text-white transition-colors duration-300 font-sans">
      <div className="py-20 px-6 text-center bg-gray-50 dark:bg-[#181818]">
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
          GET IN <span className="text-primary">TOUCH</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
          Have questions about your subscription or technical issues? Our team
          is here to help you 24/7.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest border-l-4 border-primary-600 pl-4">
            Contact Information
          </h2>

          <div className="space-y-8">
            <div className="flex items-start space-x-5">
              <div className="mt-1 p-3 bg-primary text-white rounded-lg shadow-lg dark:border-gray-800 bg-gray-50 dark:bg-[#1c1c1c]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg">Support Email</h4>
                <p className="text-gray-500 dark:text-gray-400">
                  ataul1708@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-5">
              <div className="mt-1 p-3 bg-primary text-white rounded-lg shadow-lg dark:border-gray-800 bg-gray-50 dark:bg-[#1c1c1c]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg">Headquarters</h4>
                <p className="text-gray-500 dark:text-gray-400">
                  123 Cinema Blvd, Digital City, 54321
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-red-600/10 border border-red-600/20 rounded-xl">
            <p className="text-sm font-medium uppercase tracking-wide">
              Response Time
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We usually respond within 12-24 hours.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-[#1c1c1c] p-8 md:p-10 rounded-3xl shadow-2xl">
          <form onSubmit={sendMessage} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-tighter">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-5 py-4 rounded-xl bg-white dark:bg-[#252525] border border-transparent focus:border-red-600 focus:ring-0 outline-none transition-all duration-200 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-tighter">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full px-5 py-4 rounded-xl bg-white dark:bg-[#252525] border border-transparent focus:border-red-600 focus:ring-0 outline-none transition-all duration-200 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-tighter">
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                placeholder="How can we help you?"
                className="w-full px-5 py-4 rounded-xl bg-white dark:bg-[#252525] border border-transparent focus:border-red-600 focus:ring-0 outline-none transition-all duration-200 shadow-sm resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-green-600 text-white font-black py-4 rounded-xl shadow-lg transform active:scale-95 transition-all duration-200 uppercase tracking-widest"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
