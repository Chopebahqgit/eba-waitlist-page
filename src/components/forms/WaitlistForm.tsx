'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { FaWhatsapp, FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { joinWaitlist } from '@/src/app/actions';
import { cn, getDeviceInfo } from '@/src/lib/utils';
import { DeviceInfo } from '@/src/types';


export default function WaitlistForm() {
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

        const result = await joinWaitlist({
            email,
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

    return (
        <div className="w-full">
            {/* Share Modal */}
            <AnimatePresence>
                {showShareModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
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
                                className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold py-3 px-4 rounded-xl transition-all"
                            >
                                📋 Copy link
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

            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center p-6 bg-green-50 border border-green-100 rounded-2xl text-center"
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-900 mb-1">You're on the list! 🎉</h3>
                        <p className="text-green-700 text-sm mb-6">Check your email for your welcome message</p>

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <button
                                onClick={() => setShowShareModal(true)}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-all"
                            >
                                Invite a friend
                            </button>
                            <button
                                onClick={() => setStatus('idle')}
                                className="flex-1 bg-white hover:bg-green-50 text-green-700 border border-green-200 font-semibold py-3 px-6 rounded-full transition-all"
                            >
                                Add another
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleSubmit}
                    >
                        <div className="flex relative flex-col sm:flex-row gap-3">
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Your email address"
                                className="flex-1 px-4 py-3.5 rounded-full border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all text-zinc-900 placeholder:text-zinc-400 text-sm"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className={cn(
                                    "flex sm:absolute sm:bottom-0 sm:top-0 sm:right-0 items-center justify-center gap-2 py-3.5 px-6 rounded-full text-white font-semibold transition-all text-sm whitespace-nowrap",
                                    "bg-zinc-900 hover:bg-zinc-800",
                                    "disabled:opacity-70 disabled:cursor-not-allowed"
                                )}
                            >
                                {status === 'loading' ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>Join waitlist</>
                                )}
                            </button>
                        </div>

                        {status === 'error' && (
                            <p className="text-sm text-red-500 text-center">{message}</p>
                        )}
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
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
