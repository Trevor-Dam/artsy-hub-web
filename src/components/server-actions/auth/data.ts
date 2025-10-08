/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { postWithoutToken } from "@/routes/api-client";
import axios from "axios";
import https from 'https';
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { FormEvent } from "react";

const agent = new https.Agent({
    keepAlive: true,
    rejectUnauthorized: false, // ⚠️ disables SSL verification
});

const apiUrl = process.env.API_URL;

export async function loginUser(currentState: { message: string}, form: FormData): Promise<any> {
    const cookieStore = await cookies();
    await logoutUser(); 
    const email = form.get('email');
    const password = form.get('password');
    if (email === null || password === null) {
        return { currentState: { message: "Email and password are required" } };
    }
    const loginData = {
        Email: email,
        Password: password
    }
    try {
        const response = await postWithoutToken('/Users/Login', loginData);
        const data = response;
        if (data && data.token) {

            console.log("Login successful:", data);
            cookieStore.set({
                name: 'token',
                value: data.token,
            });
            cookieStore.set('role', data.role);
            cookieStore.set('name', data.name);
            cookieStore.set('surname', data.surname);
            currentState =  { message: "Login successful" };
        }
        else {
             currentState =  { message: "Invalid email or password"  };
        }
        
    } catch (error) {
        console.error("Login error:", error);
        currentState = { message: "An error occurred during login. Please try again." };
    }
    if (currentState.message === "Login successful") {
        redirect("/user/exhibitions", RedirectType.push);
    }
}

export async function registerUser(
    prevState: { errorMessage: string },
    formData: FormData
): Promise<any> {
    ///await logoutUser();
    //const formData = new FormData(form.currentTarget);
    let email;
    let name;
    let surname;
    let password;
    let confirmPassword;
    const hasValues = formData.has('email') && formData.has('name') && formData.has('surname') && formData.has('password') && formData.has('confirmPassword');
    if (hasValues) {
        email = formData.get('email');
        name = formData.get('name');
        surname = formData.get('surname');
        password = formData.get('password');
        confirmPassword = formData.get('confirmPassword');
    } else {
        return {prevState: {errorMessage: "All fields are required"}, message: "All fields are required" };
    }

    const cookie = await cookies();

    const authenticatedRole = cookie.get('role')?.value;

    let role = '';

    if (authenticatedRole === 'Admin' || authenticatedRole === 'Manager') {
        role = 'Manager';
    } else {
        role = 'Clerk';
    }

    await logoutUser();

    const registerRequest = {
        Name: name,
        Surname: surname,
        Email: email,
        Password: password,
        ConfirmPassword: confirmPassword,
        Role: role
    };
    try {
        const response = await postWithoutToken('/Users/Register', registerRequest);
        console.log("Registration successful:", response);
        return { prevState: { errorMessage: "" }, message: "Registration successful. Please log in." };
    } catch (error: any) {
        console.error("Registration error:", error);
        let errorMessage = "An error occurred during registration. Please try again.";      
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        return { prevState: { errorMessage }, message: errorMessage };
    }
}

export async function getUserData(token: string): Promise<any> {
    try {
        const response = await axios.get(`${apiUrl}/Users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            httpsAgent: agent,
        });
        console.log("User data retrieved successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving user data:", error);
        throw error;
    }
}

export async function logoutUser(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    cookieStore.delete('role');
    cookieStore.delete('name');
    cookieStore.delete('surname');
}