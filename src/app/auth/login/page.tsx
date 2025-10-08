"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser } from "@/components/server-actions/auth/data";
import React, { useCallback, useEffect, useState, useContext, useActionState } from "react";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const initialState = {
        message: '',
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [state, formAction, pending] = useActionState(loginUser, initialState);
    return (
        <div className="flex-col justify-center items-center rounded-2xl shadow-2xl p-24">
            <h1 className="text-4xl font-bold">Login Page</h1>
            <p className="mt-4 text-lg">Please enter your credentials to log in.</p>
            <form className="mt-8 space-y-4" 
            id="loginForm" action={formAction} >
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input type="email" id="email" name="email" 
                    className="mt-1 block w-full p-2 border border-violet-600 rounded-md" 
                    required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password
                    </label>
                    <input type="password" id="password" name="password" 
                    className="mt-1 block w-full p-2 border border-violet-600 rounded-md" 
                    required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit" 
                    className="w-full p-4 m-4 bg-violet-600
                     text-white rounded-lg" disabled={pending}>
                        Log In
                    </button>
                </div>
                <div className="text-center">
                    <p className="mt-4 text-sm text-gray-500">No account? <Link href="/auth/register" className="text-violet-600 hover:underline">Register here</Link>.</p>
                    <p className="mt-4 text-sm text-red-500" id="login-error-message">{state?.message}</p>
                </div>
            </form>
          </div>  
    );
}

