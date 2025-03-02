import { useState } from "react";
import useMainAPI from "../../hooks/useMain";
import TaskModal from "./TaskModal";
import { calcWeek, printDateFormat } from "../../utils/dateUtils";

const TaskCard = ({ task, isOtherMember }) => {
	const { data: taskDetails } = useMainAPI(
		`task/${task.taskId}`,
		(data) => data,
	);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isModalOpen, setIsModalOpen] = useState(false);

	const getBackgroundColor = () => {
		if (task.status === "accept") return "bg-green-600/80";
		else if (task.status === "deny") return "bg-[#EF5656]/60";
		else if (task.status === "pend") return "bg-yellow-600/80";
		else {
			return task.type === "monthly" ? "bg-[#153E90]/80" : "bg-[#486EBA]/80";
		}
	};

	const handleMouseMove = (e) => {
		const card = e.currentTarget;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		setMousePosition({ x, y });
	};

	const handleMouseLeave = () => {
		setMousePosition({ x: 0, y: 0 });
	};

	const cardDueDateFormat = (type, dueDate) => {
		const month = new Date(dueDate).getMonth() + 1;
		const weekNum = calcWeek(new Date(dueDate));
		const day = new Date(dueDate).getDate();

		if (type === "daily")
			return `${month}월 ${day}일 목표`
		
		if (type === "weekly")
			return `${month}월 ${weekNum}주차 목표`;

		if (type === "monthly")
			return `${month}월 목표`;
	}

	const backgroundColor = getBackgroundColor();
	const rotateX = mousePosition.y / 8;
	const rotateY = -mousePosition.x / 8;

	return (
		<>
			<div className="group perspective-1000">
				<div
					className={`
			  p-4 m-2 rounded-lg ${backgroundColor} relative overflow-hidden w-[220px] h-[125px]
			  transition-transform duration-200 ease-out
			  group-hover:shadow-xl
			  hover:scale-105
			  cursor-pointer
			  transform-gpu
			  flex
			  flex-col
			  justify-content-start
			  content-center
			  shadow-inner
			`}
					style={{
						boxShadow: "inset 0 6px 8px rgba(0, 0, 0, 0.3)", // 추가적인 inset shadow
						transform:
							mousePosition.x || mousePosition.y
								? `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
								: "none",
					}}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					onClick={() => setIsModalOpen(true)}
				>
					<div className="absolute inset-0 group-hover:bg-white/5 transition-colors duration-200" />
					<div className="absolute inset-0 flex items-center justify-center text-white opacity-20 pointer-events-none">
						<div className="absolute inset-0 w-full h-full flex items-center justify-center text-6xl font-bold uppercase break-words text-center">
							{task.type}
						</div>
					</div>
					<div className="flex mb-4">
						<span className="text-right ml-auto font-bold text-sm">
							{
								cardDueDateFormat(task.type, task.dueDate)
							}
						</span>
					</div>
					<div className="relative text-white flex flex-col justify-content-center">
						<div className="flex-grow content-center justify-content-center overflow-hidden">
							<h3 className="font-bold text-center text-base leading-tight overflow-hidden whitespace-nowrap text-ellipsis">
								{task.content}
							</h3>
						</div>
					</div>
				</div>
			</div>

			<TaskModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				task={taskDetails}
				isOtherMember={isOtherMember}
			/>
		</>
	);
};

export default TaskCard;
