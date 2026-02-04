'use client';

import Image from "next/image";
import { useState } from "react";
import WaitlistForm, { CountdownTimer } from "@/src/components/forms/WaitlistForm";
import { ChevronDown, Gift, Leaf, Percent, Search, ShieldCheck, ShoppingCart } from "lucide-react";
import Navigation from "../components/Navigation";
import WeeklySavings from "../components/WeeklySavings";

const faqs = [
  {
    question: "What is EBA?",
    answer: "EBA is a marketplace that connects you with surplus food from restaurants, bakeries, and supermarkets at heavily discounted prices. We help reduce food waste while helping you save money on quality meals."
  },
  {
    question: "How much can I save?",
    answer: "You can save up to 70% off regular prices. All our partner businesses offer their surplus food at giveaway prices because they'd rather it go to a good home than to waste."
  },
  {
    question: "Is the food fresh and safe?",
    answer: "Absolutely. All food on EBA is same-day fresh and perfectly safe to eat. Our partners are vetted restaurants, bakeries, and supermarkets that maintain high food safety standards."
  },
  {
    question: "When is EBA launching?",
    answer: "We're launching soon in Lagos and Abuja! Join our waitlist to be the first to know when we go live. Early supporters will get exclusive discounts and priority access."
  },
  {
    question: "How does it help the environment?",
    answer: "Food waste is a major contributor to climate change. By rescuing surplus food before it's thrown away, every EBA order helps reduce greenhouse gas emissions and conserve resources."
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const launchDate = new Date('2026-03-20T00:00:00');

  return (
    <div className="flex flex-col min-h-screen max-w-screen overflow-hidden bg-[#f8f9fa]">
      <div className="px-2">
        <Navigation />
      </div>
      <main className="flex-1">
        <section className="relative pt-28 md:pt-40 pb-12 lg:pb-16 px-6 min-h-screen flex flex-col items-start justify-center overflow-hidden">
          <div className="gradient-orb-green top-[-10%] left-[-10%]"></div>
          <div className="gradient-orb-orange top-[20%] right-[-5%]"></div>
          <div className="gradient-orb-yellow bottom-[10%] left-[20%]"></div>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <div className="animate-fade-in-up">
              <Image
                src="/eba-logo.png"
                alt="EBA"
                width={56}
                height={56}
                className="mx-auto mb-8"
              />
            </div>

            <h1 id="waitlist-form" className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 mb-6 animate-fade-in-up-delay-1">
              Save Up to 70% on Quality Food
            </h1>

            <p className="text-zinc-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-2">
              Rescue surplus meals from Lagos & Abuja's best restaurants.
              <span className="block font-medium text-zinc-700">Great prices. Zero waste. Launching soon.</span>
            </p>

            <div className="max-w-md mx-auto mb-8 animate-fade-in-up-delay-3">
              <WaitlistForm />
            </div>

            <div className="flex items-center justify-center gap-3 mb-16">
              <div className="flex -space-x-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="size-12 rounded-full border-4 border-white bg-zinc-100 overflow-hidden shadow-sm">
                    <Image
                      src={`https://i.pravatar.cc/150?u=${i + 200}`}
                      alt="Waitlist member"
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm text-zinc-500">
                Join <span className="font-semibold text-zinc-700">200+</span> others on the waitlist
              </span>
            </div>
            <WeeklySavings />
          </div>
        </section>


        {/* How it Works Section */}
        <section id="how-it-works" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4">
                How it works
              </h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                Saving food and money has never been easier. Get started in three simple steps.
              </p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Browse & discover",
                  description: "Explore surplus food from restaurants, bakeries, and supermarkets near you at up to 70% off.",
                  icon: <Search className="size-8 text-white" />,
                  bgColor: "from-emerald-500 to-teal-600",
                  shapeColor: "bg-white/20"
                },
                {
                  title: "Reserve your meal",
                  description: "Choose what you want and place your order. Pay securely through the app in seconds.",
                  icon: <ShoppingCart className="size-8 text-orange-600" />,
                  bgColor: "from-orange-50 to-amber-50",
                  shapeColor: "bg-orange-200/30"
                },
                {
                  title: "Pick up & enjoy",
                  description: "Head to the location during pickup time and collect your delicious, discounted meal.",
                  icon: <Gift className="size-8 text-rose-600" />,
                  bgColor: "from-rose-50 to-pink-50",
                  shapeColor: "bg-rose-200/30"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all hover:shadow-xl bg-linear-to-br ${item.bgColor}`}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-2 ${index === 0 ? 'text-white' : 'text-zinc-900'}`}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm mb-16 ${index === 0 ? 'text-white/90' : 'text-zinc-600'}`}>
                    {item.description}
                  </p>

                  {/* Arrow */}
                  <div className="absolute bottom-6 left-6">
                    <svg
                      className={`size-6 ${index === 0 ? 'text-white' : 'text-zinc-900'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  {/* Decorative 3D shapes */}
                  <div className="absolute bottom-0 right-0 pointer-events-none">
                    <div className={`absolute w-24 h-24 ${item.shapeColor} rounded-full -bottom-8 -right-8`} />
                    <div className={`absolute w-16 h-16 ${item.shapeColor} rounded-lg -bottom-4 right-8 rotate-12`} />
                    <div className={`absolute w-20 h-20 ${item.shapeColor} rounded-full bottom-8 -right-4`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section id="faqs" className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Everything you need to know about EBA. Find answers to the most common questions below.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-zinc-50 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-lg text-zinc-900">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openFaq === index ? 'bg-green-600 text-white' : 'bg-zinc-200 text-zinc-600'}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-zinc-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-6 bg-linear-to-br from-green-50 via-orange-50 to-yellow-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative">
              <div className="gradient-orb-green top-[-20%] left-[-10%] opacity-30"></div>
              <div className="gradient-orb-orange bottom-[-20%] right-[-10%] opacity-30"></div>

              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-6">
                  Ready to start saving?
                </h2>
                <p className="text-lg text-zinc-600 mb-8 max-w-xl mx-auto">
                  Join our waitlist today and be among the first to access quality meals at unbeatable prices while fighting food waste.
                </p>

                <div className="max-w-md w-full mx-auto mb-6">
                  <WaitlistForm />
                </div>

                <div className="flex items-center justify-center gap-3 text-sm text-zinc-500">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-zinc-100 overflow-hidden shadow-sm">
                        <Image
                          src={`https://i.pravatar.cc/150?u=${i + 300}`}
                          alt="Member"
                          width={32}
                          height={32}
                        />
                      </div>
                    ))}
                  </div>
                  <span>Join <strong className="text-zinc-700">200+</strong> others waiting</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="flex items-center flex-col w-full">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/eba-logo.png"
                  alt="EBA Logo"
                  width={40}
                  height={40}
                  className="rounded-xl"
                />
                <Image
                  src="/eba-text.png"
                  alt="EBA"
                  width={60}
                  height={24}
                  className="brightness-0 invert"
                />
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm text-center">
                Save food, save money, and protect the environment. Get quality meals at giveaway prices.
              </p>
            </div>
            <p className="text-zinc-500 text-sm">
              Eba Technologies © 2026. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}