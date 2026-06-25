"use client";

import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

type Analytics = {
    totalRequests: number;
    blockedRequests: number;
    activeUsers: number;
};

const COLORS = [
    "#4F46E5",
    "#EF4444",
];

export default function DistributionChart() {
    const [analytics, setAnalytics] = useState<Analytics>({
        totalRequests: 0,
        blockedRequests: 0,
        activeUsers: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadAnalytics() {
            try {
                const response = await fetch("/api/analytics", {
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Failed to load analytics");
                }

                const data: Analytics = await response.json();

                setAnalytics(data);
                setError(null);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        }

        loadAnalytics();

        const intervalId = setInterval(loadAnalytics, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const total = analytics.totalRequests;
    const blocked = analytics.blockedRequests;
    const allowed = Math.max(total - blocked, 0);

    const allowedPercentage =
        total > 0 ? Math.round((allowed / total) * 100) : 0;

    const blockedPercentage =
        total > 0 ? Math.round((blocked / total) * 100) : 0;

    const data = [
        { name: "Allowed", value: allowed },
        { name: "Blocked", value: blocked },
    ];

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <p className="text-gray-600">Loading analytics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <p className="text-red-500">
                    Analytics error: {error}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                Request Distribution
            </h2>

            <div className="flex flex-col items-center">
                <PieChart width={300} height={250}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        dataKey="value"
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                </PieChart>

                <div className="w-full mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-600" />

                        <span className="text-gray-800">
                            Allowed Requests
                        </span>

                        <span className="ml-auto font-semibold text-gray-900">
                            {allowed} ({allowedPercentage}%)
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500" />

                        <span className="text-gray-800">
                            Blocked Requests
                        </span>

                        <span className="ml-auto font-semibold text-gray-900">
                            {blocked} ({blockedPercentage}%)
                        </span>
                    </div>

                    <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between text-gray-700">
                            <span>Total Requests</span>

                            <span className="font-bold text-gray-900">
                                {total}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}