import { useEffect, useState } from "react";
import { fetchCards } from "../apis/services/taskService.js";
import { sortCards, calcCards } from "../utils/calculations/cardUtils.js";
import MainHeader from "../components/Main/MainHeader.jsx";
import MainNotice from "../components/Main/MainNotice.jsx";
import MemberList from "../components/MemberList.jsx";
import TaskAddButton from "../components/Main/TaskAddButton.jsx";
import TaskAddModal from "../components/Main/TaskAddModal.jsx";
import TaskCard from "../components/Main/TaskCard.jsx";
import MainGroupName from "../components/Main/MainGroupName.jsx";

import useMainAPI from "../hooks/useMain.js";
import getUserInfo from "../hooks/getUserInfo.js";
import Loading from "../components/Loding.jsx";

export default function Main() {
	const userInfo = getUserInfo();// useMainAPI("", (data) => data.user);

	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
	const [cards, setCards] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isShowOtherMembers, setIsShowOtherMembers] = useState(false);
	const [userName, setUserName] = useState(userInfo.name);
	const [userId, setUserId] = useState(userInfo.id);

	const { data: groupInfo, loading } = useMainAPI(
		"group",
		(data) => data.groupResponses[0]
	);
	const { data: members } = useMainAPI("groupmember/1", (data) => data.groupMembers);
	const { data: notice } = useMainAPI("group/notice/1", (data) => data.notice);
	
	const { weeklyCards, monthlyCards } = calcCards(cards);
	
	const loadCards = async () => {
		if (!groupInfo) return;
		
		const cardsData = await fetchCards(
			groupInfo.groupId,
			userId,
			new Date().getFullYear(),
			selectedMonth,
		);
		setCards(cardsData);
	};

	const handleClickMember = async (memberId, memberName) => {
		if (memberId !== parseInt(userInfo.id))
			setIsShowOtherMembers(true);
		else
			setIsShowOtherMembers(false);

		const cardsData = await fetchCards(
			groupInfo.groupId,
			memberId,
			new Date().getFullYear(),
			selectedMonth,
		);
		setUserName(memberName);
		setUserId(memberId);
		setCards(cardsData);
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
		<div className="flex h-screen bg-gray-900 text-white">
			<div className="flex flex-col w-1/5 p-4 border-r border-gray-700 gap-[2rem]">
				<MainGroupName groupName={ groupInfo ? groupInfo.groupName : ""} />
				<MemberList members={members} handleClickMember={handleClickMember} currentUserId={userInfo.id}/>
				<MainNotice notice={notice} />
			</div>
			<div className="w-3/4 p-4 overflow-auto">
				<MainHeader
					memberName={userName}
					selectedMonth={selectedMonth}
					setSelectedMonth={setSelectedMonth}
				/>
			{ loading && ( <Loading></Loading>) }
			{ !loading && groupInfo && ( <>
					<div className="mb-8">
						<h2 className="text-xl font-bold mb-4">Monthly Goals</h2>
						{renderCards(monthlyCards)}
					</div>

					{Object.entries(weeklyCards).map(([week, cards]) => (
						<div key={week} className="mb-8">
							<h2 className="text-xl font-bold mb-4">{week} Week</h2>
							{renderCards(cards)}
						</div>
					))}
				</>
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
