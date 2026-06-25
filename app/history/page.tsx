"use client";

import { useEffect, useState } from "react";

type HistoryItem = {
  id: string;
  identifier: string;
  endpoint: string;
  status: "allowed" | "blocked";
  statusCode: number;
  createdAt: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await fetch("/api/history", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load request history");
        }

        const data = await response.json();

        setHistory(data.history ?? []);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    loadHistory();

    const intervalId = setInterval(loadHistory, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Request History
          </h1>

          <p className="mt-2 text-gray-600">
            Recent OTP API requests and rate-limit decisions.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {loading && (
            <p className="p-6 text-gray-600">
              Loading request history...
            </p>
          )}

          {error && (
            <p className="p-6 text-red-500">
              {error}
            </p>
          )}

          {!loading && !error && history.length === 0 && (
            <p className="p-6 text-gray-600">
              No OTP requests have been recorded yet.
            </p>
          )}

          {!loading && !error && history.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="border-b bg-gray-50 text-sm text-gray-600">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Time</th>
                    <th className="px-6 py-4 font-semibold">User / IP</th>
                    <th className="px-6 py-4 font-semibold">Endpoint</th>
                    <th className="px-6 py-4 font-semibold">Result</th>
                    <th className="px-6 py-4 font-semibold">Status Code</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {history.map((item) => {
                    const isAllowed = item.status === "allowed";

                    return (
                      <tr key={item.id} className="text-sm text-gray-700">
                        <td className="whitespace-nowrap px-6 py-4">
                          {new Date(item.createdAt).toLocaleString()}
                        </td>

                        <td className="px-6 py-4 font-mono text-xs">
                          {item.identifier}
                        </td>

                        <td className="px-6 py-4">
                          {item.endpoint}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={
                              isAllowed
                                ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                                : "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                            }
                          >
                            {isAllowed ? "Allowed" : "Blocked"}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-semibold">
                          {item.statusCode}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}