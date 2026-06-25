"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Request History", href: "/history" },
    { name: "API Documentation", href: "/api-documentation" },
    { name: "About", href: "/about" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex min-h-screen w-72 flex-col justify-between bg-slate-950 p-6 text-white">
            {/* Logo Section */}
            <div>
                <div className="mb-10">
                    <h1 className="text-3xl font-bold">Rate Limiter</h1>

                    <p className="text-sm text-slate-400">Dashboard</p>
                </div>

                {/* Menu */}
                <nav>
                    <ul className="space-y-3">
                        {menuItems.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                (item.href === "/dashboard" && pathname === "/");

                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`block rounded-lg px-4 py-3 transition-all duration-200 ${isActive
                                                ? "bg-indigo-600 text-white"
                                                : "text-slate-200 hover:bg-indigo-600 hover:text-white"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            {/* Bottom Status */}
            <div className="border-t border-slate-800 pt-4">
                <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-green-500" />

                    <div>
                        <p className="text-sm font-medium">System Status</p>

                        <p className="text-xs text-slate-400">
                            All systems operational
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}