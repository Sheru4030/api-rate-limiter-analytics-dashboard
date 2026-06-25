"use client";

import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import StatCard from "./statcard";
import AnalyticsChart from "./analyticschart";
import DistributionChart from "./distributionchart";
import RequestTable from "./requesttable";
import Copilot from "./copilot";

type Theme = "light" | "dark";

export default function Dashboard() {
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    const [analytics, setAnalytics] = useState({
        totalRequests: 0,
        blockedRequests: 0,
        activeUsers: 0,
    });

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        setTheme(savedTheme === "dark" ? "dark" : "light");
        setMounted(true);
    }, []);

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                const response = await fetch("/api/analytics");
                const data = await response.json();

                setAnalytics({
                    totalRequests: data.totalRequests,
                    blockedRequests: data.blockedRequests,
                    activeUsers: data.activeUsers,
                });
            } catch (error) {
                console.error("Failed to load analytics:", error);
            }
        };

        loadAnalytics();

        const interval = setInterval(loadAnalytics, 10000);

        return () => clearInterval(interval);
    }, []);


    const toggleTheme = () => {
        setTheme((currentTheme) => {
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            localStorage.setItem("theme", nextTheme);
            return nextTheme;
        });
    };

    if (!mounted) {
        return null;
    }

    const isDark = theme === "dark";

    const pageBackground = isDark ? "bg-slate-950" : "bg-slate-100";
    const cardBackground = isDark ? "bg-slate-900" : "bg-white";
    const titleText = isDark ? "text-white" : "text-gray-900";
    const bodyText = isDark ? "text-slate-300" : "text-gray-600";
    const mutedText = isDark ? "text-slate-400" : "text-gray-500";
    const buttonBackground = isDark ? "bg-slate-800" : "bg-white";

    return (
        <div
            className={`flex min-h-screen transition-colors duration-300 ${pageBackground}`}
        >
            <Sidebar />

            <main className="flex-1 p-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className={`text-4xl font-bold ${titleText}`}>
                            Analytics Dashboard
                        </h1>

                        <p className={`mt-2 ${bodyText}`}>
                            Overview of API usage and rate limiting statistics
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-lg shadow transition hover:scale-105 ${buttonBackground}`}
                        >
                            {isDark ? "☀️" : "🌙"}
                        </button>

                        <div
                            className={`flex items-center gap-3 rounded-xl px-4 py-2 shadow transition-colors ${cardBackground}`}
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                                A
                            </div>

                            <div>
                                <p className={`text-sm font-semibold ${titleText}`}>Admin</p>

                                <p className={`text-xs ${mutedText}`}>Administrator</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <StatCard title="Total Requests" value={analytics.totalRequests} />
                    <StatCard title="Blocked Requests" value={analytics.blockedRequests} />
                    <StatCard title="Active Users" value={analytics.activeUsers} />
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div
                        className={`rounded-2xl p-6 shadow-sm transition-colors ${cardBackground}`}
                    >
                        <AnalyticsChart />
                    </div>

                    <div
                        className={`rounded-2xl p-6 shadow-sm transition-colors ${cardBackground}`}
                    >
                        <DistributionChart />

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-indigo-500" />
                                <span className={`text-sm ${bodyText}`}>Allowed Requests</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                <span className={`text-sm ${bodyText}`}>Blocked Requests</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`rounded-2xl p-6 shadow-sm transition-colors ${cardBackground}`}
                >
                    <RequestTable />
                </div>

                <Copilot />
            </main>
        </div>
    );
}