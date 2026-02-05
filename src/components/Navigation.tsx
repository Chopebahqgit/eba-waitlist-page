'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navigation() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const launchDate = new Date('2026-03-20T00:00:00').getTime();
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = launchDate - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="px-3 right-0 z-50 w-full fixed top-4 left-0">
            <div className="w-full max-w-7xl mx-auto rounded-4xl bg-white/80 backdrop-blur-md border-b border-zinc-200">
                <div className="w-full px-3 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <Image
                            src="/eba-logo-text.png"
                            alt="Eba"
                            width={80}
                            height={80}
                            className="rounded-lg"
                        />
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        <a
                            href="#how-it-works"
                            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            How it works
                        </a>
                        <a
                            href="#faqs"
                            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            FAQs
                        </a>
                    </nav>

                    <button
                        onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-5 py-3 rounded-full transition-all"
                    >
                        Join the waitlist
                    </button>
                </div>
            </div>
        </nav>

    );
}