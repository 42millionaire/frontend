import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { TASK_LENGTH } from "../../constants/CONTENT_LENGTH.js";
import postAPI from "../../apis/post.js";

export default function TaskAddModal({ title, onClose, onCreateTask }) {
	const [content, setContent] = useState("");
	const [selectedGoal, setSelectedGoal] = useState("daily");
	const [dueDate, setDueDate] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!content.trim()) {
			alert("할 일을 입력해주세요.");
			return;
		}

		const formattedDate = formatDateForSubmit(dueDate);
		const requestBody = {
			groupId: 1,
			memberId: 1,
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

	const formatDateForSubmit = (date) => {
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

		today.setDate(1);
		today.setHours(0, 0, 0, 0);

		if (selectedMonth < today) {
			alert("과거 월은 선택할 수 없습니다.");
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
				<h2 className="mb-4 text-2xl font-bold text-gray-800">{title}</h2>
				<div className="flex gap-[20px] mb-[20px]">
					{["monthly", "weekly", "daily"].map((goal) => (
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
				<div className="mb-4 text-sm text-gray-500">
					created_at : {new Date().toLocaleDateString()}
				</div>
				<div className="mb-4 text-sm text-gray-500">
					due_date :{renderDateInput()}
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
