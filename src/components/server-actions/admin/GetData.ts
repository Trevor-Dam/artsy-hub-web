"use server"
import { fetchData } from "@/routes/api-client";
import { cookies } from "next/headers";

export async function getArtistData(id: number) {
    const cookieStore = await cookies();
    const api = process.env.API_URL;
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return null;
    }

    const response = await fetchData(`/Artists/${id}`, token);

    if (!response) {
        return null;
    }

    return response;
}

export async function getAllArtists() {
    const cookieStore = await cookies();
    const api = process.env.API_URL;
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return null;
    }

    const response = await fetchData('/Artists', token);

    if (!response) {
        return null;
    }

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
    return artists;
}