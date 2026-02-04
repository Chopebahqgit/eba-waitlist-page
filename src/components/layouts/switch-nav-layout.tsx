'use client';

import { ReactNode } from 'react';

interface SwitchNavBarProps {
    children?: ReactNode;
}

export default function SwitchNavBar({ children }: SwitchNavBarProps) {
    return <>{children}</>;
}
