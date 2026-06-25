"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function AnalyticsChart() {
    const data = [
        { time: "11:45", requests: 20, blocked: 5 },
        { time: "11:50", requests: 30, blocked: 8 },
        { time: "11:55", requests: 40, blocked: 10 },
        { time: "12:00", requests: 35, blocked: 8 },
    ];

    return (
        <div className="text-xl font-bold text-gray-900 mb-4">

            <h2 className="font-semibold mb-4">
                Requests Overview
            </h2>

            <ResponsiveContainer
                width="100%"
                height={280}
            >
                <LineChart data={data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="requests"
                        stroke="#4F46E5"
                    />

                    <Line
                        type="monotone"
                        dataKey="blocked"
                        stroke="#EF4444"
                    />
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}