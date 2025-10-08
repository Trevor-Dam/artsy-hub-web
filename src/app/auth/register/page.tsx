"use client";

import { useActionState } from "react";
import { registerUser } from "@/components/server-actions/auth/data";

const initialState = {
    errorMessage: "",
};

export default function RegisterPage() {
    const [state, formAction, pending] = useActionState(registerUser, initialState);
    return (
        <div className="flex-col items-center justify-center min-h-screen p-4 space-y-4 bg-white">
            <form className="mt-4 space-y-4 rounded-lg p-6 shadow-lg"
                id="registerForm" action={formAction}
                >
                <div>
                    <label className="block text-sm font-medium">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Name" required 
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Surname:</label>
                    <input type="text" id="surname" name="surname" placeholder="Surname" required 
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Email" required 
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Password" required 
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required 
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <button type="submit" 
                    className="w-full p-2 bg-violet-600
                     text-white rounded-md" disabled={pending}>Register</button>
                </div>
                <div>
                    <p>Already have an account? <a href="/login">Login here</a></p>
                </div>
                <div>
                    <p>{state?.errorMessage}</p>
                </div>
            </form>
        </div>
    );
}