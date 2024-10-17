import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import postAPI from "../../apis/post.js";

export default function TaskModal({ title, onClose }) {
	const [content, setContent] = useState("");
	const [selectedGoal, setSelectedGoal] = useState(null);
	const [dueDate, setDueDate] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const requestBody = {
			groupId: 1,
			memberId: 1,
			dueDate: dueDate || new Date().toLocaleDateString(),
			content,
			goalType: selectedGoal,
		};
		const result = await postAPI("task", requestBody);
		if (result.error) {
			alert("할 일 추가에 실패했습니다.");
		} else {
			onClose();
		}
	};

	const handleOutsideClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleGoalSelect = (goal) => {
		setSelectedGoal(goal);
		if (goal === "주간목표") {
			setDueDate("");
		}
	};

	const handleDateChange = (e) => {
		const selectedDate = new Date(e.target.value);
		if (selectedGoal === "주간목표" && selectedDate.getDay() !== 0) {
			alert("주간 목표의 경우 일요일만 선택 가능합니다.");
			setDueDate("");
		} else {
			setDueDate(e.target.value);
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
					{["월간목표", "주간목표", "일간목표"].map((goal) => (
						<button
							key={goal}
							onClick={() => handleGoalSelect(goal)}
							className={`px-2 py-2 rounded-lg ${
								selectedGoal === goal ? "bg-gray-500" : "bg-gray-800"
							} text-white hover:bg-gray-500 transition-colors`}
						>
							{goal}
						</button>
					))}
				</div>
				<div className="mb-4 text-sm text-gray-500">
					created_at : {new Date().toLocaleDateString()}
				</div>
				<div className="mb-4 text-sm text-gray-500">
					due_date :
					<input
						type="date"
						value={dueDate}
						onChange={handleDateChange}
						className="ml-2 p-1 border rounded"
						disabled={selectedGoal !== "주간목표"}
					/>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="p-4 border rounded-lg">
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="할 일을 입력하세요"
							className="w-full h-20 resize-none text-gray-700 focus:outline-none"
						/>
						<div className="text-right text-sm text-gray-500">
							{content.length} / 3000
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
