'use server'

import { fetchData, putData } from "@/routes/api-client";
import { cookies } from "next/headers";
import Image from "next/image";

const piecesOnDisplay: {
        id: number;
        name: string;
        artistName: string;
        artistSurname: string;
        category: string;
        description: string;
        isSetUp: boolean;
        isRemoved: boolean;
        imageUrl: string;
    }[] = [];

const fetchPiecesToDisplay = async () => {
    const cookie = await cookies();
    const token = cookie.get('token')?.value || '';
    

    // Fetch data from an API or database
    try {
        const response = await fetchData('/Displays', token)
        piecesOnDisplay.push(response)
    } catch (error) {
        console.error('Error fetching pieces:', error);
    }

    // Map the fetched data to the piecesOnDisplay array
    return (
        <>
        {piecesOnDisplay.length > 0 ? (
        <form action={putPieceSetup}>
            {piecesOnDisplay.map((piece) => (
                <div key={piece.id}>
                    <h2>{piece.name}</h2>
                    <p>Artist: {piece.artistName} {piece.artistSurname}</p>
                    <p>Category: {piece.category}</p>
                    <p>Description: {piece.description}</p>
                    <Image src={piece.imageUrl} alt={piece.name} />
                    <label>
                        Is Set Up:
                        <input type={`checkbox_${piece.id}`} checked={piece.isSetUp} />
                    </label>
                    {piece.isSetUp && (
                        <label>
                            Is Removed:
                            <input type={`checkbox_removed_${piece.id}`} checked={piece.isRemoved} />
                        </label>
                    )}
                </div>
            ))}
        </form>) : (
            <p>No pieces to display.</p>
        )}
        </>
    );
}

async function putPieceSetup(formData: FormData) {
    'use server'
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';
    const putPieces: {
        id: number;
        isSetUp: boolean;
        isRemoved: boolean;
    }[] = [];

    for (const piece of piecesOnDisplay) {
        const isSetUp = formData.get(`checkbox_${piece.id}`) === 'on' ? true : false;
        const isRemoved = formData.get(`checkbox_removed_${piece.id}`) === 'on' ? true : false;
        putPieces.push({
            id: piece.id,
            isSetUp: isSetUp,
            isRemoved: isRemoved
        });
    }
    try {
        const response = await putData('/Displays', putPieces, token);
        console.log(response);
    } catch (error) {
        console.error('Error updating pieces:', error);
    }
}

export default async function ArtistSetUpPage() {
    const pieces = await fetchPiecesToDisplay();
    return (
        <div>
            <h1>Artist Set Up</h1>
            {pieces}
        </div>
    );
}