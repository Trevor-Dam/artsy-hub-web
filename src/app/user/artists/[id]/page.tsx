"use server"
import { getArtistData } from "@/components/server-actions/admin/GetData";

export default async function ArtistDetailsPage({ 
    params 
}: { 
    params: Promise<{ id: number }>
}) {
    const { id } = await params;
    let artists = <p>Loading artist details...</p>;
    const currentArtists = await getArtistData(id);
    try {
            artists = (
                <div>
                    <h2>{currentArtists.name} {currentArtists.surname}</h2>
                    <p>{currentArtists.bio}</p>
                    <p>Age: {currentArtists.age}</p>
                    <p>Style: {currentArtists.style}</p>
                </div>
            );
        }
    catch (error) {
        console.error("Error fetching artist details:", error);
        artists = <p className="text-red-500">Error fetching artist details.</p>;
    }
    return (
        <div>
            <h1>Artist Details</h1>
            {artists}
        </div>
    );
}

