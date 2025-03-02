import { useState, useRef, useEffect } from "react";

const YearMonthSelector = ({ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }) => {
  const CLUB_START_YEAR = 2024;
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const years = Array.from({ length: selectedYear - CLUB_START_YEAR + 1 }, (_, i) => CLUB_START_YEAR + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowYearDropdown(false);
        setShowMonthDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="flex items-center justify-center p-4 text-white">
      <div className="relative flex items-center space-x-2 text-lg">
        {/* Year Selector */}
        <div className="relative">
          <button
            onClick={() => setShowYearDropdown(!showYearDropdown)}
            className="inline-flex items-center gap-x-1 text-sm sm:text-2xl border-b border-gray-600 pb-1 hover:opacity-80"
          >
            <span className="font-bold">{selectedYear}</span>
            <span className="text-xs sm:text-sm">년</span>
            <button className="text-xs sm:text-sm">
            ▼
            </button>
          </button>
          {showYearDropdown && (
            <div className="absolute left-0 mt-1 w-24 bg-gray-800 shadow-lg rounded z-10 transition-all duration-300 transform scale-95 opacity-100 animate-fadeIn">
              {years.map((y) => (
                <div
                  key={y}
                  className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSelectedYear(y);
                    setShowYearDropdown(false);
                  }}
                >
                  {y}년
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Month Selector */}
        <div className="relative">
          <button
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            className="inline-flex items-center gap-x-1 text-sm sm:text-2xl border-b border-gray-600 pb-1 hover:opacity-80"
          >
            <span className="font-bold">{selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth}</span>
            <span className="text-xs sm:text-sm">월</span>
            <button className="text-xs sm:text-sm">
            ▼
            </button>
          </button>
          {showMonthDropdown && (
            <div className="absolute left-0 mt-1 w-20 bg-gray-800 shadow-lg rounded z-10 transition-all duration-300 transform scale-95 opacity-100 animate-fadeIn">
              {months.map((m) => (
                <div
                  key={m}
                  className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSelectedMonth(m);
                    setShowMonthDropdown(false);
                  }}
                >
                  {m}월
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YearMonthSelector;
