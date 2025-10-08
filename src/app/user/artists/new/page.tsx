"use client"

import { createNewArtist } from "@/components/server-actions/admin/NewData";
import { create } from "domain";
import { useActionState } from "react";

export default function NewArtistPage() {
    const initState = {
        successMessage: '',
        errorMessage: '',
    };
    const race = ['African', 'Asian', 'White', 'Indian', 'Coloured', 'Other'];
    const gender = ['Male', 'Female', 'Non-Binary', 'Other'];
    const [state, formAction, isPending] = useActionState(createNewArtist, initState);
    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Create New Artist</h1>
            <form action={formAction} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
            id="add-artist-form">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input type="text" className="border rounded-lg p-2 w-full" name="name" placeholder="Name"/>
                </div>
                <div>
                    <label className="block text-gray-700">Surname</label>
                    <input type="text" className="border rounded-lg p-2 w-full" name="surname" placeholder="Surname"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Style</label>
                    <input type="text" className="border rounded-lg p-2 w-full" name="style" placeholder="Style"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Bio</label>
                    <textarea className="border rounded-lg p-2 w-full" name="bio" placeholder="Bio" />
                </div>
                <div>
                    <label className="block text-gray-700">Age</label>
                    <input type="number" className="border rounded-lg p-2 w-full" name="age" placeholder="Age"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Race</label>
                    <select title="Select race" name="race" className="border rounded-lg p-2 w-full">
                        {race.map((value, index) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Gender</label>
                    <select title="Select gender" name="gender" className="border rounded-lg p-2 w-full">
                        {gender.map((value, index) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-violet-600 text-white rounded-lg px-4 py-2"
                    disabled={isPending}>
                    Create Artist
                </button>
                <p className="mt-4 text-black bg-green-500">{state?.successMessage}</p>
                <p className="mt-4 text-red-500">{state?.errorMessage}</p>
            </form>
        </div>
    );
}