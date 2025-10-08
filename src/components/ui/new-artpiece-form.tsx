"use client";
//import { getAllArtists } from "@/app/api/resources/admin/GetData";
import { createNewArtPiece } from "@/components/server-actions/admin/NewData";
import SelectArtistElement from "@/components/ui/select-artist-element";
import { get } from "http";
import { Suspense, useActionState, useEffect, useRef, useState } from "react";

export default function AddArtPieceForm({ children }
    : { 
        children: React.ReactNode 
    }) {
    const initState = {
        successMessage: '',
        errorMessage: ''
    };

    const [state, formAction, isPending] = useActionState(createNewArtPiece, initState);

    return (
        <div className="min-h-screen bg-white p-8">
            <form className="max-w-lg mx-auto p-4 rounded-xl shadow-md"
            action={formAction}>
                <h1 className="text-2xl font-bold mb-4 text-black">Add New Art Piece</h1>
                <div className="mb-4">
                    <label className="block text-black mb-2" htmlFor="name">Title</label>
                    <input className="border border-gray-300 p-2 w-full" type="text" id="name" name="name" placeholder="Enter art piece name" required
                     />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2" htmlFor="description">Description</label>
                    <textarea className="border border-gray-300 p-2 w-full" id="description" name="description" required
                    />
                   
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2" htmlFor="artist">Artist</label>
                    
                        {children}
                    
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2" htmlFor="type">Style</label>
                    <input className="border border-gray-300 p-2 w-full" type="text" id="type" name="type" required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2" htmlFor="value">Value</label>
                    <input className="border border-gray-300 p-2 w-full" type="number" id="value" name="value" required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2" htmlFor="artifact">Image</label>
                    <input className="border border-gray-300 p-2 w-full" type="file" accept="image/png, image/jpeg" id="artifact" name="artifact" required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2" htmlFor="isAvailable">Available for Display</label>
                    <input className="border border-gray-300 p-2" type="checkbox" id="isAvailable" name="isAvailable" defaultChecked
                     />
                </div>
                <button className="bg-violet-600 text-white p-2 rounded" type="submit"
                disabled={isPending}>Add Art Piece</button>
                {isPending && <p className="text-violet-600 mt-2">Submitting...</p>}
                {state?.errorMessage && <p className="text-red-500 mt-2">{state?.errorMessage}</p>}
                {state?.successMessage && <p className="text-green-500 mt-2">{state?.successMessage}</p>}
            </form>
        </div>
    );
}