import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import useScrollReveal from "../hooks/useScrollReveal";

const moodOptions = [
  { value: "amazing", label: "Amazing", emoji: "✨" },
  { value: "good", label: "Good", emoji: "😊" },
  { value: "okay", label: "Okay", emoji: "🙂" },
  { value: "sensitive", label: "Sensitive", emoji: "🥺" },
  { value: "breaking-out", label: "Breaking out", emoji: "😣" },
];

// Helper to get YYYY-MM-DD
const toDateKey = (date) => date.toISOString().split("T")[0];

export default function SkinDiary({ onLogin }) {
  const { ref, controls } = useScrollReveal();

  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [note, setNote] = useState("");
  const [mood, setMood] = useState(moodOptions[1].value);
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  // Load entries from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("skin-diary-v1"));
    if (saved) setEntries(saved);
  }, []);

  // Save whenever entries change
  useEffect(() => {
    localStorage.setItem("skin-diary-v1", JSON.stringify(entries));
  }, [entries]);

  const selectedDateKey = useMemo(
    () => toDateKey(selectedDate),
    [selectedDate]
  );

  const entriesForSelectedDate = useMemo(
    () => entries.filter((e) => e.dateKey === selectedDateKey),
    [entries, selectedDateKey]
  );

  const entriesByDate = useMemo(() => {
    const map = {};
    entries.forEach((e) => {
      map[e.dateKey] = (map[e.dateKey] || 0) + 1;
    });
    return map;
  }, [entries]);

  const handleSave = () => {
    if (!note.trim()) return;

    const newEntry = {
      id: Date.now(),
      text: note.trim(),
      dateKey: selectedDateKey,
      mood,
      createdAt: new Date().toISOString(),
    };

    setEntries((prev) => [newEntry, ...prev]);
    setNote("");
    setMood(moodOptions[1].value);
  };

  // Calendar helpers
  const startOfMonth = useMemo(() => {
    const d = new Date(currentMonth);
    d.setDate(1);
    return d;
  }, [currentMonth]);

  const daysInMonth = useMemo(() => {
    const d = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    return d.getDate();
  }, [currentMonth]);

  const startWeekday = startOfMonth.getDay(); // 0 = Sunday

  const handlePrevMonth = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() - 1);
    setCurrentMonth(d);
  };

  const handleNextMonth = () => {
    const d = new Date(currentMonth);
    setCurrentMonth(new Date(d.setMonth(d.getMonth() + 1)));
  };

  const handleDayClick = (day) => {
    const d = new Date(currentMonth);
    d.setDate(day);
    setSelectedDate(d);
  };

  if (!user) {
    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={controls}
        className="py-20"
      >
        <section className="py-20 px-6 max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-semibold text-teal-700 mb-4"
          >
            Skin Diary
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg mb-8"
          >
            Login to track how your skin feels day-by-day and see your progress
            over time.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onLogin}
            className="px-10 py-3 rounded-full bg-teal-600 text-white text-lg shadow-md hover:bg-teal-700 transition"
          >
            Login to add to your diary
          </motion.button>
        </section>
      </motion.section>
    );
  }

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-semibold text-teal-700 mb-10 text-center"
      >
        Skin Diary
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/90 rounded-3xl shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevMonth}
              className="px-3 py-1 rounded-full border hover:bg-teal-50 text-teal-700 border-teal-200"
            >
              ←
            </button>
            <div>
              <p className="font-semibold text-teal-700 text-lg">
                {currentMonth.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <button
              onClick={handleNextMonth}
              className="px-3 py-1 rounded-full border hover:bg-teal-50 text-teal-700 border-teal-200"
            >
              →
            </button>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-center pb-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1 text-sm">
            {Array.from({ length: startWeekday }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const d = new Date(currentMonth);
              d.setDate(day);
              const key = toDateKey(d);
              const isSelected = key === selectedDateKey;
              const hasEntries = entriesByDate[key] > 0;

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square rounded-full flex flex-col items-center justify-center text-xs md:text-sm transition ${
                    isSelected
                      ? "bg-teal-600 text-white shadow-md"
                      : "hover:bg-teal-50 text-gray-700"
                  }`}
                >
                  <span>{day}</span>
                  {hasEntries && (
                    <span className="text-[10px] text-teal-600 bg-teal-50 px-1 rounded-full mt-0.5">
                      {entriesByDate[key]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Mood + New Entry */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/90 rounded-3xl shadow-md p-6"
        >
          <p className="text-gray-500 text-sm mb-2">
            {selectedDate.toLocaleDateString()}
          </p>
          <h3 className="text-2xl font-semibold text-teal-700 mb-4">
            How is your skin feeling today?
          </h3>

          {/* Mood selector */}
          <div className="flex flex-wrap gap-3 mb-6">
            {moodOptions.map((m) => (
              <button
                key={m.value}
                onClick={() => setMood(m.value)}
                className={`px-3 py-2 rounded-full border flex items-center gap-2 text-sm transition ${
                  mood === m.value
                    ? "bg-teal-600 text-white border-teal-700"
                    : "border-gray-300 hover:border-teal-600 hover:bg-teal-50"
                }`}
              >
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Note */}
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full h-32 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
            placeholder="Write about texture, breakouts, sensitivity, glow…"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            className="px-8 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700"
          >
            Save Entry
          </motion.button>
        </motion.div>
      </div>

      {/* Entries list */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-teal-700 mb-4 text-center">
          Entries for {selectedDate.toLocaleDateString()}
        </h3>

        <AnimatePresence>
          {entriesForSelectedDate.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-center"
            >
              No entries yet for this day. Start by adding how your skin feels.
            </motion.p>
          )}

          <div className="space-y-4 max-w-3xl mx-auto">
            {entriesForSelectedDate.map((e) => {
              const moodMeta = moodOptions.find((m) => m.value === e.mood);
              return (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-3xl shadow-md p-5 border border-teal-50 hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>
                        {new Date(e.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {moodMeta && (
                        <span className="inline-flex items-center gap-1 text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full text-xs">
                          <span>{moodMeta.emoji}</span>
                          <span>{moodMeta.label}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700">{e.text}</p>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}
