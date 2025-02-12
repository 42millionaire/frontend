import { useEffect, useState } from "react";
import { fetchCards } from "../apis/services/taskService.js";
import { sortCards, calcCards } from "../utils/calculations/cardUtils.js";
import MainHeader from "../components/Main/MainHeader.jsx";
import MainNotice from "../components/Main/MainNotice.jsx";
import MemberList from "../components/MemberList.jsx";
import useMainAPI from "../hooks/useMain.js";
import TaskAddButton from "../components/Main/TaskAddButton.jsx";
import TaskAddModal from "../components/Main/TaskAddModal.jsx";
import TaskCard from "../components/Main/TaskCard.jsx";
import MainGroupName from "../components/Main/MainGroupName.jsx";

export default function Main() {
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
	const [cards, setCards] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data: groupTitle } = useMainAPI(
		"group",
		(data) => data.groupResponses[1].groupName,
	);
	const { data: members } = useMainAPI("member", (data) => data.members);
	const { data: notice } = useMainAPI("group/notice/1", (data) => data.notice);
	const { weeklyCards, monthlyCards } = calcCards(cards);

	const loadCards = async () => {
		const cardsData = await fetchCards(
			1,
			1,
			new Date().getFullYear(),
			selectedMonth,
		);
		setCards(cardsData);
	};

	useEffect(() => {
		loadCards();
	}, [selectedMonth]);

	const handleTaskCreated = async () => {
		await loadCards();
		setIsModalOpen(false);
	};

	const renderCards = (cards) => (
		<div className="flex flex-wrap">
			{sortCards(cards).map((card) => (
				<TaskCard key={card.taskId} task={card} />
			))}
		</div>
	);

	return (
		<div className="flex h-screen bg-gray-900 text-white">
			<div className="flex flex-col w-1/4 p-4 border-r border-gray-700 gap-[5rem]">
				<MainGroupName groupName={groupTitle} />
				<MemberList members={members} />
				<MainNotice notice={notice} />
			</div>
			<div className="w-3/4 p-4 overflow-auto">
				<MainHeader
					selectedMonth={selectedMonth}
					setSelectedMonth={setSelectedMonth}
				/>

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
			</div>
			<TaskAddButton onAddTask={() => setIsModalOpen(true)} />
			{isModalOpen && (
				<TaskAddModal
					title={groupTitle}
					onClose={() => setIsModalOpen(false)}
					onCreateTask={handleTaskCreated}
				/>
			)}
		</div>
	);
}
