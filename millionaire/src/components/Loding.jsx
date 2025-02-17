import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* 스피너 */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        
        {/* 로딩 텍스트 */}
        <p className="text-blue-500 text-lg">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
