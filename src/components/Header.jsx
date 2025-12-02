export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* LOGO */}
        <h1 className="text-2xl font-semibold text-teal-700 tracking-wide">
          Glow Genic
        </h1>

        {/* NAV BUTTONS */}
        <div className="flex items-center gap-4">
          {/* NEW CLIENT */}
          <button className="px-5 py-2 rounded-full border border-teal-600 text-teal-700 font-medium hover:bg-teal-600 hover:text-white transition">
            New Client
          </button>

          {/* SCHEDULE CONSULTATION */}
          <button className="px-6 py-2 rounded-full bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 transition">
            Schedule Consultation
          </button>
        </div>
      </div>
    </header>
  );
}
