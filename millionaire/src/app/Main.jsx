import { useEffect, useState } from "react";
import { fetchCards } from "../apis/services/taskService.js";
import { sortCards, calcCards } from "../utils/calculations/cardUtils.js";
import MainHeader from "../components/Main/MainHeader.jsx";
import TaskAddButton from "../components/Main/TaskAddButton.jsx";
import TaskAddModal from "../components/Main/TaskAddModal.jsx";
import TaskCard from "../components/Main/TaskCard.jsx";

import useMainAPI from "../hooks/useMain.js";
import getUserInfo from "../hooks/getUserInfo.js";
import Loading from "../components/Loding.jsx";

export default function Main() {
	const userInfo = getUserInfo();// useMainAPI("", (data) => data.user);

	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [cards, setCards] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isShowOtherMembers, setIsShowOtherMembers] = useState(false);
	const [taskToggle, setTaskToggle] = useState({
		monthly: true, // 월 목표 토글 상태
		weekly: { 1: true, 2: true, 3: true, 4: true} // 주차별 토글 상태 (동적으로 관리)
	  });
	const [userId, setUserId] = useState(userInfo.id);

	const { data: groupInfo, loading } = useMainAPI(
		"group",
		(data) => data.groupResponses[0]
	);
	const { data: members } = useMainAPI("groupmember/1", (data) => data.groupMembers);
	const { data: notice } = useMainAPI("group/notice/1", (data) => data.notice);
	const { data: isAdmin } = useMainAPI("admin?groupId=1", (data) => data.isAdmin);
	
	const { weeklyCards, monthlyCards, imminentCards } = calcCards(cards, selectedMonth);
	
	const loadCards = async () => {
		if (!groupInfo) return;
		
		const cardsData = await fetchCards(
			groupInfo.groupId,
			userId,
			selectedYear,
			selectedMonth,
		);
		setCards(cardsData);
	};

	const handleClickMember = async (member) => {
		if (member.memberId !== parseInt(userInfo.id))
			setIsShowOtherMembers(true);
		else
			setIsShowOtherMembers(false);

		const cardsData = await fetchCards(
			groupInfo.groupId,
			member.memberId,
			selectedYear,
			selectedMonth,
		);
	
		setUserId(member.memberId);
		setCards(cardsData);
	};

	const handleTaskToggle = (section) => {
		setTaskToggle((prev) => ({
		  ...prev,
		  [section]: !prev[section]
		}));
	  };
	  
	const handleWeekToggle = (week) => {
		setTaskToggle((prev) => ({
			...prev,
			weekly: {
			...prev.weekly,
			[week]: !prev.weekly[week] // 해당 주차만 토글
			}
		}));
	};

	useEffect(() => {
		loadCards();
	}, [selectedMonth, loading]);

	const handleTaskCreated = async () => {
		await loadCards();
		setIsModalOpen(false);
	};

	const renderCards = (cards) => (
		<div className="flex flex-wrap">
			{sortCards(cards).map((card) => (
				<TaskCard key={card.taskId} task={card} isOtherMember={isShowOtherMembers}/>
			))}
		</div>
	);
	
	return (
		<div className="flex h-screen bg-[#0C0F15] text-[#E2E8F0]">
			{/* <div className="flex flex-col w-1/6 p-4 border-r border-gray-700 gap-[2rem]">
				<MainGroupName groupName={ groupInfo ? groupInfo.groupName : ""} />
				<MemberList members={members} handleClickMember={handleClickMember} currentUserId={userInfo.id}/>
				<MainNotice notice={notice} />
			</div> */}
			<div className="w-[100%] p-4 overflow-auto">
				<MainHeader
					groupInfo={groupInfo}
					notice={notice}
					selectedMonth={selectedMonth}
					setSelectedMonth={setSelectedMonth}
					selectedYear={selectedYear}
					setSelectedYear={setSelectedYear}
					members={members}
					handleClickMember={handleClickMember}
					currentUserId={userInfo.id}
					isAdmin={isAdmin}
				/>
			{ loading && ( <Loading></Loading>) }
			{ !loading && groupInfo && (
				<div className="p-5">
					{imminentCards.length ?
						<div className="mb-8 border-b border-gray-700">
							<h2 className="text-xl font-bold mb-4 text-red-400">마감임박!</h2>
							{ renderCards(imminentCards) }
						</div> : ""
					}

					<div className="mb-8 border-b border-gray-700">
						<h2 className="text-xl font-bold mb-4" onClick={() => handleTaskToggle("monthly")}>
							Monthly Goals
							<span className="text-sm"> {taskToggle.monthly ? "▼" : "▶"}</span>
						</h2>
						{taskToggle.monthly ? 
							monthlyCards.length ? renderCards(monthlyCards) : <span className="text-base text-gray-500"> 등록된 월 목표가 없습니다.</span>
								: ""}
					</div>

					{Object.entries(weeklyCards).map(([week, cards]) => (
						<div key={week} className="mb-8 border-b border-gray-700">
							<h2 className="text-xl font-bold mb-4" onClick={() => handleWeekToggle(week)}>
								{week} Week
								<span className="text-sm"> {taskToggle.weekly[week] ? "▼" : "▶"}</span>
							</h2>
							{taskToggle.weekly[week] ? 
								cards.length ? renderCards(cards) : <span className="text-base text-gray-500"> 해당 주에 등록된 목표가 없습니다.</span>
									: ""}
						</div>
					))}
				</div>
				)
			}
				</div>
				{!isShowOtherMembers && (<TaskAddButton onAddTask={() => setIsModalOpen(true)} />)}
				{!isShowOtherMembers && isModalOpen && (
					<TaskAddModal
					groupInfo={groupInfo}
					userInfo={userInfo}
					onClose={() => setIsModalOpen(false)}
					onCreateTask={handleTaskCreated}
				/>
			)}
		</div>
	);
}
