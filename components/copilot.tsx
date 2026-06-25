"use client";

import { useState, useEffect, useRef } from "react";

export default function Copilot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! I'm your Rate Limit Copilot. Ask me about dashboard analytics.",
        },
    ]);

    // 1. Create a reference anchor for the bottom of the chat
    const chatBottomRef = useRef<HTMLDivElement | null>(null);

    const quickQuestions = [
        "Today's Summary",
        "Why were requests blocked?",
        "Show active users",
        "Current rate limit",
        "Traffic insights",
        "Optimization suggestions",
        "Highest traffic hour",
        "Total success rate",
        "Most active IP address",
        "Refresh interval latency"
    ];

    // 2. Automatically scroll down whenever messages change
    useEffect(() => {
        if (open) {
            chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, open]);

    const handleQuestion = (question: string) => {
        let answer = "";

        switch (question) {
            case "Today's Summary":
                answer = "📊 Total Requests: 150 | Blocked: 30 | Active Users: 18 | Success Rate: 80%";
                break;
            case "Why were requests blocked?":
                answer = "🚫 Requests were blocked because users exceeded the limit of 5 requests per minute.";
                break;
            case "Show active users":
                answer = "👥 Currently there are 18 active users.";
                break;
            case "Current rate limit":
                answer = "⚡ Current rate limit is 5 requests per minute per user.";
                break;
            case "Traffic insights":
                answer = "📈 Traffic is healthy. 80% requests were allowed and 20% were blocked.";
                break;
            case "Optimization suggestions":
                answer = "💡 Consider Redis for distributed rate limiting and caching analytics data.";
                break;
            case "Highest traffic hour":
                answer = "⏰ Peak Window Analysis: According to the 'Requests Overview' line graph, the highest concentration of burst traffic occurred between 11:50 AM and 12:00 PM, generating a total peak volume of 43 requests.";
                break;
            case "Total success rate":
                answer = "📈 Distribution Breakdown: Based on the 'Requests Distribution' chart calculation, your current API health is at an 80% Success Rate (120 Allowed vs 30 Blocked requests).";
                break;
            case "Most active IP address":
                answer = "📋 Recent Requests Audit: The most frequent identifier matching inside the history logs table is client token `192.168.1.1` with a steady delivery trace latency averaging around 120ms.";
                break;
            case "Refresh interval latency":
                answer = "🔄 Telemetry Update Rate: The dashboard metrics interface is polling your internal background route `/api/analytics` exactly once every 2000ms (2 seconds) to sync layout visualizations seamlessly.";
                break;
            default:
                answer = "I can help with dashboard analytics.";
        }

        setMessages((prev) => [
            ...prev,
            { sender: "user", text: question },
            { sender: "bot", text: answer },
        ]);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-full shadow-lg z-50"
            >
                🤖 Rate Limiter Copilot
            </button>

            {/* Chat Window */}
            {open && (
                <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">

                    <div className="bg-indigo-600 text-white p-4">
                        <h2 className="font-bold">🤖 Rate Limit Copilot</h2>
                    </div>

                    {/* Chat Area */}
                    <div className="h-80 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg text-sm max-w-[85%] ${msg.sender === "bot"
                                    ? "bg-gray-100 text-black mr-auto"
                                    : "bg-indigo-50 border border-indigo-100 text-indigo-900 ml-auto"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {/* 3. The scroll anchor anchor point */}
                        <div ref={chatBottomRef} />
                    </div>

                    {/* Suggestion Controls */}
                    <div className="border-t p-3 bg-slate-50">
                        <p className="text-xs font-semibold mb-2 text-gray-500 uppercase tracking-wider">
                            Suggested Questions
                        </p>

                        <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                            {quickQuestions.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => handleQuestion(q)}
                                    className="text-xs text-indigo-600 hover:text-indigo-800 bg-indigo-50/60 hover:bg-indigo-100/80 font-medium px-2.5 py-1.5 rounded-full transition-colors border border-indigo-100/50"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}