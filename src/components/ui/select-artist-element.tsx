"use server";
import { cookies } from "next/headers";

export default async function SelectArtistElement() {
    const cookieStore = await cookies();
    const api = process.env.API_URL;
    const token = cookieStore.get('token')?.value;

    try {
        const response = await fetch(`${api}/Artists`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const artists: {
                id: number, 
                name: string, 
                surname: string,
                style: string,
                bio: string,
                age: number,
                gender: string,
                race: string
            }[] = await response.json();
            
            return (
                <select title="artist" name="artist" required className="border border-gray-300 p-2 w-full">
                    {artists.map((artist) => (
                        <option key={artist.id} value={artist.id}>
                            {artist.name} {artist.surname}
                        </option>
                    ))}
                </select>
            );
        } else {
            console.error("Failed to fetch artists:", response.statusText);
            return <p>Error fetching artists.</p>;
        }
    } catch (error) {
        console.error("Error fetching artist data:", error);
        return <p>Error fetching artists.</p>;
    }
}