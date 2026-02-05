'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, Copy, X } from 'lucide-react';
import { FaWhatsapp, FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { joinWaitlist } from '@/src/app/actions';
import { cn, getDeviceInfo } from '@/src/lib/utils';
import { DeviceInfo, WaitlistData } from '@/src/types';
import Link from 'next/link';


export default function WaitlistForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
    const [showShareModal, setShowShareModal] = useState(false);

    useEffect(() => {
        setDeviceInfo(getDeviceInfo());
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const fullName = formData.get('fullName') as string;
        const whatsappNumber = formData.get('whatsappNumber') as string;

        const result = await joinWaitlist({
            email,
            fullName,
            whatsappNumber,
            deviceInfo: deviceInfo || undefined,
        });

        if (result.error) {
            setStatus('error');
            setMessage(result.error);
        } else {
            setStatus('success');
            setMessage("You're on the list!");
        }
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = "Join me on the EBA waitlist and let's save food together! 🌱";

    const socialLinks = [
        {
            name: 'WhatsApp',
            icon: <FaWhatsapp className="w-5 h-5" />,
            url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
            color: 'bg-green-500 hover:bg-green-600'
        },
        {
            name: 'Twitter',
            icon: <FaTwitter className="w-5 h-5" />,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            color: 'bg-black hover:bg-zinc-800'
        },
        {
            name: 'Facebook',
            icon: <FaFacebookF className="w-5 h-5" />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            color: 'bg-blue-600 hover:bg-blue-700'
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedinIn className="w-5 h-5" />,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            color: 'bg-blue-700 hover:bg-blue-800'
        }
    ];

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 300);
    };

    return (
        <>
            <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 animate-fade-in-up-delay-3">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-8 rounded-full text-white font-semibold transition-all text-sm bg-green-700 hover:bg-green-800 shadow-lg hover:shadow-xl"
                >
                    Join waitlist
                </button>

                <Link
                    href="https://chat.whatsapp.com/Fe3o96djC8695RDpwswlnI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-8 rounded-full text-black font-semibold transition-all text-sm border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900 hover:text-white shadow-lg hover:shadow-xl"
                >
                    <FaWhatsapp className="w-5 h-5" />
                    <span>WhatsApp Community</span>
                </Link>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={handleClose}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-zinc-500" />
                            </button>

                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col items-center justify-center text-center"
                                    >
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-950 mb-2">You're on the list! 🎉</h3>
                                        <p className="text-gray-700 text-sm mb-8">Check your email for your welcome message</p>

                                        <div className="flex flex-col gap-3 w-full">
                                            <button
                                                onClick={() => setShowShareModal(true)}
                                                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-full transition-all"
                                            >
                                                Invite a friend
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setStatus('idle');
                                                    setMessage('');
                                                }}
                                                className="w-full bg-white hover:bg-green-50 text-green-700 border border-green-200 font-semibold py-3 px-6 rounded-full transition-all"
                                            >
                                                Add another
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <h2 className="text-3xl font-bold text-zinc-900 mb-2 text-center">Join the waitlist</h2>
                                        <p className="text-zinc-600 mb-6 text-center">Be the first to know when we launch</p>

                                        <form onSubmit={handleSubmit}>
                                            <div className="flex flex-col gap-3">
                                                <input
                                                    name="fullName"
                                                    type="text"
                                                    required
                                                    placeholder="Full name"
                                                    className="w-full px-4 py-3.5 rounded-full border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all text-zinc-900 placeholder:text-zinc-400 text-sm"
                                                />
                                                <input
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="Email address"
                                                    className="w-full px-4 py-3.5 rounded-full border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all text-zinc-900 placeholder:text-zinc-400 text-sm"
                                                />
                                                <input
                                                    name="whatsappNumber"
                                                    type="tel"
                                                    required
                                                    placeholder="WhatsApp number (e.g., +234 801 234 5678)"
                                                    className="w-full px-4 py-3.5 rounded-full border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all text-zinc-900 placeholder:text-zinc-400 text-sm"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={status === 'loading'}
                                                    className={cn(
                                                        "w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-white font-semibold transition-all text-sm",
                                                        "bg-zinc-900 hover:bg-zinc-800",
                                                        "disabled:opacity-70 disabled:cursor-not-allowed"
                                                    )}
                                                >
                                                    {status === 'loading' ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                            <span>Joining...</span>
                                                        </>
                                                    ) : (
                                                        <>Join waitlist</>
                                                    )}
                                                </button>
                                            </div>

                                            {status === 'error' && (
                                                <p className="text-sm text-red-500 text-center mt-3">{message}</p>
                                            )}
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showShareModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowShareModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-zinc-900 mb-4 text-center">Share with friends</h3>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${social.color} text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2`}
                                    >
                                        {social.icon}
                                        <span className="text-sm">{social.name}</span>
                                    </a>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(shareUrl);
                                    alert('Link copied to clipboard!');
                                }}
                                className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                <Copy className="w-4 h-4" />
                                <span>Copy link</span>
                            </button>

                            <button
                                onClick={() => setShowShareModal(false)}
                                className="w-full mt-3 text-sm text-zinc-500 hover:text-zinc-700 py-2"
                            >
                                Cancel
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = targetDate.getTime() - new Date().getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const timeUnits = [
        { value: timeLeft.days, label: 'DAYS' },
        { value: timeLeft.hours, label: 'HOURS' },
        { value: timeLeft.minutes, label: 'MINUTES' },
        { value: timeLeft.seconds, label: 'SECONDS' }
    ];

    return (
        <div className="flex items-center justify-center gap-2 sm:gap-4">
            {timeUnits.map((unit, index) => (
                <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
                    <div className="flex flex-col py-4 px-5 rounded-xl bg-gray-100 items-center">
                        <span className="text-4xl sm:text-5xl font-bold text-zinc-900 tabular-nums">
                            {unit.value.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[10px] sm:text-xs text-zinc-400 font-medium tracking-wider">
                            {unit.label}
                        </span>
                    </div>
                    {index < timeUnits.length - 1 && (
                        <span className="text-2xl sm:text-3xl font-light text-zinc-300 -mt-4">:</span>
                    )}
                </div>
            ))}
        </div>
    );
}
