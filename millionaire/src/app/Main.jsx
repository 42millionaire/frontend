import { useEffect, useState } from "react";
import { getAPI } from "../apis/get.js";
import MainHeader from "../components/Main/MainHeader.jsx";
import MemberList from "../components/MemberList.jsx";
import Notice from "../components/Notice.jsx";
import useMainAPI from "../hooks/useMain.js";
import TaskAddButton from "../components/Main/TaskAddButton.jsx";
import TaskModal from "../components/Main/TaskModal.jsx";
import TaskCard from "../components/Main/TaskCard.jsx";

export default function Main() {
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
	const [cards, setCards] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data: groupTitle } = useMainAPI(
		"group",
		(data) => data.groupResponses[0].groupName,
	);
	const { data: members } = useMainAPI("member", (data) => data.members);
	const { data: notice } = useMainAPI("group/notice/1", (data) => data.notice);

	useEffect(() => {
		fetchCards(1, 1, new Date().getFullYear(), selectedMonth);
	}, [selectedMonth]);

	const fetchCards = async (groupId, memberId, year, month) => {
		const data = await getAPI("task", { groupId, memberId, year, month });
		console.log(data);
		setCards(data.tasks);
		return data;
	};

	const handleAddTask = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const calcCards = () => {
		const weeklyCards = { 1: [], 2: [], 3: [], 4: [], 5: [] };
		const monthlyCards = [];

		cards.forEach((card) => {
			const dueDate = new Date(card.dueDate);
			const dayOfMonth = dueDate.getDate();
			let weekNumber;

			if (dayOfMonth <= 7) weekNumber = 1;
			else if (dayOfMonth <= 14) weekNumber = 2;
			else if (dayOfMonth <= 21) weekNumber = 3;
			else if (dayOfMonth <= 28) weekNumber = 4;
			else weekNumber = 5;

			if (card.type === "monthly") {
				monthlyCards.push(card);
			} else {
				weeklyCards[weekNumber].push(card);
			}
		});

		return { weeklyCards, monthlyCards };
	};

	const { weeklyCards, monthlyCards } = calcCards();

	const sortCards = (cards) => {
		const compareStatus = (a, b) => {
			if (a.status === "none" && b.status !== "none") return -1;
			if (a.status !== "none" && b.status === "none") return 1;
			return 0;
		};

		const compareDate = (a, b) => new Date(a.dueDate) - new Date(b.dueDate);

		const compareType = (a, b) => {
			if (a.type === "weekly" && b.type !== "weekly") return -1;
			if (a.type !== "weekly" && b.type === "weekly") return 1;
			return 0;
		};

		return cards.sort((a, b) => {
			if (a.type === b.type) {
				const statusComparison = compareStatus(a, b);
				return statusComparison !== 0 ? statusComparison : compareDate(a, b);
			}
			return compareType(a, b);
		});
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
			<div className="w-1/4 p-4 border-r border-gray-700">
				<h1 className="text-2xl font-bold mb-4">{groupTitle}</h1>
				<MemberList members={members} />
				<Notice notice={notice} />
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
			<TaskAddButton onAddTask={handleAddTask} />
			{isModalOpen && (
				<TaskModal title={groupTitle} onClose={handleCloseModal} />
			)}
		</div>
	);
}
