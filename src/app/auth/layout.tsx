'use client';
import Image from "next/image";
import logo from "@/../public/logo.png";
import { logoutUser } from "@/components/server-actions/auth/data";
import { useEffect } from "react";
import '@/app/globals.css';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
    return (
        <main className="flex-row items-center justify-center p-4 space-y-4 bg-white">
            <div className="w-1/2">
                <Image src={logo} alt="Auth Image" width={500} height={500} />
            </div>
            <div>
                {children}
            </div>
        </main>
    )
}