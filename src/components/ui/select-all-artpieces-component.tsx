'use server';
import { fetchData } from "@/routes/api-client";
import { cookies } from "next/headers";



const fetcher = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return [];
    }
    const data: {
        id: number;
        name: string;
        description: string;
        artistId: number;
        value: number;
        arturl: string;
        type: string;
        artistName: string;
        artistSurname: string;
    }[] = [];
    try {
        const response = await fetchData('/ArtPieces', token);
        data.push(...response);
    
    return data;
    } catch (error) {
        console.error("Error fetching art pieces:", error);
    }
}

export default async function SelectAllPieceComponent() {
                
        const data = await fetcher();
        return (
            <select name="artPieces" title="Select art pieces" multiple>
                {data && data.map((artPiece: { id: number; name: string; description: string; artistId: number; value: number; arturl: string; type: string; artistName: string; artistSurname: string; }) => (
                    <option key={artPiece.id} value={artPiece.id}>{artPiece.name}</option>
                ))}
            </select>
        )
}
                        