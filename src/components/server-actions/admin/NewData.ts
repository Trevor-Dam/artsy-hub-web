"use server";

import { postFormData } from "@/routes/api-client";
import axios from "axios";
import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
import https from 'https';
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { buffer } from "stream/consumers";
import { postData } from "@/routes/api-client";


const api = process.env.API_URL;
const agent = new https.Agent({
    keepAlive: true,
    requestCert: false,
    rejectUnauthorized: false, // ⚠️ disables SSL verification
});
export async function createNewArtist(initState: {
    successMessage: string,
    errorMessage: string}, 
    data: FormData):
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<any> {
    ///process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const cookieStore = await cookies();

    const token = cookieStore.get('token')?.value;
    if (!token) {
        redirect('/auth/login', RedirectType.push);
    }
    const name = data.get('name');
    const surname = data.get('surname');
    const style = data.get('style');
    const bio = data.get('bio');
    const age = data.get('age');
    const race = data.get('race');
    const gender = data.get('gender');
    
    const valuesEntered = (name === null || surname === null || style === null || bio === null || age === null || race === null || gender === null);
    if (valuesEntered) {
        initState = {successMessage: '', errorMessage: "All fields are required"};
    }
    const artistData =  {
        Name: name,
        Surname: surname,
        Style: style,
        Bio: bio,
        Age: age,
        Race: race,
        Gender: gender
    };
    try {
        const response = await fetch(`${api}/Artists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(artistData),
            
        });
        if ((response.ok) || (response.status  === 201)) {
            const data = await response.json();
            console.log("Artist added successfully", data);
            initState = {successMessage:"Artist added successfully", errorMessage: ''};
        }
        else {
            console.error("Error adding artist:", response.statusText);
            initState = {successMessage: '', errorMessage: response.statusText || "Error adding artist"};
        }
    } catch (error) {
        console.error("Error adding artist:", error);
        initState = {successMessage: '', errorMessage: "Error adding artist"};
    }
    /*if (initState.errorMessage === '' && initState.successMessage === 'Artist added successfully') {
        // Perform any additional actions here
        redirect('/user/artists', RedirectType.push);
    }*/
}

export async function createNewArtPiece(initState: {
    successMessage: string,
    errorMessage: string}, 
    data: FormData):
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<any> {
    const cookieStore = await cookies();

    const token = cookieStore.get('token')?.value;
    if (!token) {
        return { initState: {successMessage: '', errorMessage: "User not authenticated"} };
        ///redirect('/auth/login', RedirectType.push);
    }

    try {
    const res = await postFormData('/ArtPieces', data, token);
    
        console.log("Art piece added successfully", res);
        return { initState: {successMessage:"Art piece added successfully", errorMessage: ''} };
    } catch (error) {
        console.error("Error adding art piece:", error);
        return { initState: {successMessage: '', errorMessage: error || "Error adding art piece"} };
    }
    }
export async function createNewExhibition(initState: {
    successMessage: string,
    errorMessage: string},
    data: FormData):
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<any> {
    const cookieStore = await cookies();

    const token = cookieStore.get('token')?.value;
    if (!token) {
        return { initState: {successMessage: '', errorMessage: "User not authenticated"} };
    }
    let exhibitionResponse;
    const ExhibitionData = {
        Name: data.get('name'),
        StartDateTime: data.get('startDate'),
        EndDateTime: data.get('endDate'),
        Capacity: data.get('capacity'),
        Category: data.get('category')
    }
    try {
        exhibitionResponse = await postData('/Exhibitions', ExhibitionData, token);
        console.log("Exhibition added successfully", exhibitionResponse);
    } catch (error) {
        console.error("Error adding exhibition:", error);
        return { initState: {successMessage: '', errorMessage: error || "Error adding exhibition"} };
    }
    const displayDataArray = [];
    for (const pair of  data.getAll('artPieces')) {
        const displayData = {
            ExhibitionId: exhibitionResponse.id,
            ArtPieceId: Number(pair),
            Status: 'Available',
            IsSetup: false,
            IsRemoved: false
        };

        displayDataArray.push(displayData);
    }

    try {
        const displayResponse = await postData('/Displays', displayDataArray, token);
        console.log("Display entries added successfully", displayResponse);
        return { initState: {successMessage:"Exhibition and displays added successfully", errorMessage: ''} };
    } catch (error) {
        console.error("Error adding display entries:", error);
        return { initState: {successMessage: '', errorMessage: error || "Error adding display entries"} };
    }
}