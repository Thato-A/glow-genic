// src/components/SkinDiary.jsx
import React, { useState, useEffect } from "react";

export default function SkinDiary() {
  const [entries, setEntries] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("skin-diary"));
    if (saved) setEntries(saved);
  }, []);

  const saveEntry = () => {
    if (!note.trim()) return;
    const updated = [
      ...entries,
      { text: note, date: new Date().toLocaleDateString() },
    ];
    setEntries(updated);
    localStorage.setItem("skin-diary", JSON.stringify(updated));
    setNote("");
  };

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <h2 className="text-4xl font-semibold text-teal-700 mb-8">Skin Diary</h2>

      {/* Add Entry */}
      <div className="bg-white/90 p-6 rounded-3xl shadow-md mb-10">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-32 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="How is your skin feeling today?"
        ></textarea>

        <button
          onClick={saveEntry}
          className="mt-4 px-8 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700"
        >
          Save Entry
        </button>
      </div>

      {/* Entries List */}
      <div className="space-y-6">
        {entries.map((e, i) => (
          <div
            key={i}
            className="bg-white/90 shadow-md p-6 rounded-3xl border hover:shadow-lg"
          >
            <p className="text-gray-700 mb-2">{e.text}</p>
            <span className="text-sm text-gray-500">{e.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
