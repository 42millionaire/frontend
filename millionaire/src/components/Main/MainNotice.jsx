// export default function MainNotice({ notice }) {
// 	return (
// 		<section className="mt-10 w-[190x]">
// 			<h2 className="text-2xl font-bold mb-2">Notice</h2>
// 			<p className="text-gray-300 text-sm font-semibold">{notice}</p>
// 		</section>
// 	);
// }

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react"; // React Icons 사용

const MainNotice = ({notice}) => {
  const [showNotice, setShowNotice] = useState(false);
  const noticeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (noticeRef.current && !noticeRef.current.contains(event.target)) {
        setShowNotice(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative mr-5" ref={noticeRef}>
      {/* 🔔 버튼 */}
      <button
        onClick={() => setShowNotice(!showNotice)}
        className="rounded-full hover:bg-gray-700 transition"
      >
        <Bell className="w-5 h-5 sm:w-8 sm:h-8 text-gray-300" />
      </button>

      {/* 알림창 */}
      {showNotice && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-10 transition-all duration-300 transform scale-95 opacity-100 animate-fadeIn">
          <div className="p-3 border-b border-gray-700 font-semibold">알림</div>
          <p className="p-3 text-gray-300 text-sm font-semibold">{notice}</p>
        </div>
      )}
    </div>
  );
};

export default MainNotice;

