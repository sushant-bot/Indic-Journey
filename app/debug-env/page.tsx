"use client"

export default function DebugEnvPage() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET (hidden)" : "NOT SET",
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Environment Variables Debug</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Client-side Environment Variables</h2>
          <div className="space-y-2">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">{key}</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    value && value !== "NOT SET" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {value || "NOT SET"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h3 className="font-semibold text-yellow-800">If variables show "NOT SET":</h3>
              <ol className="list-decimal list-inside mt-2 space-y-1 text-sm text-yellow-700">
                <li>
                  Check that <code>.env.local</code> file exists in your project root
                </li>
                <li>Verify there are no spaces around the = sign</li>
                <li>Restart your development server completely</li>
                <li>
                  Make sure the file is named exactly <code>.env.local</code>
                </li>
              </ol>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <h3 className="font-semibold text-blue-800">Your .env.local should look like:</h3>
              <pre className="mt-2 text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                {`NEXT_PUBLIC_SUPABASE_URL=https://khcaqznmejcvytawkdfe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
