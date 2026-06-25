export default function RequestTable() {
    const rows = [
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
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">

            <h2 className="text-3xl font-bold text-black mb-6">
                Recent Requests
            </h2>

            <table className="w-full text-black">

                <thead>
                    <tr className="text-left border-b text-black">
                        <th className="py-3 font-semibold">Time</th>
                        <th className="py-3 font-semibold">User</th>
                        <th className="py-3 font-semibold">Endpoint</th>
                        <th className="py-3 font-semibold">Status</th>
                        <th className="py-3 font-semibold">Response</th>
                    </tr>
                </thead>

                <tbody>

                    {rows.map((row, i) => (
                        <tr key={i} className="border-b text-black">

                            <td className="py-3">{row.time}</td>

                            <td className="py-3">{row.user}</td>

                            <td className="py-3">{row.endpoint}</td>

                            <td className="py-3">
                                <span
                                    className={
                                        row.status === "Allowed"
                                            ? "bg-green-100 text-green-700 px-3 py-1 rounded-lg"
                                            : "bg-red-100 text-red-700 px-3 py-1 rounded-lg"
                                    }
                                >
                                    {row.status}
                                </span>
                            </td>

                            <td className="py-3">{row.responseTime}</td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}