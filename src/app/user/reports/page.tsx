'use server'
import { cookies } from "next/headers";
import { fetchData } from "@/routes/api-client";
import { AttendanceData } from "@/components/types/attendanceData";
import AttendanceInsights from "@/components/ui/insight";

export async function getAttendanceData(): Promise<AttendanceData[]> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';
    return fetchData('/Bookings/Insights', token);
}

export default async function ReportsPage() {
    const attendance = await getAttendanceData();
    return (
        <div className="container mx-auto p-4 bg-white min-h-screen">
            <h1>Attendance Reports</h1>
            <AttendanceInsights attendance={attendance} />
        </div>
    );
}
