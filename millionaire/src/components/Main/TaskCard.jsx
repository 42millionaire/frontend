import { useState } from "react";
import useMainAPI from "../../hooks/useMain";
import TaskModal from "./TaskModal";
import { printDateFormat } from "../../utils/dateUtils";

const TaskCard = ({ task }) => {
	const { data: taskDetails } = useMainAPI(
		`task/${task.taskId}`,
		(data) => data,
	);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isModalOpen, setIsModalOpen] = useState(false);

	const getBackgroundColor = () => {
		if (task.status === "accept") return "bg-green-600/80";
		else if (task.status === "deny") return "bg-red-600/80";
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

	const backgroundColor = getBackgroundColor();
	const rotateX = mousePosition.y / 8;
	const rotateY = -mousePosition.x / 8;

	return (
		<>
			<div className="group perspective-1000">
				<div
					className={`
			  p-4 m-2 rounded-lg ${backgroundColor} relative overflow-hidden w-[200px] h-24
			  transition-transform duration-200 ease-out
			  group-hover:shadow-xl
			  hover:scale-105
			  cursor-pointer
			  transform-gpu
			`}
					style={{
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
					<div className="absolute inset-0 flex items-center justify-center text-white opacity-10 pointer-events-none">
						<div className="text-4xl font-bold uppercase whitespace-normal text-center">
							{task.type}
						</div>
					</div>
					<div className="relative text-white flex flex-col h-full">
						<div className="flex-grow overflow-hidden max-h-[60px]">
							<h3 className="font-bold text-2xl leading-tight">
								{task.content}
							</h3>
						</div>
						<p className="mt-2 text-sm font-light opacity-70">
							마감: { printDateFormat(task.dueDate, false) }
						</p>
					</div>
				</div>
			</div>

			<TaskModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				task={taskDetails}
			/>
		</>
	);
};

export default TaskCard;
