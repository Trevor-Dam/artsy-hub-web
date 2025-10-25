"use server";
import { fetchData } from "@/routes/api-client";
import { cookies } from "next/headers";

export default async function SelectArtistElement() {
    const cookieStore = await cookies();
    const api = process.env.API_URL;
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return <p>Please log in to select an artist.</p>;
    }

    try {
        const response = await fetchData(`/Artists`, token);

        
            const artists: {
                id: number, 
                name: string, 
                surname: string,
                style: string,
                bio: string,
                age: number,
                gender: string,
                race: string
            }[] = response;
            
            return (
                <select title="artist" name="artist" required className="border border-gray-300 p-2 w-full">
                    {artists.map((artist) => (
                        <option key={artist.id} value={artist.id}>
                            {artist.name} {artist.surname}
                        </option>
                    ))}
                </select>
            );
        
    } catch (error) {
        console.error("Error fetching artist data:", error);
        return <p>Error fetching artists.</p>;
    }
}