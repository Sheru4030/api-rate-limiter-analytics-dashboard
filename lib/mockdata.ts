import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        totalRequests: 150,
        blockedRequests: 30,
        activeUsers: 18,

        chartData: [
            { time: "11:45", requests: 20, blocked: 5 },
            { time: "11:50", requests: 30, blocked: 8 },
            { time: "11:55", requests: 40, blocked: 10 },
            { time: "12:00", requests: 35, blocked: 8 },
        ],

        requestTable: [
            {
                time: "12:00 PM",
                user: "192.168.1.1",
                endpoint: "/api/send-otp",
                status: "Allowed",
                responseTime: "120 ms",
            },
            {
                time: "12:01 PM",
                user: "192.168.1.2",
                endpoint: "/api/send-otp",
                status: "Blocked",
                responseTime: "4 ms",
            },
        ],
    });
}