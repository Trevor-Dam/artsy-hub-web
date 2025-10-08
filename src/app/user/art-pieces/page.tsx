/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { fetchData } from "@/routes/api-client";

const api = process.env.API_URL;

export default async function ArtPiecesPage() {
    const cookieStore = await cookies();
    const roles = cookieStore.get('role')?.value;
    const token = cookieStore.get('token')?.value;

    const isAuthenticated = token !== null;

    let artPieces = <p>Loading art pieces...</p>;

    if (!isAuthenticated || (roles !== 'Admin' && roles !== 'Manager')) {
        artPieces = (
            <div>
                <h1>Access Denied</h1>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    } else {
        try {
            const res = await fetchData('/ArtPieces', token ? token : '');
            if (res === null) {
                return <p className="text-black">No art pieces found.</p>;
            }

            const pieces: {
                id: number,
                name: string,
                description: string,
                artistId: number,
                type: string,
                artistName: string,
                artistSurname: string,
                value: string,
                arturl: string
            }[] = res;
           
            
            artPieces = (
                <div>
                    <h1>Art Pieces</h1>
                    {pieces.map((piece) => (
                        <div key={piece.id} className="mb-2 border-2 p-4 rounded-xl shadow-xl">
                            <Image src={piece.arturl} alt={piece.name} width={100} height={100} className="mb-2" />
                            <p className="font-medium">{piece.name} </p>
                            <p className="text-black">By: {piece.artistName} {piece.artistSurname}</p>
                            <p className="text-black">{piece.description}</p>
                            <p className="text-black">Type: {piece.type}</p>
                            <div className="flex justify-between text-sm text-black">
                                <span>Value: R{piece.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        catch (error) {
            console.error("Error fetching art pieces:", error);
            artPieces = <p className="text-red-500">Error fetching art pieces.</p>;
        }
    }

    return(
        <div className="p-4 bg-white h-screen">
            <Link href="/user/art-pieces/add" className="text-violet-600 underline">Add Art Piece</Link>
            <div className="mt-4 shadow-lg p-4 rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-black">Art Pieces</h1>
                {artPieces}
            </div>
        </div>
    )
}