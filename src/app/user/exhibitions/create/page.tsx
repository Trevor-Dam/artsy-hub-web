'use client' 

import useSWR from 'swr';
import { useState, useEffect, Suspense, useActionState } from 'react';

import { createNewExhibition } from '@/components/server-actions/admin/NewData';

export default function CreateExhibitionPage() {
    const initState = {successMessage: '', errorMessage: ''};
    const [state, formAction, isPending] = useActionState(createNewExhibition, initState);
    return (
        <div className="container mx-auto p-4 bg-white min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Create New Exhibition</h1>
            <div>
                <h1>Create New Exhibition</h1>
                <form action={formAction} className="flex flex-col gap-4 border-2 p-4 rounded-xl shadow-xl">
                    <label>
                        Exhibition Name:
                        <input type="text" name="name" required />
                    </label>    
                    <br />
                    <label>
                        Start Date:
                        <input type="datetime-local" name="startDate" 
                        max={"2025-10-31T23:00"} required />
                    </label>
                    <br />
                    <label>
                        End Date:
                        <input type="datetime-local" name="endDate" 
                        max={"2025-12-31T23:00"} required />
                    </label>
                    <br />
                    <label>
                        Capacity:
                        <input type="number" name="capacity" required />
                    </label>
                    <br />
                    <label>
                        Category:
                        <input type="text" name="category" required />
                    </label>
                    <br />
                    <button type="submit" disabled={isPending}
                    className="bg-violet-600 text-white py-2 px-4 rounded-xl">Create Exhibition</button>
                </form>
                <p className="bg-green-500 text-black">{state.successMessage}</p>
                <p className="text-red-500">{state.errorMessage}</p>
                {isPending && <p>Creating exhibition...</p>}
            </div>
        </div>
    );

    
}