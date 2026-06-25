"use client";

import Sidebar from "@/components/sidebar";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />

            <main className="flex-1 p-8">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900">
                        About Rate Limiter Dashboard
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Monitor API traffic, detect excessive requests, and review rate
                        limiting activity.
                    </p>

                    <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900">
                            What this project does
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600">
                            This dashboard tracks API requests and blocks users who exceed
                            the configured request limit. It helps developers monitor
                            traffic, identify repeated requests, and protect API endpoints
                            from misuse.
                        </p>
                    </section>

                    <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Main Features
                        </h2>

                        <ul className="mt-4 list-disc space-y-3 pl-6 text-gray-600">
                            <li>Rate limiting based on user IP address</li>
                            <li>Allowed and blocked request tracking</li>
                            <li>MongoDB request history storage</li>
                            <li>Analytics dashboard with request statistics</li>
                            <li>Request history table for recent API activity</li>
                            <li>Dark and light dashboard theme toggle</li>
                        </ul>
                    </section>

                    <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Technology Used
                        </h2>

                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-xl bg-slate-100 p-4">
                                <p className="font-semibold text-gray-900">Frontend</p>
                                <p className="mt-1 text-sm text-gray-600">
                                    Next.js, React, TypeScript, Tailwind CSS
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-100 p-4">
                                <p className="font-semibold text-gray-900">Backend</p>
                                <p className="mt-1 text-sm text-gray-600">
                                    Next.js API Routes and MongoDB
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}