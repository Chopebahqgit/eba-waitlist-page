'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

const ALL_FOOD_ITEMS = [
    { name: "Jollof Rice Bowl", price: 1200, original: 4000, store: "Chicken Republic", image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=400&fit=crop" },
    { name: "Fresh Bread Loaf", price: 800, original: 2500, store: "Sweet Sensation", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=400&fit=crop" },
    { name: "Sweet Potato Fries", price: 1500, original: 5000, store: "Shoprite Deli", image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=400&fit=crop" },
    { name: "Jollof Rice Special", price: 1800, original: 6000, store: "Mr Biggs", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400&h=400&fit=crop" },
    { name: "Meat Pie (3 pack)", price: 900, original: 2700, store: "Sweet Sensation", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop" },
    { name: "Fried Rice Combo", price: 2200, original: 7500, store: "Chicken Republic", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=400&fit=crop" },
    { name: "Assorted Pastries", price: 1100, original: 3800, store: "Shoprite Bakery", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop" },
    { name: "Grilled Chicken", price: 2800, original: 8000, store: "Chicken Republic", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop" },
    { name: "Mini Loaves (5 pack)", price: 1300, original: 4200, store: "Sweet Sensation", image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=400&fit=crop" },
    { name: "Loaded Fries", price: 1700, original: 5500, store: "Shoprite Deli", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=400&fit=crop" },
    { name: "Rice & Sauce", price: 1600, original: 5200, store: "Mr Biggs", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop" },
    { name: "Dinner Rolls (12 pack)", price: 950, original: 3000, store: "Shoprite Bakery", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&h=400&fit=crop" },
];

export default function WeeklySavings() {
    const [displayedItems, setDisplayedItems] = useState<typeof ALL_FOOD_ITEMS>([]);
    const [totalSavings, setTotalSavings] = useState(0);

    const selectRandomItems = () => {
        const shuffled = [...ALL_FOOD_ITEMS].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 3);
        setDisplayedItems(selected);

        const savings = selected.reduce((acc, item) => acc + (item.original - item.price), 0);
        setTotalSavings(savings);
    };

    useEffect(() => {
        selectRandomItems();

        const interval = setInterval(selectRandomItems, 2500);

        return () => clearInterval(interval);
    }, []);

    const getDiscountPercentage = () => {
        if (displayedItems.length === 0) return "70%";
        const avgOriginal = displayedItems.reduce((acc, item) => acc + item.original, 0) / displayedItems.length;
        const avgPrice = displayedItems.reduce((acc, item) => acc + item.price, 0) / displayedItems.length;
        const discount = Math.round(((avgOriginal - avgPrice) / avgOriginal) * 100);
        return `${discount}%`;
    };

    return (
        <div className="relative max-w-sm mx-auto bg-white rounded-3xl shadow-xl p-6 border border-zinc-100">
            <div className="px-2 pb-4 border-gray-100 mb-2 border-0 border-b-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center">
                        <Image src="/eba-logo.png" alt="EBA" width={20} height={20} className="rounded" />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] text-zinc-400">This week's savings</p>
                        <p className="text-lg font-bold text-zinc-900">₦{totalSavings.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className="">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Available Now</span>
                    <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full">
                        {getDiscountPercentage()} OFF
                    </span>
                </div>
                <div className="space-y-3">
                    {displayedItems.map((item, i) => (
                        <div key={`${item.name}-${i}`} className="flex items-center gap-3 p-2 bg-zinc-50 rounded-xl transition-all">
                            <div className="w-10 h-10 bg-linear-to-br from-orange-100 to-orange-200 rounded-lg overflow-hidden shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-semibold text-zinc-900">{item.name}</p>
                                <p className="text-xs text-zinc-400">{item.store}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-green-700">₦{item.price.toLocaleString()}</p>
                                <p className="text-xs text-zinc-400 line-through">₦{item.original.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}