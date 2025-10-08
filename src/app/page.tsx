"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/../public/logo.png";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to My Next.js App!</h1>
      <p className="mt-4 text-lg">This is a simple example of a Next.js application.</p>
      <Image
        src={logo}
        alt="Next.js Logo"
        width={200}
        height={200}
        className="mt-8"
      />
      <button className="mt-8 p-2 bg-violet-600 text-white rounded-md" 
      type="button" onClick={() => router.push('/auth/login')}>
        Login
      </button>
      <button className="mt-8 p-2 bg-violet-600 text-white rounded-md" 
      type="button" onClick={() => router.push('/auth/register')}>
        Register
      </button>
    </main>
  );
}
