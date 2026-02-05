export interface DeviceInfo {
    browser: string;
    os: string;
    device: string;
    language: string;
    timezone: string;
}

export interface WaitlistData {
    email: string;
    fullName: string;
    whatsappNumber: string;
    deviceInfo?: DeviceInfo;
}
