import Sidebar from "@/components/sidebar";

export default function ApiDocumentationPage() {
    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />

            <main className="flex-1 p-8">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900">
                        API Documentation
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Learn how to use the Rate Limiter API.
                    </p>

                    <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Send OTP Endpoint
                        </h2>

                        <p className="mt-3 text-gray-600">
                            This endpoint sends an OTP request and applies rate limiting.
                        </p>

                        <code className="mt-5 block rounded-lg bg-slate-900 p-4 text-sm text-green-400">
                            POST /api/send-otp
                        </code>
                    </section>

                    <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Success Response
                        </h2>

                        <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-green-400">
                            {`{
  "success": true,
  "message": "OTP sent successfully"
}`}
                        </pre>
                    </section>

                    <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Rate Limit Response
                        </h2>

                        <p className="mt-3 text-gray-600">
                            When the request limit is exceeded, the API returns HTTP 429.
                        </p>

                        <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-red-400">
                            {`{
  "success": false,
  "message": "Rate limit exceeded"
}`}
                        </pre>
                    </section>

                    <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Analytics Endpoint
                        </h2>

                        <code className="mt-4 block rounded-lg bg-slate-900 p-4 text-sm text-green-400">
                            GET /api/analytics
                        </code>
                    </section>
                </div>
            </main>
        </div>
    );
}