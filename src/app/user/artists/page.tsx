"use server" 

import { cookies } from "next/headers";
import https from 'https';
import Link from "next/link";
import ViewArtistButton from "@/components/ui/view-artist-button";
import axios from "axios";
import { fetchData } from "@/routes/api-client";

const agent = new https.Agent({
    keepAlive: true,
    rejectUnauthorized: false, // ⚠️ disables SSL verification
});

async function getArtistData() {
    ///process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    
    const cookieStore = await cookies();
    const api = process.env.API_URL;
    const token = cookieStore.get('token')?.value;
    try {
    const response = await fetchData('/Artists', token ? token : '');

    if (response === null) {
        return <p className="text-black">No artists found.</p>;
    }
    else if (response) {

        const artists: {
            id: number, 
            name: string, 
            surname: string, 
            style: string, 
            bio: string, 
            age: number, 
            race: string, 
            gender: string
        }[] = response;
        if (artists.length === 0) {
            return <p className="text-black">No artists available.</p>;
        }
        return (
            <div className="justify-center items-start text-black">
                {artists.map((artist) => (
                    <div key={artist.id} className="mb-2 border-2 p-4 rounded-xl shadow-xl">
                        <span className="font-medium">{artist.name}</span>
                        <p className="text-black">{artist.style}</p>
                        <p className="text-black">{artist.bio}</p>
                        <div className="flex justify-between text-sm text-black">
                            <span>Age: {artist.age}</span>
                        </div>
                        <ViewArtistButton id={artist.id} />
                    </div>
                ))}
            </div>
        );
    }
    else {
        return <p className="text-red-500">Failed to fetch artists: {response.statusText}</p>;
    }
}
catch (error) {
    console.error("Error fetching artist data:", error);
    return <p className="text-red-500">Error fetching artists.</p>;
}

    
}

export default async function ArtistPage() {
    const artists = await getArtistData();
    return (
        <div>
            <Link href="/user/artists/new" className="text-blue-500 flex-row-reverse hover:underline">
                Create New Artist
            </Link>
            <h1 className="text-4xl font-bold mb-8">Artists</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Artists</h2>
                    {artists}
                </div>
            </div>
        </div>
    );
}