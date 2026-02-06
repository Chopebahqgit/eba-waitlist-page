'use client';

import Image from "next/image";
import { useState } from "react";
import WaitlistForm from "@/src/components/forms/WaitlistForm";
import { ChevronDown, Gift, Search, ShoppingCart, Instagram, Music, Linkedin, Twitter, Facebook } from "lucide-react";
import Navigation from "../components/Navigation";
import WeeklySavings from "../components/WeeklySavings";

const faqs = [
  {
    question: "What is Eba?",
    answer: "Eba is Africa's discounted food items marketplace that connects you with quality discounted food items from supermarkets, restaurants, and food businesses at 10-60% discounts. Simply browse available food items near you through our app, reserve what you want, You can have it delivered to you or pick it up during the designated time window. We help reduce food waste while helping you save money on quality meals."
  },
  {
    question: "How much money can I actually save?",
    answer: "Users typically save 1,000-2,000 per purchase, with annual household savings potential of 24,000-36,000. For example, a 3,000 naira food item might cost just 2,000 or a 2,000 food item could be 1200. The exact savings depend on your usage frequency and the deals available in your area."
  },
  {
    question: "Is the food fresh and safe?",
    answer: "Absolutely. All food items on Eba is same-day fresh and perfectly safe for consumption. Our partners are vetted supermarkets, restaurants, and bakeries that maintain high food safety standards."
  },
  {
    question: "When is Eba launching?",
    answer: "We're launching soon in Abuja! Join our waitlist to be the first to know when we go live. Early supporters will get exclusive discounts and priority access."
  },
  {
    question: "How does it help the environment?",
    answer: "Food waste is a major contributor to climate change. By rescuing surplus food before it's thrown away, every Eba order helps reduce greenhouse gas emissions and conserve resources."
  },
  {
    question: "Why are the prices so low? Is this a scam?",
    answer: "This is completely legitimate. The discounts (10-60% off) exist because businesses would otherwise throw this food away. Restaurants have surplus at closing time, supermarkets have products that are not moving as fast as projected but perfect contents, and bakeries have daily overstock. Instead of wasting this food, businesses recover 15-25% of their sunk costs by selling to you. You get quality food at great prices, they avoid total loss, and the planet benefits."
  },
  {
    question: "What if the item I want is sold out before I can get it?",
    answer: "Popular items do move quickly. When this happens, our app immediately shows alternative options nearby. You can also enable push notifications for specific categories or businesses you love, giving you first alert when new items are posted. Many users find joy in the discovery aspect, trying new supermarkets and food items they wouldn't have otherwise."
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
                alt="Eba"
                width={56}
                height={56}
                className="mx-auto mb-8"
              />
            </div>

            <h1 id="waitlist-form" className="text-4xl sm:text-5xl md:text-6xl leading-16 font-bold text-zinc-900 mb-6 animate-fade-in-up-delay-1">
              Stop spending 35% of your salary on food
            </h1>

            <p className="text-zinc-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-2">
              Get the best offers on discounted food items from supermarkets in Abuja.
              <span className="block font-medium text-zinc-700">Great savings. Best offers.</span>
            </p>

            <WaitlistForm />

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
                Saving money while eating affordably has never been easier. Get started in three simple steps.
              </p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Browse & discover",
                  description: "Explore discounted food items from supermarkets around you at up to 50% off.",
                  icon: <Search className="size-8 text-white" />,
                  bgColor: "from-emerald-500 to-teal-600",
                  shapeColor: "bg-white/20"
                },
                {
                  title: "Reserve your food items",
                  description: "Choose what you want and place your order. Pay securely through the app in seconds.",
                  icon: <ShoppingCart className="size-8 text-orange-600" />,
                  bgColor: "from-orange-50 to-amber-50",
                  shapeColor: "bg-orange-200/30"
                },
                {
                  title: "Pick up or delivery",
                  description: "You can have your ite delivered to you or pick it up at the store and enjoy your discounted meals.",
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
              Everything you need to know about Eba. Find answers to the most common questions below.
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

                <WaitlistForm />

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
                  alt="Eba Logo"
                  width={40}
                  height={40}
                  className="rounded-xl"
                />
                <Image
                  src="/eba-text.png"
                  alt="Eba"
                  width={60}
                  height={24}
                  className="brightness-0 invert"
                />
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm text-center">
                Save food, save money, and protect the environment. Get quality meals at giveaway prices.
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-4 mb-6">
                <a
                  href="https://www.instagram.com/chopebahq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@chopebahq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-black flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="TikTok"
                >
                  <Music className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/chopebahq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/ChopebaHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-black flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/chopebahq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
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