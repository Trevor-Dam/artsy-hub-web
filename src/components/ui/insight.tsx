'use client'
import { Chart as ChartJS, 
    BarElement, 
    LineElement,
    CategoryScale,  
    Title, 
    Tooltip,
    Legend,
    LinearScale,
    PieController,
    ArcElement,
    PointElement
 } from "chart.js";
import dynamic from "next/dynamic";

 import { Bar, Pie } from "react-chartjs-2";
import { AttendanceData } from "../types/attendanceData";

ChartJS.register(
    BarElement, 
    LineElement, 
    CategoryScale,
    LinearScale, 
    Title, 
    Tooltip, 
    Legend,
    PieController,
    ArcElement,
    PointElement
);

const LineChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), 
{ ssr: false });

type attendanceProps = {
    attendance: AttendanceData[];
}

export default function AttendanceInsights({ attendance }: attendanceProps) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Attendance Insights</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <LineChart
                    data={{
                        labels: attendance.map(a => new Date(a.ExhibitionDateTime).toLocaleString()),
                        datasets: [
                            {
                                label: "Total Attendance",
                                data: attendance.map(a => a.TotalAttendance),
                                borderColor: "rgba(75, 192, 192, 1)",
                                backgroundColor: "rgba(75, 192, 192, 0.2)",
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "top",
                            },
                            title: {
                                display: true,
                                text: "Attendance Over Time",
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}
