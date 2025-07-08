"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
  const form = useRef<HTMLFormElement>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [isSending, setIsSending] = useState(false); // To prevent multiple submissions

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSending || !form.current) return;

    setIsSending(true);

    emailjs
      .sendForm(
        "service_mnvdzc3", // EmailJS Service ID
        "template_ml29i9d", // EmailJS Template ID
        form.current,
        "CTM7R8GE_yRlD7khS" // EmailJS Public Key
      )
      .then(
        (result) => {
          if (form.current) form.current.reset();
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 5000); // Auto-hide after 5 seconds
        },
        (error) => {
          console.error("EmailJS Error:", error); // Log error silently
          setShowNotification(false); // Ensure notification doesn't show on error
        }
      )
      .finally(() => {
        setIsSending(false); // Reset sending state
      });
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <section id="contact" className="text-gray-600 body-font relative mt-3">
      <h2
        style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
        className="text-4xl font-bold text-gray-900 -mb-10 text-center"
      >
        Contact us
      </h2>
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            frameBorder="0"
            title="map"
            marginHeight={0}
            marginWidth={0}
            scrolling="no"
            src="https://maps.google.com/maps?q=24.8404521,67.1628007&hl=en&z=16&output=embed"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
          ></iframe>
          <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
              <p className="mt-1">Sherabad Colony Sector 36 A Landhi Town, Karachi, Pakistan</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
              <a className="text-indigo-500 leading-relaxed">hamailsyed139@gmail.com</a>
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
              <p className="leading-relaxed">+92 3363351905</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-5">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
          <form ref={form} onSubmit={sendEmail}>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input
                type="text"
                id="name"
                name="user_name" // Matches EmailJS template variable
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="user_email" // Matches EmailJS template variable
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
              <textarea
                id="message"
                name="message" // Matches EmailJS template variable
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSending}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSending ? "Sending..." : "Send Feedback"}
            </button>
          </form>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 animate-fadeIn">
            <button
              onClick={handleCloseNotification}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold leading-none"
            >
              ×
            </button>
            <div className="flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-green-500 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center" style={{ fontFamily: "'Georgia', serif" }}>
              Success!
            </h3>
            <p className="text-gray-700 text-center mt-2">Your feedback has been sent successfully!</p>
            <p className="text-sm text-gray-500 text-center mt-1 italic">We’ll get back to you soon. Shukriya! 🎉</p>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </section>
  );
}