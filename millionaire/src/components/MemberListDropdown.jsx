import { useState, useRef, useEffect } from "react";
import { IoPerson } from "react-icons/io5";

const sleepMember = [2, 3, 4, 5, 6, 8]

const MemberListDropdown = ( { members, handleClickMember, currentUserId } ) => {
  const me = members?.find((member) => member.memberId === parseInt(currentUserId));
	const friends = members?.filter((member) => member.memberId !== parseInt(currentUserId) && !sleepMember.includes(member.memberId));
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const dropdownRef = useRef(null);

  
  console.log(friends)
  useEffect(() => {
    if (members && members.length > 0) {
      setSelectedMember(me || null);
    }
  }, [members, currentUserId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    handleClickMember(member);
    setShowDropdown(false);
  };

  return (
    <div ref={dropdownRef} className="relative flex flex-col items-center p-4">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        // onMouseEnter={() => setShowDropdown(true)}
        // onMouseLeave={() => setShowDropdown(false)}
        className="inline-flex items-center gap-x-1 text-sm sm:text-2xl border-b border-gray-600 pb-1 hover:opacity-80"
      >
        <span className="font-bold">{selectedMember?.name}</span>
        <span className="text-xs hidden sm:inline sm:text-xl">의 목표</span>
        <span className="text-xs sm:text-xl">▼</span>
      </button>
      {showDropdown && (
        <div className="absolute top-12 mt-2 w-48 bg-gray-800 shadow-lg rounded z-10 transition-all duration-300 transform scale-95 opacity-100 animate-fadeIn">
          {
            <div
              key={me?.memberId}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-lg font-bold flex items-center justify-start"
              onClick={() => handleSelectMember(me)}
            >
              <IoPerson className="mr-3"/>
              {me?.name}
            </div>
          }
          <hr className="px-4"/>
          <div className="flex flex-col">
            <span className="p-2 border-b border-gray-700">그룹 멤버</span>
            {friends?.map((friend) => (
              <div
                key={friend.memberId}
                className=" px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => handleSelectMember(friend)}
              >
                {friend.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberListDropdown;
