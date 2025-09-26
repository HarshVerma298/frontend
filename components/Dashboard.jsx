"use client";
import React, { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("user");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;
    setUploadStatus("uploading");
    try {
      await new Promise((r) => setTimeout(r, 1000)); // simulate
      setUploadStatus("success");
      setFile(null);
    } catch (err) {
      setUploadStatus("error");
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    const mockResults = [
      { id: 1, name: "Alice Johnson", skills: "React, Node.js" },
      { id: 2, name: "Bob Smith", skills: "Python, ML" },
    ].filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));
    setResults(mockResults);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <header className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recruitment Portal</h1>
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab("user")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "user"
                ? "bg-indigo-600 text-white"
                : "bg-white border"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setActiveTab("recruiter")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "recruiter"
                ? "bg-indigo-600 text-white"
                : "bg-white border"
            }`}
          >
            Recruiter
          </button>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto mt-10">
        {activeTab === "user" && (
          <section className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Upload Resume (PDF)</h2>
            <form onSubmit={handleUpload} className="mt-4 space-y-4">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                disabled={uploadStatus === "uploading"}
              >
                {uploadStatus === "uploading" ? "Uploading…" : "Upload"}
              </button>
              {uploadStatus === "success" && (
                <p className="text-green-600 text-sm">Upload successful!</p>
              )}
              {uploadStatus === "error" && (
                <p className="text-red-600 text-sm">Upload failed. Try again.</p>
              )}
            </form>
          </section>
        )}

        {activeTab === "recruiter" && (
          <section className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Search Candidates</h2>
            <form onSubmit={handleSearch} className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder="Enter name or skill"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 border rounded-md px-3 py-2"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Search
              </button>
            </form>

            <div className="mt-6 space-y-3">
              {results.length === 0 && (
                <p className="text-sm text-gray-500">
                  No results yet. Try searching.
                </p>
              )}
              {results.map((r) => (
                <div key={r.id} className="p-4 border rounded-lg">
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-sm text-gray-600">
                    Skills: {r.skills}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
