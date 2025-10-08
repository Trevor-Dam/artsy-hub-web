"use server"
import Link from "next/link";
import '../globals.css';
import { cookies } from "next/headers";

import '@/../public/logo.png'

const api = process.env.API_URL;


export default async function UserLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const roles = cookieStore.get('role')?.value;
    const token = cookieStore.get('token')?.value;
    const isAuthenticated = token !== null;
    const isAdmin = ((roles === 'Admin') || (roles === 'Manager'));
    const isClerk = (roles === 'Clerk');
    return (
        <main className="flex-col bg-white font-sans">
            {(isAdmin && isAuthenticated) && (
                    <ul className="flex-wrap flex-row justify-center list-none text-black p-4 m-4 space-y-4 no-underline">
                        <li className=""><Link href="/auth/login" className="hover:text-violet-600 hover:underline">Logout</Link></li>
                        <li className=""><Link href="/user/exhibitions" className="hover:text-violet-600 hover:underline">Exhibitions</Link></li>
                        <li className=""><Link href="/user/artists" className="hover:text-violet-600 hover:underline">Artists</Link></li>
                        <li className=""><Link href="/user/art-pieces" className="hover:text-violet-600 hover:underline">Pieces</Link></li>
                    </ul>
            )} {(isAuthenticated && isClerk) && (
                <ul className="flex-wrap flex-row justify-center list-none text-black p-4 m-4 space-y-4 no-underline">
                    <li className=""><Link href="/auth/login" className="hover:text-violet-600 hover:underline">Logout</Link></li>
                    <li className=""><Link href="/user/exhibitions" className="hover:text-violet-600 hover:underline">Bookings</Link></li>
                    <li className=""><Link href="/user/check-in" className="hover:text-violet-600 hover:underline">Check In</Link></li>
                </ul>
            )}
            <div className="flex-col">
                {children}
            </div>
        </main>
    );
}
