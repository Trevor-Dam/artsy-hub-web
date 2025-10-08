'use client'
import { useRouter } from "next/navigation";

export default function ViewArtistButton({ id }: { id: number }) {
    const router = useRouter();

    const handlePush = () => {
        router.push(`/artists/${id}`);
    };

    return ( 
        <button className="mt-2 bg-violet-600 text-white py-1 px-2 rounded" type="button" onClick={handlePush}>
            View Artist Details
        </button>
    );
}