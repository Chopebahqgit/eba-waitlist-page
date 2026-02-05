import { DeviceInfo } from "@/src/types";
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getDeviceInfo(): DeviceInfo {
    const ua = navigator.userAgent;

    let browser = 'Unknown';
    if (ua.includes('Firefox/')) {
        browser = 'Firefox';
    } else if (ua.includes('Edg/')) {
        browser = 'Edge';
    } else if (ua.includes('Chrome/')) {
        browser = 'Chrome';
    } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
        browser = 'Safari';
    } else if (ua.includes('Opera') || ua.includes('OPR/')) {
        browser = 'Opera';
    }

    let os = 'Unknown';
    if (ua.includes('Windows NT 10')) os = 'Windows 10/11';
    else if (ua.includes('Windows NT 6.3')) os = 'Windows 8.1';
    else if (ua.includes('Windows NT 6.2')) os = 'Windows 8';
    else if (ua.includes('Windows NT 6.1')) os = 'Windows 7';
    else if (ua.includes('Mac OS X')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    let device = 'Desktop';
    if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
        if (/iPad|Tablet/i.test(ua)) {
            device = 'Tablet';
        } else {
            device = 'Mobile';
        }
    }

    return {
        browser,
        os,
        device,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
}

