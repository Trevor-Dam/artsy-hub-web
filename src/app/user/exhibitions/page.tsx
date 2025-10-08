"use server"

import { cookies } from "next/headers";
import { Suspense } from "react";
import axios from "axios";
import https from 'https';
import { fetchData } from "@/routes/api-client";
import Link from "next/link";

const agent = new https.Agent({
    keepAlive: true,
    rejectUnauthorized: false, // ⚠️ disables SSL verification
});

export async function getExhibitionData() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
            return <p className="text-red-500">You must be logged in to view exhibitions.</p>;
        }
    const api = process.env.API_URL;
    ///process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try { 
        const response = await fetchData('/Exhibitions', token);
        if (response === null) {
            return <p className="text-black">No exhibitions found.</p>;
        }
        else if (response) {
        const data = response;
        const exhibitions = [data];
        const role = cookieStore.get('role')?.value;
        const isAdmin = role === 'Admin' || role === 'Manager';
        return (
            <div className="list-disc list-inside">
                {isAdmin && (
                    <Link href="/user/exhibitions/create" className="text-blue-500 hover:underline mb-4 inline-block">
                        Create New Exhibition
                    </Link>
                )}
                {exhibitions.map((exhibition) => (
                    <div key={exhibition.id} className="mb-2">
                        <span className="font-medium">{exhibition.title}</span>
                        <p className="text-gray-500">{exhibition.date}</p>
                        <p>{exhibition.description}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{exhibition.date}</span>
                            <span>{exhibition.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    else {
        return <p className="text-red-500">Failed to fetch exhibitions: {response.statusText}</p>;
    }
    } catch (error) {
        console.error("Error fetching exhibition data:", error);
        return <p className="text-red-500">Error fetching exhibitions.</p>;
    }
}

export default async function ExhibitionPage() {
    const exhibitions = await getExhibitionData();
    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Exhibitions</h1>
            <Link href="/user/exhibitions/create" className="text-blue-500 hover:underline mb-4 inline-block">
                Create New Exhibition
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Exhibitions</h2>
                    {exhibitions}
                </div>
            </div>
        </div>
    );
}