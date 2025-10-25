'use server'
import { fetchData, putData } from '@/routes/api-client';
import { cookies } from 'next/headers';

const state: { 
    successMessage: string; 
    errorMessage: string 
} = 
    { successMessage: '', 
        errorMessage: ''
     };
    const userBookings: {
        id: number;
        exhibition: Exhibition;
        userId: number;
        userName: string;
        userSurname: string;
        userEmail: string;
        numGuests: number;
    }[] = [];
    const guestBookings: {
        guestId: number;
        guestName: string;
        guestSurname: string;
        guestEmail: string;
    }[] = [];
    let exhibitionId = 0;
    const fetchBookings = async (token: string) => {
        try {
            const bookings = await fetchData('/Bookings', token);
            userBookings.push(...bookings);
            console.log(userBookings);
            exhibitionId = userBookings[0]?.exhibition.id || 0;
        }
        catch (error) {
            console.error("Error fetching bookings:", error);
        }

        try {
            const guests = await fetchData(`/Guests/${exhibitionId}`, token);
            guestBookings.push(...guests);
            console.log(guestBookings);
        }
        catch (error) {
            console.error("Error fetching guest bookings:", error);
        }
        
        return (
            <form action={putBooking}>
                {userBookings && (
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold mb-2">Your Bookings for Today:</h2>
                        {userBookings.map((booking) => (
                            <div key={booking.id} className="mb-2 border-2 p-4 rounded-xl shadow-xl">
                                <p className="font-medium">Exhibition: {booking.exhibition.name}</p>
                                <p className="text-black">Name: {booking.userName}</p>
                                <p className="text-black">Surname: {booking.userSurname}</p>
                                <label className="text-black">Has the user checked in?
                                    <input type="checkbox" className="ml-2" name={`isCheckedIn_${booking.id}`} />
                                </label>
                                {guestBookings.length > 0 && (
                                    <div className="mt-2">
                                        <p className="font-medium">Guests:</p>
                                        {guestBookings.map((guest) => (
                                            <div key={guest.guestId} className="mb-2 border-2 p-4 rounded-xl shadow-xl">
                                                <p className="text-black">Name: {guest.guestName}</p>
                                                <p className="text-black">Surname: {guest.guestSurname}</p>
                                                <p className="text-black">Email: {guest.guestEmail}</p>
                                                <label className="text-black">Has the guest checked in?
                                                    <input type="checkbox" className="ml-2" name={`isCheckedIn_${guest.guestId}`} />
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                <button type="submit" className="mt-4 bg-violet-600 text-white p-2 rounded-md">Check In</button>
            </form>
        )
    }

async function putBooking(data: FormData) {
    'use server'
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const putBookings: {
        bookingId: number;
        exhibitionId: number;
        userId: number;
        isConfirmed: boolean;
        isDeleted: boolean;
        numGuests: number;
    }[] = [];
    const putGuests: {
        id: number;
        name: string;
        surname: string;
        email: string;
        hasAttended: boolean;
    }[] = [];
    for (const bookings of userBookings) {
        const isCheckedIn = data.get(`isCheckedIn_${bookings.id}`) === 'on' ? true : false;
        putBookings.push({
            bookingId: bookings.id,
            exhibitionId: bookings.exhibition.id,
            userId: bookings.userId,
            isConfirmed: isCheckedIn,
            isDeleted: false,
            numGuests: bookings.numGuests
        });

    }
    for (const guests of guestBookings) {
        const isCheckedIn = data.get(`isCheckedIn_${guests.guestId}`) === 'on' ? true : false;
        putGuests.push({
            id: guests.guestId,
            hasAttended: isCheckedIn,
            name: guests.guestName,
            surname: guests.guestSurname,
            email: guests.guestEmail,
        });
    }

    try {
        const responseBookings = await putData(`/Bookings/${exhibitionId}`, putBookings, token!);
        console.log('Bookings updated successfully:', responseBookings);
        state.successMessage = 'Check-in successful!';
    } catch (error) {
        console.error('Error updating bookings:', error);
        state.errorMessage = 'Failed to update bookings.';
    }
    try {
        const responseGuests = await putData(`/Guests/`, putGuests, token!);
        console.log('Guests updated successfully:', responseGuests);
        state.successMessage = 'Check-in successful!';
    } catch (error) {
        console.error('Error updating guests:', error);
        state.errorMessage = 'Failed to update guests.';
    }
}

export default async function CheckInPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return <p className="text-black">You must be logged in to view this page.</p>;
    }
    const bookingsForm = await fetchBookings(token);
    return (
        <div className="container mx-auto p-4 bg-white min-h-screen">
            <h1 className="text-4xl font-bold mb-8">User Check-In Page</h1>
            {bookingsForm}
        </div>
    );
}