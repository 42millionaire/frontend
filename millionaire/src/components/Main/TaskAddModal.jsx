import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { TASK_LENGTH } from "../../constants/CONTENT_LENGTH.js";
import postAPI from "../../apis/post.js";
import { printDateFormat } from "../../utils/dateUtils.js";

export default function TaskAddModal({ groupInfo, userInfo, onClose, onCreateTask }) {
	const [content, setContent] = useState("");
	const [selectedGoal, setSelectedGoal] = useState("daily");
	const [dueDate, setDueDate] = useState("");

	const goals = ["monthly", "weekly", "daily"];
	const description_values = [
		"매월 1일 23:59 전까지 설정 가능",
		"매주 일요일 23:59 전까지 설정 가능",
		"매일 03:00 전까지 설정 가능"
	];

	const descriptions = Object.fromEntries(goals.map((goal, i) => [goal, description_values[i]]));

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!content.trim()) {
			alert("할 일을 입력해주세요.");
			return;
		}

		const formattedDate = formatDateForSubmit(dueDate);
		console.log(formattedDate);
		const requestBody = {
			groupId: groupInfo.groupId,
			memberId: userInfo.id,
			dueDate: formattedDate,
			content,
			type: selectedGoal,
		};
		try {
			const result = await postAPI("/task", requestBody);
			if (result.error) {
				throw new Error(result.error);
			}
			await onCreateTask();
		} catch (error) {
			alert("할 일 추가에 실패했습니다.", error);
		}
	};

	const getLastDayOfMonth = (yearMonth) => {
		const [year, month] = yearMonth.split("-");
		return new Date(year, month, 0).getDate();
	};

	const checkDateNull = (date) => {
		const curr = new Date();
		const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);

		const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
		const now = new Date(utc + (KR_TIME_DIFF));

		if (date.length)
			return date;

		if (selectedGoal === "monthly") {
			if (now.getDate() !== 1)
				now.setMonth(now.getMonth() + 2);
			return now.getFullYear() + "-" + String(now.getMonth()).padStart(2, '0');
		}

		if (selectedGoal === "weekly") {
			if (now.getDay() !== 0)
				now.setDate(now.getDate() + (14 - now.getDay()));
			else
				now.setDate(now.getDate() + 7);
			return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
		} 
		
		if (selectedGoal == "daily") {
			const today3AM = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate(),
				3,
				0,
				0
			  );
			
			if (now > today3AM)
				now.setDate(now.getDate() + 1);

			console.log(now.toISOString());
			return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
		}
	}

	const formatDateForSubmit = (date) => {
		date = checkDateNull(date);
		if (selectedGoal === "monthly") {
			const lastDay = getLastDayOfMonth(date);
			return `${date}-${String(lastDay).padStart(2, "0")}`;
		}
		
		return date;
	};

	const handleOutsideClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleGoalSelect = (goal) => {
		setSelectedGoal(goal);
		setDueDate("");
	};

	const handleDateChange = (e) => {
		const selectedDate = new Date(e.target.value);
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (selectedDate < today) {
			alert("과거 날짜는 선택할 수 없습니다.");
			setDueDate("");
			return;
		}

		if (selectedGoal === "weekly" && selectedDate.getDay() !== 0) {
			alert("주간 목표의 경우 일요일만 선택 가능합니다.");
			setDueDate("");
			return;
		}

		setDueDate(e.target.value);
	};

	const handleMonthChange = (e) => {
		const selectedMonth = new Date(e.target.value + "-01");
		const today = new Date();

		selectedMonth.setHours(23, 59, 0, 0);

		if (selectedMonth < today) {
			alert("목표 설정 기간이 지난 월은 선택할 수 없습니다.");
			setDueDate("");
			return;
		}

		setDueDate(e.target.value);
	};

	const renderDateInput = () => {
		switch (selectedGoal) {
			case "monthly":
				return (
					<input
						type="month"
						value={dueDate}
						onChange={handleMonthChange}
						className="ml-2 p-1 border rounded"
					/>
				);
			case "weekly":
			case "daily":
				return (
					<input
						type="date"
						value={dueDate}
						onChange={handleDateChange}
						className="ml-2 p-1 border rounded"
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div
			className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
			onClick={handleOutsideClick}
		>
			<div className="relative w-[600px] h-[600px] max-w-[90%] p-12 rounded-lg bg-white">
				<button
					onClick={onClose}
					className="absolute top-2 right-2 p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
				>
					<FaTimes className="w-5 h-5" />
				</button>
				<h2 className="mb-4 text-2xl font-bold text-gray-800">{groupInfo.groupName}</h2>
				<div className="flex gap-[20px] mb-[20px]">
					{goals.map((goal) => (
						<button
							key={goal}
							onClick={() => handleGoalSelect(goal)}
							className={`px-2 py-2 rounded-lg ${
								selectedGoal === goal ? "bg-gray-500" : "bg-gray-800"
							} text-white hover:bg-gray-500 transition-colors`}
						>
							{goal.charAt(0).toUpperCase() + goal.slice(1)}
						</button>
					))}
				</div>
				<div className="mb-2 text-sm text-gray-500">
						{descriptions[selectedGoal]}
				</div>
				<div className="mb-2 text-sm text-gray-500">
					생성일 : { printDateFormat() }
				</div>
				<div className="mb-4 text-sm text-gray-500">
					마감일 :{renderDateInput()} (설정 안하면 설정 가능 일로 자동 설정)
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="p-4 border rounded-lg">
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="할 일을 입력하세요"
							className="w-full h-20 resize-none text-gray-700 focus:outline-none"
							maxLength={TASK_LENGTH}
						/>
						<div className="text-right text-sm text-gray-500">
							{content.length} / {TASK_LENGTH}
						</div>
					</div>
					<button
						type="submit"
						className="w-full py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-500 transition-colors"
					>
						제출하기
					</button>
				</form>
			</div>
		</div>
	);
}
